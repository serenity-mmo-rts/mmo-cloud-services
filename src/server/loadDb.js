var dbConn = require('./dbConnection');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/mapObjects/MapObject').MapObject;
var MapType = require('../game/MapType').MapType;
var EventFactory = require('../game/events/EventFactory').EventFactory;

var ObjectType = require('../game/types/ObjectType').ObjectType;
var RessourceType = require('../game/types/RessourceType').RessourceType;
var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
var ItemType = require('../game/types/ItemType').ItemType;
var UnitType = require('../game/types/UnitType').UnitType;
var UpgradeType = require('../game/types/UpgradeType').UpgradeType;

var Spritesheet = require('../game/Spritesheet').Spritesheet;
var MapData = require('../game/MapData').MapData;

function getMapObjects(gameData, currentMapData) {

    dbConn.get('mapObjects', function (err, collMapObjects) {
        if (err) throw err;
        collMapObjects.find({mapId: currentMapData._id}).each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var mapObj = new MapObject(gameData, doc);
                currentMapData.addObject(mapObj);
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

    dbConn.get('unitTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.unitTypes= new GameList(gameData, UnitType, docs);
        });
    });

    dbConn.get('itemTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.itemTypes= new GameList(gameData, ItemType, docs);
        });
    });

    dbConn.get('upgradeTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.upgradeTypes= new GameList(gameData, UpgradeType, docs);
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