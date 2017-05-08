
var net = require('net');
var JsonSocket = require('json-socket');
var bcrypt = require('bcrypt');
var express = require('express.io')
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var Item = require('../game/Item').Item;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var Spritesheet = require('../game/Spritesheet').Spritesheet;
var User = require('../game/User').User;
var AbstractEvent = require('../game/events/AbstractEvent').AbstractEvent;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var mongodb = require('mongodb');
var dbConn = require('./dbConnection');
var loadDb = require('./loadDb');
var dbUpdating = require('./dbUpdating');
var zmq = require('zmq');
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;
var bson = require('bson');
var async = require('async');

var BSON = bson.BSONPure.BSON;
var fs = require('fs');
window = {};
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');


var serverMapId = process.argv[2];
var serverName = 'layer_'+serverMapId;
console.log('starting new layer server with mapId ' + serverMapId);


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

app = express().http().io()

var gameData = new GameData();
var gameVars = {};
var mapLoaded = false;
var mapLoadedCallbacks = [];
loadDb.getGameData(gameData,gameVars,function() {
    console.log("finished loading game types...")
    loadDb.getMapById(gameData, serverMapId, function() {
        console.log("finished loading map " + serverMapId)
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
                initItems: mapData.mapData.items.save()
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
        dbConn.get('users', function (err, collUsers) {
            if (err) throw err;
            collUsers.find({_id: userId}).toArray(function (err, documents) {
                if (err) throw err;
                if (documents != null) {

                    var user = new User(gameData, documents[0]);
                    gameData.users.add(user);

                    if (user) {
                        var data = {
                            internal: user.save()
                        };
                        reply(data);
                    }
                    else {
                        reply(null, new Error("error: user was not found!"));
                    }
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
    if (msgData.event == "loadFromDb") {

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
                }
            ],
            function(err, results){
                if (err) {
                    console.log("error retrieving from db");
                }

                // wait for mapdata to be fully loaded:
                whenMapLoaded(function(){

                    // now add objects and items to mapData:

                    var documentsObjects = results[0];
                    if (documentsObjects != null) {
                        for (var i = 0; i < documentsObjects.length; i++) {
                            var mapObj = new MapObject(gameData, documentsObjects[i]);
                            gameData.layers.get(serverMapId).mapData.addObject(mapObj);
                            mapObj.setPointers();
                        }
                    }

                    var documentsItems = results[1];
                    if (documentsItems != null) {
                        for (var i=0; i<documentsItems.length; i++) {
                            var item = new Item(gameData, documentsItems[i]);
                            gameData.layers.get(serverMapId).mapData.addItem(item);
                            item.setPointers();
                        }
                    }

                });

            }
        );

    }

});



asyncSocket.on('newGameEvent',function(msgData, reply) {

    // check if correct login:
    if (msgData.session.loggedIn) {
        console.log("new event from user " + msgData.session.username);
        var mapId = msgData.data[0];

        // update world:
        var numEventsFinished = gameData.layers.get(mapId).timeScheduler.finishAllTillTime(Date.now());

        var gameEvent = EventFactory(gameData,msgData.data[1]);
        gameEvent._userId = msgData.session.userId;
        gameEvent._mapId = mapId;
        gameEvent.setPointers();

        // check if event is valid:
        if (gameEvent.isValid()) {

            gameEvent.oldId = gameEvent._id;
            gameEvent._id = (new mongodb.ObjectID()).toHexString();

            // execute event locally on server:
            gameEvent.executeOnServer();
            var notifyMsg = gameEvent.notifyServer();
            var callbackAfterSave = null;
            if (notifyMsg) {
                callbackAfterSave = function() {
                    console.log("callbackAfterSave");
                    notifyServer(notifyMsg);
                }
            }

            dbUpdating.reflectLayerToDb(gameData, gameData.layers.get(mapId), callbackAfterSave);
            console.log("event was successfully executed. Now broadcast to clients...");

            var serializedGameEvent = gameEvent.save();
            // the following broadcast goes to the client who created the event:
            reply({
                success: true//,
                //updatedEvent: serializedGameEvent
            });

            // the following broadcast goes to all clients:
            var msgData = {
                evt: 'newGameEvent',
                map: mapId,
                dat: serializedGameEvent
            }
            pubSock.send(['map_' + mapId, BSON.serialize(msgData,false,true,false)]);

            // save to  db
            dbConn.get('mapEvents', function (err, collMapEvents) {
                if (err) throw err;
                collMapEvents.save(serializedGameEvent, {safe:true}, function(err,docs) {
                    if (err) throw err;
                    else {
                        console.log("saved event "+serializedGameEvent._id+" to db");
                    }
                });
            });

        }
        else {
            console.log("event is not valid!!");
            if (numEventsFinished > 0) {
                dbUpdating.reflectLayerToDb(gameData, gameData.layers.get(mapId));
            }
            reply({success: false});
        }
    }
    else {
        reply({
            success: false
        });
    }
})

app.listen(0);

var os = require("os");
var hostname = os.hostname();
var port = app.server.address().port;
console.log("server of layer " + serverMapId + " is on listening on host " + hostname + " on port " + port);

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

