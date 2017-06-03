var dbConn = require('./dbConnection');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var Item = require('../game/Item').Item;

var LayerType = require('../game/types/LayerType').LayerType;
var Layer = require('../game/Layer').Layer;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var eventStates = require('../game/events/AbstractEvent').eventStates;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var RessourceType = require('../game/types/ResourceType').RessourceType;
var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
var ItemType = require('../game/types/ItemType').ItemType;
var UserType = require('../game/types/UserType').UserType;
//var FeatureType = require('../game/types/FeatureType').FeatureType;
var async = require('async');

var Spritesheet = require('../game/Spritesheet').Spritesheet;
var MapData = require('../game/Layer').MapData;



exports.getGameData = function (gameData, gameVars, cb) {
    if (dbConn.isConnected()) {
        fillGameData(gameData, gameVars, cb);
    }
    else {
        dbConn.connect(function () {
            fillGameData(gameData, gameVars, cb);
        })
    }
}


function fillGameData(gameData, gameVars, cb) {

    async.parallel([
            function(cb){ getGameVars(gameVars,cb); },
            function(cb){ getResTypes(gameData,cb); },
            function(cb){ getSpritesheets(gameData,cb); },
            function(cb){ getMapTypes(gameData,cb); },
            function(cb){ getObjTypes(gameData,cb); },
            function(cb){ getTechTypes(gameData,cb); },
            function(cb){ getItemTypes(gameData,cb); },
            function(cb){ getUserTypes(gameData,cb); }
        ],

        // optional callback
        function(err, results){
            cb();
        }
    );

}

function getGameVars(gameVars, cb) {
    dbConn.get('gameVars', function (err, collGameVars) {
        if (err) throw err;
        collGameVars.findOne([], function (err, doc) {
            if (err) throw err;
            gameVars.rootMapId = doc.rootMapId;
        });
        cb(null,'getGameVars');
    });
}


function getSpritesheets(gameData,cb) {
    dbConn.get('spritesheets', function (err, collSpritesheets) {
        if (err) throw err;
        collSpritesheets.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.spritesheets = new GameList(gameData, Spritesheet, docs);
            cb(null,'getSpritesheets');
        });
    });
}


function getResTypes(gameData, cb) {
    dbConn.get('resTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.ressourceTypes= new GameList(gameData, RessourceType, docs);
            cb(null,'getResTypes');
        });
    });
}

function getMapTypes(gameData, cb) {
    dbConn.get('layerTypes', function (err, collMapTypes) {
        if (err) throw err;
        collMapTypes.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.layerTypes = new GameList(gameData, LayerType, docs);
            cb(null,'getMapTypes');
        });
    });
}

function getObjTypes(gameData,cb) {
    dbConn.get('objTypes', function (err, collObjectType) {
        if (err) throw err;
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.objectTypes = new GameList(gameData, ObjectType, docs);
            cb(null,'getObjTypes');
        });
    });
}

function getTechTypes(gameData,cb) {
    dbConn.get('techTypes', function (err, collTechType) {
        if (err) throw err;
        collTechType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.technologyTypes= new GameList(gameData, TechnologyType, docs);
            cb(null,'getTechTypes');
        });
    });
}

function getItemTypes(gameData,cb) {
    dbConn.get('itemTypes', function (err, collItemType) {
        if (err) throw err;
        collItemType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.itemTypes= new GameList(gameData, ItemType, docs);
            cb(null,'getItemTypes');
        });
    });
}

function getUserTypes(gameData,cb) {
    dbConn.get('userTypes', function (err, collUserType) {
        if (err) throw err;
        collUserType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.userTypes= new GameList(gameData, UserType, docs);
            cb(null,'getUserTypes');
        });
    });
}



function getMaps(gameData,cb) {
    console.log("load layers from db")
    dbConn.get('layers', function (err, collMaps) {
        if (err) throw err;
        collMaps.find().each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var currentMapData = gameData.layers.add(new Layer(gameData, doc));
                async.parallel([
                        function(cb){ getMapObjects(gameData, currentMapData, cb); },
                        function(cb){ getItems(gameData, currentMapData, cb); },
                        function(cb){ getMapEvents(gameData, currentMapData, cb); }
                    ],
                    function(err, results){
                        //setPointers(gameData, currentMapData);
                        currentMapData.initialize();

                        /*
                        currentMapData.mapData.mapObjects.setPointers();
                        currentMapData.mapData.mapObjects.each(function(mapObj){
                            mapObj.embedded(true);
                        });
                        currentMapData.mapData.items.setPointers();
                        currentMapData.mapData.items.each(function(item){
                            item.embedded(true);
                        });
                        currentMapData.eventScheduler.events.setPointers();
                        currentMapData.timeScheduler.finishAllTillTime(Date.now());
                        */

                        cb();
                    }
                );
            }
        });
    });
}


exports.getMapById = function(gameData, mapId, cb) {
    console.log("load layer " + mapId + " from db");
    dbConn.get('layers', function (err, collMaps) {
        if (err) throw err;

        collMaps.findOne({_id: mapId}, function(err, doc) {
            if (err) throw err;
            if (doc != null) {
                var currentMapData = gameData.layers.add(new Layer(gameData, doc));
                async.series([
                        function(cb){ getMapObjects(gameData, currentMapData, cb); },
                        function(cb){ getItems(gameData, currentMapData, cb); },
                        function(cb){ getMapEvents(gameData, currentMapData, cb); }
                    ],
                    function(err, results){
                        //setPointers(gameData, currentMapData);
                        currentMapData.initialize();

                        /*
                        currentMapData.mapData.mapObjects.setPointers();
                        currentMapData.mapData.mapObjects.each(function(mapObj){
                            mapObj.embedded(true);
                        });
                        currentMapData.mapData.items.setPointers();
                        currentMapData.mapData.items.each(function(item){
                            item.embedded(true);
                        });
                        currentMapData.eventScheduler.events.setPointers();
                        currentMapData.timeScheduler.finishAllTillTime(Date.now());
                        */

                        cb();
                    }
                );
            }
        });
    });
}

function getMapObjects(gameData, currentMapData, cb) {
    console.log("load mapObjects of map "+currentMapData._id()+" from db");
    dbConn.get('mapObjects', function (err, collMapObjects) {
        if (err) throw err;
        collMapObjects.find({$or: [ {mapId: currentMapData._id()}, {targetMapId: currentMapData._id()} ]}).toArray(function(err, documents) {
            if (err) throw err;
            if (documents != null) {

                currentMapData.mapData.mapObjects.load(documents);
                currentMapData.mapData.rebuildQuadTree();
                /*
                for (var i=0; i<documents.length; i++) {
                    var mapObj = new MapObject(gameData, documents[i]);
                    currentMapData.mapData.addObject(mapObj);
                }*/
            }

            // reset the state changes, because we just added all objects from db:
            currentMapData.mapData.mapObjects.getAndResetStateChanges();

            cb(null,'getMapObjects');
        });

    });
}

function getItems(gameData, currentMapData, cb) {
    console.log("load items of map "+currentMapData._id()+" from db");
    dbConn.get('items', function (err, collItems) {
        if (err) throw err;
        collItems.find({$or: [ {mapId: currentMapData._id()}, {targetMapId: currentMapData._id()} ]} ).toArray(function(err, documents) {
            if (err) throw err;
            if (documents != null) {
                for (var i=0; i<documents.length; i++) {
                    var item = new Item(gameData, documents[i]);
                    currentMapData.mapData.addItem(item);
                }
            }

            // reset the state changes, because we just added all items from db:
            currentMapData.mapData.items.getAndResetStateChanges();

            cb(null,'getItems');
        });
    });
}

function getMapEvents(gameData, currentMapData, cb) {
    console.log("load events of map "+currentMapData._id()+" from db");
    dbConn.get('mapEvents', function (err, collMapEvents) {
        if (err) throw err;

        collMapEvents.find({_mapId: currentMapData._id()}).toArray(function(err, documents) {
            if (err) throw err;
            if (documents != null) {
                for (var i=0; i<documents.length; i++) {
                    var mapEvent = EventFactory(gameData, documents[i]);
                    currentMapData.eventScheduler.addEvent(mapEvent);
                }
            }

            cb(null,'getMapEvents');

        });
    });
}

function setPointers(gameData, myNewMap) {
    /*
    currentMapData.mapData.mapObjects.setPointers();
    currentMapData.mapData.mapObjects.each(function(mapObj){
        mapObj.embedded(true);
    });
    currentMapData.mapData.items.setPointers();
    currentMapData.mapData.items.each(function(item){
        item.embedded(true);
    });
    currentMapData.eventScheduler.events.setPointers();
    currentMapData.timeScheduler.finishAllTillTime(Date.now());
    */

    // now call setPointers() for everything
    myNewMap.mapData.setPointers(); // this will call setPointer() on all mapObjects and items
    myNewMap.eventScheduler.events.setPointers();

    // now embed into game:
    myNewMap.mapData.mapObjects.each(function(mapObj){
        mapObj.embedded(true);
    });
    myNewMap.mapData.items.each(function(item){
        item.embedded(true);
    });

}
