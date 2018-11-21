
var net = require('net');
var JsonSocket = require('json-socket');
var bcrypt = require('bcrypt');
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var Item = require('../game/Item').Item;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var Spritesheet = require('../game/Spritesheet').Spritesheet;
var User = require('../game/User').User;
var AbstractEvent = require('../game/events/AbstractEvent').AbstractEvent;
var LoadEntitiesEvent = require('../game/events/LoadEntitiesEvent').LoadEntitiesEvent;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var mongodb = require('mongodb');
var dbConn = require('./dbConnection');
var loadDb = require('./loadDb');
var dbUpdating = require('./dbUpdating');
var zmq = require('zeromq');
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;
var async = require('async');
var bsonlib = require('bson');
var BSON = new bsonlib();
var fs = require('fs');
window = {};
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');


var serverMapId = process.argv[2];
var serverName = 'layer_'+serverMapId;
console.log('starting new layer server with mapId ' + serverMapId);

require('console-stamp')(console, {
    pattern: 'HH:MM:ss.l',
    metadata: '[' + serverName + ']'
});

// start publishing socket for broadcasts to all connected clients:
var pubSock = zmq.socket('pub');
pubSock.connect('tcp://127.0.0.1:3001');

// start asyncSocket for request-response communication:
var asyncSocket = new AsyncSocket('router');
asyncSocket.identity = serverName;
var targetProxy = 'proxy1';
var registeredAtProxy = false;
function registerToProxy() {
    asyncSocket.sendReq(
        targetProxy,
        'register',
        serverName,
        function(success, err) {
            if (success) {
                registeredAtProxy = true;
                console.log(serverName + ': registered at proxy!');

                process.send({ registration: true });

            }
            else {
                console.log(err);
                console.log(serverName + ': registration at proxy failed!');

                //retry:
                registerToProxy();
            }
        },
        300 //timeout 300 ms
    );
}
asyncSocket.monitor();
asyncSocket.on("connect",function(event_value, event_endpoint_addr){
    console.log(serverName + ': Connect event: '+ event_value + '  addr: ' + event_endpoint_addr);
    // register this client to proxy:
    registerToProxy();
});
asyncSocket.connect('tcp://127.0.0.1:5001');


var salt = bcrypt.genSaltSync(10);

var gameData = new GameData();
var gameVars = {};
var mapLoaded = false;
var mapLoadedCallbacks = [];
loadDb.getGameData(gameData,gameVars,function() {
    console.log("finished loading game types...");
    loadDb.getMapById(gameData, serverMapId, function() {
        console.log("finished loading map " + serverMapId);
        var layer = gameData.layers.get(serverMapId);
        if (!layer.mapGenerator.isInitialized ) {
            layer.mapGenerator.init();
            dbUpdating.reflectLayerToDb(gameData, layer, function() {

            });
        }

        mapLoaded = true;
        for (var key in mapLoadedCallbacks){
            mapLoadedCallbacks[key]();
        }
        mapLoadedCallbacks = [];
    });
});

var db = dbConn.getDb();

var port = 0;
var server = net.createServer();
server.listen(port);
server.on('connection', function(socket) { //This is a standard net.Socket
    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
    socket.on('message', function(message) {
        var result = message.a + message.b;
        socket.sendEndMessage({result: result});
    });
});


function whenMapLoaded(cb) {
    if (mapLoaded) {
        cb();
    }
    else {
        mapLoadedCallbacks.push(cb);
    }
}


asyncSocket.on('getMap',function(msgData, reply) {
    console.log(serverName + ": getMap "+msgData.mapId);
    whenMapLoaded(function(){
        var mapData = gameData.layers.get(msgData.mapId);
        if (mapData) {
            // update world:
            mapData.timeScheduler.finishAllTillTime(Date.now());
            var sendMap = {
                initMap: mapData.save(),
                initMapObjects: mapData.mapData.mapObjects.save(),
                initMapEvents: mapData.eventScheduler.events.save(),
                initItems: mapData.mapData.items.save(),
                currentTime: mapData.currentTime
            };
            reply(sendMap);
        }
        else {
            reply(null, new Error("error: map was not found!"));
        }
    });
});



asyncSocket.on('getUserData',function(msgData, reply) {
    var userId = msgData.userId;
    if (userId != null){
        console.log("getting userData of userId="+userId);
        dbConn.get('users', function (err, collUsers) {
            if (err) throw err;
            collUsers.find({_id: userId}).toArray(function (err, documents) {
                if (err) throw err;
                if (documents != null && documents.length > 0) {
                    var user = new User(gameData, documents[0]);
                    var tmp = gameData.users.get(user._id());
                    if (tmp) {
                        gameData.users.deleteById(user._id());
                    }
                    gameData.users.add(user);
                }

                if (user) {
                    reply({
                        success: true,
                        internal: user.save()
                    });
                }
                else {
                    reply({
                        success: false
                    });
                }

            });
        });

    }

});


function notifyServer(msgData) {
    asyncSocket.sendNotify(
        [targetProxy, 'layer_'+msgData.targetMapId],
        'serverNotify',
        msgData
    );
}

asyncSocket.on('serverNotify',function(msgData) {
    console.log(serverName+" received serverNotify event "+msgData.event);

    if (msgData.event == "executeEvent") {

        whenMapLoaded(function() {
            dbConn.get('mapEvents', function (err, collEvents) {
                if (err) throw err;
                collEvents.findOne({_id: msgData.eventId}, function (err, document) {

                    var eventScheduler = gameData.layers.get(msgData.targetMapId).eventScheduler;

                    // create the event:
                    var gameEvent = EventFactory(eventScheduler.events, document);

                    // set some properties of events:
                    gameEvent.isInServerNotify = true;

                    // if it already exists, then first delete the old event:
                    var existing = eventScheduler.events.get(gameEvent._id());
                    if (existing) {
                        eventScheduler.removeEvent(existing);
                    }

                    // now execute and broadcast to clients:
                    var err = executeGameEvent(gameEvent, msgData.targetMapId);

                    if (err) {
                        console.log(err);
                    }

                });
            });
        });

    }
    else if (msgData.event == "loadFromDb") {

        async.parallel([
                function(callback){
                    if (msgData.itemIds.length>0) {
                        dbConn.get('mapObjects', function (err, collMapObjects) {
                            if (err) throw err;
                            collMapObjects.find({ _id: { $in: msgData.objectIds } }).toArray(function (err, documents) {
                                //documentsObjects = documents;
                                callback(null, documents);
                            });
                        });
                    }
                    else {
                        callback(null, []);
                    }
                },
                function(callback){
                    if (msgData.itemIds.length>0) {
                        dbConn.get('items', function (err, collItems) {
                            if (err) throw err;
                            collItems.find({ _id: { $in: msgData.itemIds } }).toArray(function (err, documents) {
                                //documentsItems = documents;
                                callback(null, documents);
                            });
                        });
                    }
                    else {
                        callback(null, []);
                    }
                },
                function(callback){
                    if (msgData.eventIds.length>0) {
                        dbConn.get('mapEvents', function (err, collEvents) {
                            if (err) throw err;
                            collEvents.find({ _id: { $in: msgData.eventIds } }).toArray(function (err, documents) {
                                //documentsItems = documents;
                                callback(null, documents);
                            });
                        });
                    }
                    else {
                        callback(null, []);
                    }
                }
            ],
            function(err, results){
                if (err) {
                    console.log("error retrieving from db");
                }

                // wait for mapdata to be fully loaded:
                whenMapLoaded(function(){

                    var mapData = gameData.layers.get(serverMapId).mapData;
                    var eventScheduler = gameData.layers.get(serverMapId).eventScheduler;
                    // now add objects and items to mapData:

                    var documentsObjects = results[0];
                    var mapObjects = [];
                    if (documentsObjects != null) {
                        for (var i = 0; i < documentsObjects.length; i++) {
                            var mapObj = new MapObject(mapData.mapObjects, documentsObjects[i]);

                            // if it already exists, then first delete the old object:
                            var existing = mapData.mapObjects.get(mapObj._id());
                            if (existing) {
                                mapData.removeObjectAndUnembedd(existing);
                            }
                            mapObjects.push(mapObj);
                        }
                    }

                    var documentsItems = results[1];
                    var items = [];
                    if (documentsItems != null) {
                        for (var i=0; i<documentsItems.length; i++) {
                            var item = new Item(mapData.items, documentsItems[i]);

                            // if it already exists, then first delete the old object:
                            var existing = mapData.items.get(item._id());
                            if (existing) {
                                mapData.removeItemAndUnembedd(existing);
                            }
                            items.push(item);
                        }
                    }

                    /**
                    var documentsEvents = results[2];
                    var events = [];
                    if (documentsEvents != null) {
                        for (var i=0; i<documentsEvents.length; i++) {
                            var event = EventFactory(eventScheduler.events, documentsEvents[i]);

                            // if it already exists, then first delete the old object:
                            var existing = eventScheduler.events.get(event._id());
                            if (existing) {
                                eventScheduler.removeEvent(existing);
                            }
                            events.push(event);
                        }
                    }
                     **/


                    // now broadcast:
                    var loadEntititesEvent = new LoadEntitiesEvent(eventScheduler.events);
                    loadEntititesEvent.mapId = msgData.targetMapId;
                    loadEntititesEvent.mapObjects = mapObjects;
                    loadEntititesEvent.items = items;

                    executeGameEvent(loadEntititesEvent, msgData.targetMapId);

                });

            }
        );

    }

});


function executeGameEvent(gameEvent, mapId) {

    var currentTime = Date.now();
    var eventScheduler = gameData.layers.get(mapId).eventScheduler;

    // update world:
    var numEventsFinished = gameData.layers.get(mapId).timeScheduler.finishAllTillTime(currentTime);

    gameEvent.setPointers();
    gameEvent.startedTime = currentTime;

    // check if event is valid:
    if (gameEvent.isValid()) {


        gameEvent.oldId = gameEvent._id;
        gameEvent._id = (new mongodb.ObjectID()).toHexString();
        gameEvent.isFinished = false;

        // add the new event:
        eventScheduler.addEvent(gameEvent);

        gameData.layers.currentTime = currentTime;

        // execute event locally on server:
        gameEvent.executeOnServer();
        var notifyMsg = gameEvent.notifyServer();
        var callbackAfterSave = null;
        if (notifyMsg) {
            callbackAfterSave = function () {
                console.log("callbackAfterSave");
                notifyServer(notifyMsg);
            }
        }

        dbUpdating.reflectLayerToDb(gameData, gameData.layers.get(mapId), callbackAfterSave);
        console.log("event was successfully executed. Now broadcast to clients...");

        var serializedGameEvent = gameEvent.save();

        // the following broadcast goes to all clients:
        var msgData = {
            evt: 'newGameEvent',
            map: mapId,
            dat: serializedGameEvent
        };
        pubSock.send(['map_' + mapId, BSON.serialize(msgData, false, true, false)]);
        return 0;
    }
    else {
        if (numEventsFinished > 0) {
            dbUpdating.reflectLayerToDb(gameData, gameData.layers.get(mapId));
        }
        console.log("event is not valid!");
        return "event is not valid!";
    }

}


asyncSocket.on('newGameEvent',function(msgData, reply) {

    // check if correct login:
    if (msgData.session.loggedIn) {

        console.log("new event from user " + msgData.session.username);
        var mapId = msgData.data[0];
        var eventScheduler = gameData.layers.get(mapId).eventScheduler;

        // create the event:
        var gameEvent = EventFactory(eventScheduler.events,msgData.data[1]);

        // set some properties of events:
        gameEvent.isInServerNotify = false;
        gameEvent.userId = msgData.session.userId;
        gameEvent.mapId = mapId;

        var err = executeGameEvent(gameEvent, mapId);

        if (err) {
            reply({
                success: false,
                msg: err
            });
        }

        // the following broadcast goes to the client who created the event:
        reply({
            success: true
        });

    }
    else {
        reply({
            success: false,
            msg: "not logged in!"
        });
    }
});

var os = require("os");
var hostname = os.hostname();
console.log("server of layer " + serverMapId + " is on listening on host " + hostname + " on port " + port);

setInterval(function() {
    whenMapLoaded(function() {
        var mapData = gameData.layers.get(serverMapId);
        if (mapData) {
            // update world:
            mapData.timeScheduler.finishAllTillTime(Date.now());
        }
    });
}, 200);

//
//dbConn.get('layerServers', function (err, collLayerServers) {
//    if (err) throw err;
//
//    collLayerServers.save(
//        {
//            _id: serverMapId,
//            hostname: hostname,
//            port: port
//        },
//        function(err,docs) {
//            if (err) throw err;
//            console.log("successfully saved server hostname and port to db")
//        }
//    );
//
//});


//var collLayerServers = db.collection('layerServers');

