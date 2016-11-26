
var net = require('net');
var JsonSocket = require('json-socket');
var bcrypt = require('bcrypt');
var express = require('express.io')
var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var Spritesheet = require('../game/Spritesheet').Spritesheet;
var User = require('../game/User').User;
var AbstractEvent = require('../game/events/AbstractEvent').AbstractEvent;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var mongodb = require('mongodb');
var dbConn = require('./dbConnection');
var loadDb = require('./loadDb');
var dbUpdating = require('./dbUpdating');

var fs = require('fs');
window = {};
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');


var serverMapId = process.argv[2];
console.log('starting new layer server with mapId ' + serverMapId);

var salt = bcrypt.genSaltSync(10);

app = express().http().io()

var gameData = new GameData();
var gameVars = {};
loadDb.getGameData(gameData,gameVars,function() {
    console.log("finished loading game types...")
    loadDb.getMapById(gameData, serverMapId, function() {
        console.log("finished loading map " + serverMapId)
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


app.io.route('getMap', function (req) {

    console.log("getMap");
    var mapData = gameData.layers.get(req.data.mapId);

    if (mapData) {
        // update world:
        mapData.timeScheduler.finishAllTillTime(Date.now());

        var sendMap = {
            initMap: mapData.save(),
            initMapObjects: mapData.mapData.mapObjects.save(),
            initMapEvents: mapData.eventScheduler.events.save(),
            initItems: mapData.mapData.items.save()
        }

        req.io.respond(sendMap);
    }

})

app.io.route('newGameEvent', function (req) {

    // check if correct login:
    if (req.session.loggedIn) {
        console.log("new event from user " + req.session.username);
        var mapId = req.data[0];

        // update world:
        var numEventsFinished = gameData.layers.get(mapId).timeScheduler.finishAllTillTime(Date.now());
        if (numEventsFinished > 0) {
            dbUpdating.reflectLayerToDb(gameData, gameData.layers.get(mapId));
        }

        var gameEvent = EventFactory(gameData,req.data[1]);
        gameEvent._userId = req.session.username;
        gameEvent._mapId = mapId;
        gameEvent.setPointers();

        // check if event is valid:
        if (gameEvent.isValid()) {

            gameEvent._id = (new mongodb.ObjectID()).toHexString();

            // execute event locally on server:
            gameEvent.executeOnServer();
            dbUpdating.reflectLayerToDb(gameData, gameData.layers.get(mapId));
            console.log("event was successfully executed. Now broadcast to clients...");

            var serializedGameEvent = gameEvent.save();
            // the following broadcast goes to the client who created the event:
            req.io.respond({
                success: true,
                updatedEvent: serializedGameEvent
            });

            // the following broadcast goes to all clients, but not the one who created the event:
            req.io.broadcast('newGameEvent', [mapId, serializedGameEvent]);

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
            req.io.respond({success: false});
        }
    }
    else {
        req.io.respond({
            success: false
        });
        req.io.emit('loginPrompt');
    }
})

app.listen(0);

var os = require("os");
var hostname = os.hostname();
var port = app.server.address().port;
console.log("server of layer " + serverMapId + " is on listening on host " + hostname + " on port " + port);


dbConn.get('layerServers', function (err, collLayerServers) {
    if (err) throw err;

    collLayerServers.save(
        {
            _id: serverMapId,
            hostname: hostname,
            port: port
        },
        function(err,docs) {
            if (err) throw err;
            console.log("successfully saved server hostname and port to db")
        }
    );

});


//var collLayerServers = db.collection('layerServers');

