var dbConn = require('./dbConnection');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var MapType = require('../game/MapType').MapType;
var ObjectType = require('../game/objectType').ObjectType;
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