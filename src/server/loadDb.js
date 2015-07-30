var dbConn = require('./dbConnection');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/mapObjects/MapObject').MapObject;
var ItemModel = require('../game/ItemModel').ItemModel;
var MapType = require('../game/MapType').MapType;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var createMapObject = require('../game/mapObjects/createMapObject').createMapObject;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var RessourceType = require('../game/types/RessourceType').RessourceType;
var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
var ItemType = require('../game/types/ItemType').ItemType;
var FeatureType = require('../game/types/FeatureType').FeatureType;


var Spritesheet = require('../game/Spritesheet').Spritesheet;
var MapData = require('../game/MapData').MapData;

function getMapObjects(gameData, currentMapData) {

    dbConn.get('mapObjects', function (err, collMapObjects) {
        if (err) throw err;
        collMapObjects.find({mapId: currentMapData._id}).each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var mapObj = createMapObject(gameData, doc);
                currentMapData.addObject(mapObj);
            }
        });
    });
}

function getItems(gameData, currentMapData) {

    dbConn.get('items', function (err, collItems) {
        if (err) throw err;
        collItems.find({mapId: currentMapData._id}).each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var item = new ItemModel(gameData, doc);
                currentMapData.addItem(item);
            }
        });
    });
}

function getMapEvents(gameData, currentMapData) {
    dbConn.get('mapEvents', function (err, collMapEvents) {
        if (err) throw err;
        collMapEvents.find({_mapId: currentMapData._id}).each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var mapEvent = EventFactory(gameData, doc);
                currentMapData.eventScheduler.addEvent(mapEvent);
            }
        });
    });
}

function fillGameData(gameData, gameVars) {

    dbConn.get('spritesheets', function (err, collSpritesheets) {
        if (err) throw err;
        collSpritesheets.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.spritesheets = new GameList(gameData, Spritesheet, docs);
        });
    });

    dbConn.get('mapTypes', function (err, collMapTypes) {
        if (err) throw err;
        collMapTypes.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.mapTypes = new GameList(gameData, MapType, docs);
        });
    });

    dbConn.get('objTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.objectTypes = new GameList(gameData, ObjectType, docs);
        });
    });

    dbConn.get('resTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.ressourceTypes= new GameList(gameData, RessourceType, docs);
        });
    });

    dbConn.get('techTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.technologyTypes= new GameList(gameData, TechnologyType, docs);
        });
    });

    dbConn.get('featTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.featureTypes= new GameList(gameData, FeatureType, docs);
        });
    });

    dbConn.get('itemTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.itemTypes= new GameList(gameData, ItemType, docs);
        });
    });

    dbConn.get('maps', function (err, collMaps) {
        if (err) throw err;
        collMaps.find().each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var currentMapData = gameData.maps.add(new MapData(gameData, doc));
                getMapObjects(gameData, currentMapData);
                getMapEvents(gameData, currentMapData);
                getItems(gameData, currentMapData);
            }
        });
    });

    dbConn.get('gameVars', function (err, collGameVars) {
        if (err) throw err;
        collGameVars.findOne([], function (err, doc) {
            if (err) throw err;
            gameVars.rootMapId = doc.rootMapId;
        });
    });

}

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