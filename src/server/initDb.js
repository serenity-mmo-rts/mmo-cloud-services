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




var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/serenity', {db: {native_parser: true}}, function(err, db) {
    if(!err) {
        console.log("We are connected");
    }

    if (err) throw err;

    var spritesheetForest;
    var mapTypeCity;
    var objectTypeRock;
    var objectTypeRock2;
    var mapCity;
    var mapObjectsRocks;

    addSpritesheets();

    function addSpritesheets() {
        var collSpritesheets = db.collection('spritesheets');
        db.dropCollection('spritesheets',function(err){
            spritesheetForest = {
                images: ["resources/forest.png"],
                frames: [
                    // x, y, width, height, imageIndex, regX, regY
                    [0,448,64,64,0,32,16],
                    [64,448,64,64,0,32,16]
                ]
            }
            collSpritesheets.insert(spritesheetForest, function(err,docs) {
                if (err) throw err;
                addMapTypes();
            });
        })
    }



    function addMapTypes() {
        var collMapTypes = db.collection('mapTypes');
        db.dropCollection('mapTypes',function(err){
            mapTypeCity = {
                name: "City",
                scale: 1,
                ratioWidthHeight: 2,
                bgColor: 000000,
                groundImage: "resources/ground.png",
                groundImageScaling: 1
            }
            collMapTypes.insert(mapTypeCity, function(err,docs) {
                if (err) throw err;
                addObjectTypes();
            });
        });
    }

    function addObjectTypes() {
        var collObjectType = db.collection('objTypes');
        objectTypeRock = {
            initWidth : 48,
            initHeight : 48,
            allowOnMapTypeId: mapTypeCity._id,
            name : "rock",
            spritesheetId: spritesheetForest._id,
            spriteFrame: 0
        }
        objectTypeRock2 = {
            initWidth : 48,
            initHeight : 48,
            allowOnMapTypeId: mapTypeCity._id,
            name : "rock2",
            spritesheetId: spritesheetForest._id,
            spriteFrame: 1
        }

        db.dropCollection('objTypes',function(err){
            if (err) throw err;
            addRock1();
        });



        function addRock1() {
            collObjectType.insert(objectTypeRock, function(err,docs) {
                if (err) throw err;
                addRock2();
            });
        };
        function addRock2() {
            collObjectType.insert(objectTypeRock2, function(err,docs) {
                if (err) throw err;
                addMaps();
            });
        }

    }

    function addMaps() {
        var collMaps = db.collection('maps');
        db.dropCollection('maps',function(err){
            mapCity = {
                width: 1000,
                height: 1000,
                mapTypeId: mapTypeCity._id
            }
            collMaps.insert(mapCity, function(err,docs) {
                if (err) throw err;
                addMapObjects();
            });
        });
    }

    function addMapObjects() {
        var collMapObjects = db.collection('mapObjects');
        db.dropCollection('mapObjects',function(err){
            mapObjectsRocks = [];
            for(var i=1; i<500; i++) {
                mapObjectsRocks.push({
                    mapId: mapCity._id,
                    x: Math.floor((Math.random()-0.5) * (mapCity.width-objectTypeRock.initWidth)),
                    y: Math.floor((Math.random()-0.5) * (mapCity.height-objectTypeRock.initHeight)),
                    width: objectTypeRock.initWidth,
                    height: objectTypeRock.initHeight,
                    objTypeId: objectTypeRock._id,
                    userId: 0
                });
            }
            for(var i=1; i<500; i++) {
                mapObjectsRocks.push({
                    mapId: mapCity._id,
                    x: Math.floor((Math.random()-0.5) * (mapCity.width-objectTypeRock2.initWidth)),
                    y: Math.floor((Math.random()-0.5) * (mapCity.height-objectTypeRock2.initHeight)),
                    width: objectTypeRock2.initWidth,
                    height: objectTypeRock2.initHeight,
                    objTypeId: objectTypeRock2._id,
                    userId: 0
                });
            }
            collMapObjects.insert(mapObjectsRocks, function(err,docs) {
                if (err) throw err;
            });
            addGameVariables();
        });


    }

    function addGameVariables() {
        var collGameVars = db.collection('gameVars');
        db.dropCollection('gameVars',function(err){
            gameVars = {
                rootMapId : mapCity._id
            }
            collGameVars.insert(gameVars, function(err,docs) {
                if (err) throw err;
                console.log("database is now ready!");
            });
        });
    }
});