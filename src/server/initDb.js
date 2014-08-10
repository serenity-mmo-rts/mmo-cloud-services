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
        
            spritesheetForest = new Spritesheet({
                images: ["resources/forest.png"],
                frames: [
                    // x, y, width, height, imageIndex, regX, regY
                    [0,448,64,64,0,32,48],
                    [64,448,64,64,0,32,48]
                ]
            });
            collSpritesheets.insert(spritesheetForest, function(err,docs) {
                if (err) throw err;
                addMapTypes();
            });
    }



    function addMapTypes() {
        var collMapTypes = db.collection('mapTypes');
            mapTypeCity = new MapType({
                name: "City",
                scale: 1,
                ratioWidthHeight: 2,
                bgColor: 000000,
                groundImage: "resources/ground.png",
                groundImageScaling: 1
            });
            collMapTypes.insert(mapTypeCity, function(err,docs) {
                if (err) throw err;
                addObjectTypes();
            });
    }

    function addObjectTypes() {
        var collObjectType = db.collection('objTypes');
        objectTypeRock = new ObjectType({
            initWidth : 32,
            initHeight : 32,
            allowOnMapTypeId: mapTypeCity._id,
            name : "rock",
            spritesheetId: spritesheetForest._id,
            spriteFrame: 0
        })
        objectTypeRock2 = new ObjectType({
            initWidth : 32,
            initHeight : 32,
            allowOnMapTypeId: mapTypeCity._id,
            name : "rock2",
            spritesheetId: spritesheetForest._id,
            spriteFrame: 1
        });

            addRock1();



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
            mapCity = new MapData({
                width: 1000,
                height: 1000,
                mapTypeId: mapTypeCity._id
            });
            collMaps.insert(mapCity, function(err,docs) {
                if (err) throw err;
                addMapObjects();
            });
    }

    function addMapObjects() {
        var collMapObjects = db.collection('mapObjects');
            mapObjectsRocks = [];
            for(var i=1; i<200; i++) {
                mapObjectsRocks.push(new MapObject({
                    mapId: mapCity._id,
                    x: Math.floor((Math.random()-0.5) * (mapCity.width-objectTypeRock.initWidth/2)),
                    y: Math.floor((Math.random()-0.5) * (mapCity.height-objectTypeRock.initHeight/2)),
                    width: objectTypeRock.initWidth,
                    height: objectTypeRock.initHeight,
                    objTypeId: objectTypeRock._id,
                    userId: 0
                }));
            }
            for(var i=1; i<200; i++) {
                mapObjectsRocks.push(new MapObject({
                    mapId: mapCity._id,
                    x: Math.floor((Math.random()-0.5) * (mapCity.width-objectTypeRock2.initWidth/2)),
                    y: Math.floor((Math.random()-0.5) * (mapCity.height-objectTypeRock2.initHeight/2)),
                    width: objectTypeRock2.initWidth,
                    height: objectTypeRock2.initHeight,
                    objTypeId: objectTypeRock2._id,
                    userId: 0
                }));
            }
            collMapObjects.insert(mapObjectsRocks, function(err,docs) {
                if (err) throw err;
            });
            addGameVariables();


    }

    function addGameVariables() {
        var collGameVars = db.collection('gameVars');
            gameVars = {
                rootMapId : mapCity._id
            }
            collGameVars.insert(gameVars, function(err,docs) {
                if (err) throw err;
                console.log("database is now ready!");
                db.close();
            });
    }
});
