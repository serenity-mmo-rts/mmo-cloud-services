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
var callbacksAfterNextSave = {};
var callbacksAfterCurrent = {};

exports.reflectLayerToDb = function (gameData, layer, callback) {

    if (callback) {
        if (!callbacksAfterNextSave.hasOwnProperty(layer._id)){
            callbacksAfterNextSave[layer._id] = [];
        }
        callbacksAfterNextSave[layer._id].push(callback);
    }

    if (lockedLayers.hasOwnProperty(layer._id)) {
        console.log("This map layer is write locked in the db. Cannot reflect to db at the moment! add db changes to queue...");
        resaveLayers[layer._id] = true;
    }
    else {
        if (callbacksAfterNextSave.hasOwnProperty(layer._id)) {
            callbacksAfterCurrent[layer._id] = callbacksAfterNextSave[layer._id];
        }
        callbacksAfterNextSave[layer._id] = [];
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
    function checkFinished(collectionName, error) {
        finished++;
        //console.log("finished saving " + collectionName +" ....... finished="+finished);
        if (finished>=3) {
            //console.log("finished saving all collections");
            finishSaving(gameData, layer);
        }
    }

    // TODO: save layer only when necessary
    var layerCollectionName = 'layers';
    dbConn.get(layerCollectionName, function (err, collMaps) {
        if (err) {
            console.log(err);
            callback();
        }
        collMaps.save(layer.save(), {w: 1}, function(err,docs) {
            if (err) throw err;
            checkFinished(layerCollectionName, 0);
        });
    });

    reflectGameListToDb('mapObjects',layer.mapData.mapObjects,checkFinished);
    reflectGameListToDb('items',layer.mapData.items,checkFinished);

}

function reflectGameListToDb(collectionName,gameList,callback) {

    dbConn.get(collectionName, function (err, collItems) {
        if (err) {
            console.log(err);
            callback(collectionName, err);
        }

        // only save the recent changes:
        var recentlyChanged = gameList.getAndResetStateChanges();
        var serializedObjArr = gameList.saveIds(recentlyChanged);

        var numObjToSave =  serializedObjArr.length;
        //console.log('start saving '+numObjToSave+' objects in collection '+collectionName);
        if (numObjToSave > 0) {

            var numSaved = 0;

            function doneOneObj(err){
                numSaved++;
                if ( numSaved==numObjToSave ) {
                    callback(collectionName, err);
                }
            }

            for (var i=0; i<numObjToSave; i++){

                (function(){

                    var ii=i;
                    collItems.save(serializedObjArr[ii], {w: 1}, function (err, docs) {
                        if (err) {
                            // add the state changes again so that it will eventually be saved later...
                            gameList.notifyStateChange(serializedObjArr[ii]._id);
                            console.log(err);
                        }
                        //console.log('test: finished saving number '+ii+' in collection '+collectionName);
                        doneOneObj(err);
                    });

                })();

            }

        }
        else {
            callback(collectionName, 0);
        }
    });
}

function finishSaving(gameData, layer) {

    // call callbacks:
    if (callbacksAfterCurrent.hasOwnProperty(layer._id)){
        for (var k= callbacksAfterCurrent[layer._id].length - 1; k>=0; k--) {
            console.log("call callbacksAfterCurrent")
            callbacksAfterCurrent[layer._id][k]();
        }
        callbacksAfterCurrent[layer._id] = [];
    }

    // finish:

    delete lockedLayers[layer._id];
    console.log("saving is finished");
    // if in the mean time a new change request came in, then we start the saving from the beginning.
    if (resaveLayers.hasOwnProperty(layer._id)) {
        delete resaveLayers[layer._id];
        console.log("start saving again, because there were some new changes in the meantime");
        startSaving(gameData, layer);
    }

}