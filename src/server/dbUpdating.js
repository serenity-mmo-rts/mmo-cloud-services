var dbConn = require('./dbConnection');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var LayerType = require('../game/types/LayerType').LayerType;
var Layer = require('../game/Layer').Layer;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var Spritesheet = require('../game/Spritesheet').Spritesheet;


var lockedLayers = {};
var resaveLayers = {};

exports.reflectLayerToDb = function (gameData, layer) {

    if (lockedLayers.hasOwnProperty(layer._id)) {
        console.log("This map layer is write locked in the db. Cannot reflect to db at the moment! add db changes to queue...")
        resaveLayers[layer._id] = true;
    }
    else {
        startSaving(gameData, layer);
    }

}


function startSaving(gameData, layer) {

    lockedLayers[layer._id] = true;

    if (dbConn.isConnected()) {
        saveLayerToDb(gameData, layer);
    }
    else {
        dbConn.connect(function () {
            saveLayerToDb(gameData, layer);
        })
    }
}


function saveLayerToDb(gameData, layer) {

    var finished = 0;
    function checkFinished() {
        finished++;
        if (finished>=3) {
            finishSaving(gameData, layer);
        }
    }

    // TODO: save layer only when necessary
    dbConn.get('layers', function (err, collMaps) {
        if (err) {
            console.log(err);
            callback();
        }
        collMaps.save(layer.save(), function(err,docs) {
            if (err) throw err;
            checkFinished();
        });
    });

    reflectGameListToDb('mapObjects',layer.mapData.mapObjects,checkFinished);
    reflectGameListToDb('items',layer.mapData.items,checkFinished);

}

function reflectGameListToDb(collectionName,gameList,callback) {

    dbConn.get(collectionName, function (err, collItems) {
        if (err) {
            console.log(err);
            callback();
        }

        // only save the recent changes:
        var recentlyChanged = gameList.getAndResetStateChanges();
        var serializedObjArr = gameList.saveIds(recentlyChanged);

        numObjToSave =  serializedObjArr.length;
        if (numObjToSave > 0) {

            var numSaved = 0;

            function doneOneObj(){
                numSaved++;
                if ( numSaved==numObjToSave ) {
                    callback();
                }
            }

            for (var i=1; i<numObjToSave; i++){
                collItems.save(serializedObjArr[i], function (err, docs) {
                    if (err) {
                        // add the state changes again so that it will eventually be saved later...
                        gameList.notifyStateChange(serializedObjArr[i]._id);
                        console.log(err);
                    }
                    doneOneObj();
                });
            }

        }
        else {
            callback();
        }
    });
}

function finishSaving(gameData, layer) {

    delete lockedLayers[layer._id];

    // if in the mean time a new change request came in, then we start the saving from the beginning.
    if (resaveLayers.hasOwnProperty(layer._id)) {
        delete resaveLayers[layer._id];
        startSaving(gameData, layer);
    }

}