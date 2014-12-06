var fs = require('fs');

window = {};
eval(fs.readFileSync('../game/GameList.js') + '');
eval(fs.readFileSync('../game/GameData.js') + '');
eval(fs.readFileSync('../game/mapData.js') + '');
eval(fs.readFileSync('../game/MapType.js') + '');
eval(fs.readFileSync('../game/MapObject.js') + '');
eval(fs.readFileSync('../game/objectType.js') + '');
eval(fs.readFileSync('../game/Spritesheet.js') + '');
eval(fs.readFileSync('../game/User.js') + '');
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');

initGameData = require('./initGameData');

var gameData;

var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/serenity', {db: {native_parser: true}}, function(err, db) {
    if(!err) {
        console.log("We are connected");
    }

    if (err) throw err;

    var collSpritesheets = db.collection('spritesheets');
    var collMapTypes = db.collection('mapTypes');
    var collObjectType = db.collection('objTypes');
    var collMaps = db.collection('maps');
    var collMapObjects = db.collection('mapObjects');
    var collGameVars = db.collection('gameVars');
    var collUsers = db.collection('users');
    var collSessions = db.collection('sessions');

    // remove all collections:
    collSpritesheets.remove({},function(err, removed){
        collMapTypes.remove({},function(err, removed){
            collObjectType.remove({},function(err, removed){
                collMaps.remove({},function(err, removed){
                    collMapObjects.remove({},function(err, removed){
                        collGameVars.remove({},function(err, removed){
                            collUsers.remove({},function(err, removed){
                                collSessions.remove({},function(err, removed){
                                    addSpritesheets();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    function addSpritesheets() {
        collSpritesheets.insert(initGameData.gameData.spritesheets.getArray(), function(err,docs) {
            if (err) throw err;
            addMapTypes();
        });
    }



    function addMapTypes() {
        collMapTypes.insert(initGameData.gameData.mapTypes.getArray(), function(err,docs) {
            if (err) throw err;
            addObjectTypes();
        });
    }

    function addObjectTypes() {
        collObjectType.insert(initGameData.gameData.objectTypes.getArray(), function(err,docs) {
            if (err) throw err;
            addMaps();
        });
    }

    function addMaps() {
        collMaps.insert(initGameData.gameData.maps.getArray(), function(err,docs) {
            if (err) throw err;
            addMapObjects();
        });
    }

    function addMapObjects() {
        for( var k in initGameData.gameData.maps.hashList ) {
            collMapObjects.insert(initGameData.gameData.maps.hashList[k].mapObjects.getArray(), function(err,docs) {
                if (err) throw err;
            });
        }
        addGameVariables();
    }

    function addGameVariables() {
        collGameVars.insert(initGameData.gameVars, function(err,docs) {
            if (err) throw err;
            console.log("database is now ready!");
            db.close();
        });
    }
});
