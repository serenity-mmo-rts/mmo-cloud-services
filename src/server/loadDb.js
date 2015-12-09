var dbConn = require('./dbConnection');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/Building').MapObject;
var ItemModel = require('../game/Item').ItemModel;
var MapType = require('../game/types/LayerType').MapType;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var eventStates = require('../game/events/AbstractEvent').eventStates;
var createMapObject = require('./createMapObject').createMapObject;
var ObjectType = require('../game/types/BuildingType').ObjectType;
var RessourceType = require('../game/types/ResourceType').RessourceType;
var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
var ItemType = require('../game/types/ItemType').ItemType;
//var FeatureType = require('../game/types/FeatureType').FeatureType;


var Spritesheet = require('../game/Spritesheet').Spritesheet;
var MapData = require('../game/Layer').MapData;



exports.getGameData = function (gameData, gameVars) {
    if (dbConn.isConnected()) {
        fillGameData(gameData, gameVars);
    }
    else {
        dbConn.connect(function () {
            fillGameData(gameData, gameVars);
        })
    }
}


function fillGameData(gameData, gameVars) {

    dbConn.get('gameVars', function (err, collGameVars) {
        if (err) throw err;
        collGameVars.findOne([], function (err, doc) {
            if (err) throw err;
            gameVars.rootMapId = doc.rootMapId;
        });
        getSpritesheets(gameData);
    });

}


function getSpritesheets(gameData) {
    dbConn.get('spritesheets', function (err, collSpritesheets) {
        if (err) throw err;
        collSpritesheets.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.spritesheets = new GameList(gameData, Spritesheet, docs);
            getResTypes(gameData);
        });
    });
}


function getResTypes(gameData) {
    dbConn.get('resTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.ressourceTypes= new GameList(gameData, RessourceType, docs);
            getMapTypes(gameData);
        });

    });
}

function getMapTypes(gameData) {
    dbConn.get('mapTypes', function (err, collMapTypes) {
        if (err) throw err;
        collMapTypes.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.mapTypes = new GameList(gameData, MapType, docs);
            getObjTypes(gameData);
        });
    });
}

function getObjTypes(gameData) {
    dbConn.get('objTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.objectTypes = new GameList(gameData, ObjectType, docs);
            getTechTypes(gameData);
        });
    });
}



function getTechTypes(gameData) {
dbConn.get('techTypes', function (err, collObjectType) {
    if (err) throw err;
    collObjectType.find().toArray(function (err, docs) {
        if (err) throw err;
        gameData.technologyTypes= new GameList(gameData, TechnologyType, docs);
        getItemTypes(gameData);
    });
});
}
/**
function getFeatTypes(gameData) {
dbConn.get('featTypes', function (err, collObjectType) {
    if (err) throw err;
    collObjectType.find().toArray(function (err, docs) {
        if (err) throw err;
        gameData.featureTypes= new GameList(gameData, FeatureType, docs);
        getItemTypes(gameData);
    });
});
}
 **/

function getItemTypes(gameData) {
dbConn.get('itemTypes', function (err, collObjectType) {
    if (err) throw err;
    collObjectType.find().toArray(function (err, docs) {
        if (err) throw err;
        gameData.itemTypes= new GameList(gameData, ItemType, docs);
        getMaps(gameData);
    });
});
}


function getMaps(gameData) {
    console.log("load maps from db")
    dbConn.get('maps', function (err, collMaps) {
        if (err) throw err;
        collMaps.find().each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var currentMapData = gameData.maps.add(new MapData(gameData, doc));
                getMapObjects(gameData, currentMapData);
            }
        });
    });
}


function getMapObjects(gameData, currentMapData) {

    dbConn.get('mapObjects', function (err, collMapObjects) {
        if (err) throw err;
        collMapObjects.find({mapId: currentMapData._id}).toArray(function(err, documents) {
            if (err) throw err;
            if (documents != null) {
                for (var i=0; i<documents.length; i++) {
                    var mapObj = createMapObject(gameData, documents[i]);
                    currentMapData.addObject(mapObj);
                }
            }

            getItems(gameData,currentMapData);
        });

    });
}

function getItems(gameData, currentMapData) {

    dbConn.get('items', function (err, collItems) {
        if (err) throw err;
        collItems.find({mapId: currentMapData._id}).toArray(function(err, documents) {
            if (err) throw err;
            if (documents != null) {
                for (var i=0; i<documents.length; i++) {
                    var item = new ItemModel(gameData, documents[i]);
                    currentMapData.addItem(item);
                }
            }

            getMapEvents(gameData,currentMapData);
        });
    });
}

function getMapEvents(gameData, currentMapData) {
    console.log("load events of map "+currentMapData._id+" from db");
    dbConn.get('mapEvents', function (err, collMapEvents) {
        if (err) throw err;

        collMapEvents.find({_mapId: currentMapData._id}).toArray(function(err, documents) {
            if (err) throw err;
            if (documents != null) {
                for (var i=0; i<documents.length; i++) {
                    var mapEvent = EventFactory(gameData, documents[i]);
                    currentMapData.eventScheduler.addEvent(mapEvent);
                }
            }

            setPointers(gameData, currentMapData);

            currentMapData.eventScheduler.finishAllTillTime(Date.now());
        });
    });
}

function setPointers(gameData, currentMapData) {
    currentMapData.mapObjects.each(function(mapObject){
        mapObject.setPointers();
    });
}
