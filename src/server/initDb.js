var async = require('async');

var fs = require('fs');

window = {};
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');

initGameData = require('./initGameData');

var gameData = initGameData.initGameData();


var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/serenity', {db: {native_parser: true}}, function(err, db) {
    if(!err) {
        console.log("We are connected");
    }

    if (err) throw err;

    var collSpritesheets = db.collection('spritesheets');
    var collMapTypes = db.collection('layerTypes');

    var collObjectType = db.collection('objTypes');
    var collRessourceType = db.collection('resTypes');
    var collTechnologyType = db.collection('techTypes');
    var collItemType = db.collection('itemTypes');
    var collUserType = db.collection('userTypes');


    var collMaps = db.collection('layers');
    var collMapObjects = db.collection('mapObjects');
    var collItems = db.collection('items');
    var collMapEvents = db.collection('mapEvents');
    var collGameVars = db.collection('gameVars');
    var collUsers = db.collection('users');
    var collLogins = db.collection('logins');
    var collSessions = db.collection('sessions');
    var collLayerServers = db.collection('layerServers');

    // remove all collections:
    async.each(
        [
            collSpritesheets,
            collMapTypes,
            collObjectType,
            collRessourceType,
            collTechnologyType,
            collItemType,
            collUserType,
            collMaps,
            collMapObjects,
            collItems,
            collMapEvents,
            collGameVars,
            collUsers,
            collLogins,
            collSessions,
            collLayerServers
        ],
        function(collection, cb) {
            // remove all content within collection:
            collection.remove({},cb);
        },
        function(err){
            addSpritesheets();
        }
    );

    function addSpritesheets() {
        console.log("add sprites")
        var saveData = gameData.spritesheets.save();
        collSpritesheets.insert(saveData, function(err,docs) {
            if (err) throw err;
            addMapTypes();
        });
    }

    function addMapTypes() {
        console.log("add map types")
        collMapTypes.insert(gameData.layerTypes.save(), function(err,docs) {
            if (err) throw err;
            addObjectTypes();
        });
    }

    function addObjectTypes() {
        console.log("add object types")
        collObjectType.insert(gameData.objectTypes.save(), function(err,docs) {
            if (err) throw err;
            addRessourceTypes();
        });
    }

    function addRessourceTypes() {
        console.log("add ressource types")
        collRessourceType.insert(gameData.ressourceTypes.save(), function(err,docs) {
            if (err) throw err;
            addTechnologyTypes();
        });
    }

    function addTechnologyTypes() {
        console.log("add technology types")
        collTechnologyType.insert(gameData.technologyTypes.save(), function(err,docs) {
            if (err) throw err;
            addItemTypes();
        });
    }


    function addItemTypes() {
        console.log("add item types")
        collItemType.insert(gameData.itemTypes.save(), function(err,docs) {
            if (err) throw err;
            addUserTypes();
        });
    }

    function addUserTypes() {
        console.log("add user types")
        collUserType.insert(gameData.userTypes.save(), function(err,docs) {
            if (err) throw err;
            addMaps();
        });
    }

    function addMaps() {
        console.log("add layers")
        collMaps.insert(gameData.layers.save(), function(err,docs) {
            if (err) throw err;
            addMapObjects();
        });
    }

    function addMapObjects() {
        console.log("add map objects")
        
        async.each(
            gameData.layers.toArray(),
            addMapObjectsOfMap,
            function(err){
                addItems();
            }
        );

    }

    function addMapObjectsOfMap(map, callback) {

        var toInsert = map.mapData.mapObjects.save();
        var temparray = [];
        var chunksize = 1000;
        for (var i=0,j=toInsert.length; i<j; i+=chunksize) {
            temparray.push(toInsert.slice(i,i+chunksize));
        }

        async.each(
            temparray,
            function(mapObjects, cb) {
                collMapObjects.insert(mapObjects, function (err, docs) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    cb(err);
                });
            },
            callback
        );
    }




    function addItems() {
        console.log("add items")
        var numMapsToAdd = gameData.layers.length();
        gameData.layers.each(function(map) {
            if (map.mapData.items.length()>0){
                collItems.insert(map.mapData.items.save(), function(err,docs) {
                    if (err) throw err;
                });
            }
            numMapsToAdd--;
            if(numMapsToAdd <= 0) {
                addUsers();
            }
        });
    }



    function addUsers() {
        console.log("add users")
        var numUsersToAdd = gameData.users.length();
        if(numUsersToAdd <= 0) {
            addGameVariables();
        }
        gameData.users.each(function(user) {
            collUsers.insert(user.save(), function(err,docs) {
                if (err) throw err;
            });
            numUsersToAdd--;
            if(numUsersToAdd <= 0) {
                addGameVariables();
            }
        });
    }


/*    function addItems() {
       console.log("add items")
       var numMapsToAdd = gameData.layers.length();
       gameData.layers.each(function(layer){
           console.log("in map")
            layer.mapObjects.each(function(obj){
                console.log(obj._id)
                collItems.insert(obj.items.save(), function(err,docs) {
                    console.log("in obj")
                    if (err) console.log("damn an error")  // here comes an error
                       // throw err;

                });

            });
           numMapsToAdd--;
           if(numMapsToAdd <= 0) {
               addGameVariables();
           }
       });
    }*/

    function addGameVariables() {
        console.log("add game variables")
        collGameVars.insert(initGameData.gameVars, function(err,docs) {
            if (err) throw err;
            console.log("database is now ready!");
            db.close();
            //process.exit(code=0);
            startServer()
        });
    }
});



var child_process = require('child_process');
var debugPortIterator = 5872;

function startServer() {
    var forker = child_process.fork(
        __dirname + '/server.js',
        [1],
        {
            //execArgv: ['--debug']
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}
