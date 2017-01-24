// Load the bcrypt module
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

express = require('express.io')
var MongoStore = require('connect-mongo')(express)

var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var Spritesheet = require('../game/Spritesheet').Spritesheet;
var User = require('../game/User').User;
var AbstractEvent = require('../game/events/AbstractEvent').AbstractEvent;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var zmq = require('zmq');
var socketioClient = require('socket.io-client');
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;
var bson = require('bson');
var serverName = "socketioProxy"+process.argv[2];

var BSON = bson.BSONPure.BSON;

// subscribe to map events
var subSock = zmq.socket('sub');
subSock.connect('tcp://127.0.0.1:3000');



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



var ntp = require('socket-ntp');

var fs = require('fs');
window = {};
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');

app = express().http().io()

var gameData = new GameData();
var gameVars = {};

var mongodb = require('mongodb');
//var BSON = mongodb.BSONPure;


var dbConn = require('./dbConnection');
var loadDb = require('./loadDb');
var dbUpdating = require('./dbUpdating');

loadDb.getGameData(gameData,gameVars,function() {
    console.log("finished loading game types...");
});

// Setup sessions
app.use(express.cookieParser())
var db = dbConn.getDb();
app.use(express.session({secret: 'thisIsAnAwesomeGame',
    store: new MongoStore({db: db})}))

app.use(express.static('../client'));
app.use('/game', express.static('../game'));
app.use('/ntpClient', express.static('node_modules/socket-ntp/client'));

// Session is automatically setup on initial request.
app.get('/', function (req, res) {
    req.session.lastActive = new Date().toString()
    res.sendfile('../client/index.html')
})

app.io.route('login', function (req) {
    var sid = req.sessionID;
    var username = req.data.name;
    var password = req.data.password;

    dbConn.get('users',function(err,collUsers){
        if (err) throw err;
        collUsers.findOne({name: username}, function (err, doc) {
            if (err) throw err;
            if (doc == null) {
                req.io.emit('loginError', {msg: "username does not exist!"});
            }
            else {
                bcrypt.compare(password, doc.pw, function (err, res) {
                    if (res) {
                        if (doc.sid != sid) {
                            collUsers.findAndModify({_id: doc._id }, [], {$set: {sid: sid}}, {new: true}, function (err, doc1) {
                                if (err) throw err;
                                req.session.username = doc.name;
                                req.session.userId = doc._id;
                                req.session.loggedIn = true;
                                console.log('login of userId: ' + doc1._id + ' username: ' + doc1.name);
                                req.io.emit('loggedIn', {userId: doc1._id});
                            });
                        }
                    }
                    else {
                        req.io.emit('loginError', {msg: "wrong password!"});
                        console.log('loginError of userId: ' + doc._id + ' username: ' + doc.name);
                    }
                });
            }

        })
    });

})

app.io.route('register', function (req) {

    var sid = req.sessionID;
    var username = req.data.name;
    var password = req.data.password;
    var email = req.data.email;

    dbConn.get('users',function(err,collUsers){
        if (err) throw err;
        collUsers.findOne({$or: [
            {name: username},
            {email: email}
        ]}, function (err, doc) {
            if (err) throw err;
            if (doc == null) {
                // Hash the password with the salt
                var pwhash = bcrypt.hashSync(password, salt);
                var userObject = {name: username, email: email, pw: pwhash, sid: sid};
                collUsers.insert(userObject, {w: 1 }, function (err) {
                    if (err) throw err;

                    console.log("insertId=" + userObject._id);
                    req.session.username = userObject.name;
                    req.session.userId = userObject._id;
                    req.session.loggedIn = true;
                    req.io.emit('registerFeedback', {
                        success: true
                    })
                    req.io.emit('loggedIn', {userId: userObject._id});
                });
            } else {
                var errormessage = "";
                if (doc.name == username) {
                    errormessage = "username already exists!";
                }
                if (doc.email == email) {
                    errormessage = "email already exists!";
                }
                req.io.emit('registerFeedback', {
                    success: false,
                    errormessage: errormessage
                })
            }
        });
    });

})

app.io.route('ready', function (req) {
    ntp.sync(req.io.socket);

    var sid = req.sessionID;
    console.log("sid=" + sid);
    // check if logged in:
    dbConn.get('users',function(err,collUsers){
        if (err) throw err;
        collUsers.findOne({sid: sid}, function (err, doc) {
            if (err) throw err;
            if (doc == null) {
                req.session.loggedIn = false;
                req.io.emit('loginPrompt');
            }
            else {
                req.session.username = doc.name;
                req.session.userId = doc._id;
                req.session.loggedIn = true;
                console.log("user " + doc.name + " is back! (userId=" + doc._id + ")");
                req.io.emit('loggedIn', {userId: doc._id});
            }
        });
    });

    // send map data anyway:
    var initGameData = {
        spritesheets: gameData.spritesheets.save(),
        layerTypes: gameData.layerTypes.save(),

        objectTypes: gameData.objectTypes.save(),
        ressourceTypes: gameData.ressourceTypes.save(),
        technologyTypes: gameData.technologyTypes.save(),
        itemTypes: gameData.itemTypes.save(),
        //featureTypes: gameData. featureTypes.save(),
        initMapId: gameVars.rootMapId

    };
    req.io.emit('initGameData', initGameData);
})

var clientsInMapIds = {}; // key: client, val: mapId
var mapIdsWithClients = {}; // key: mapId, val: {clientIds...}

function removeClientFromMap(socketId, req) {
    if (clientsInMapIds.hasOwnProperty(socketId)) {
        var oldMapId = clientsInMapIds[socketId];
        if (req) req.io.leave(oldMapId);
        delete mapIdsWithClients[oldMapId][socketId];
        if (mapIdsWithClients[oldMapId].length === 0) {
            subSock.unsubscribe('map_' + oldMapId);
        }
    }
    // TODO: notify old map server that this client left, so that the server may shutdown after some time...
}

function addClientToMap(socketId, mapId, req){
    if (req) req.io.join(mapId)
    if (!mapIdsWithClients.hasOwnProperty(mapId)) {
        mapIdsWithClients[mapId] = {};
    }
    mapIdsWithClients[mapId][socketId] = true;
    clientsInMapIds[socketId] = mapId;
    subSock.subscribe('map_' + mapId);
}


app.io.route('getMap', function (req) {
    var requestedMapId = req.data.mapId;
    asyncSocket.sendReq(
        [targetProxy, 'layer_'+requestedMapId],
        'getMap',
        {
            mapId: requestedMapId
        },
        function (mapData) {
            req.session.mapId = requestedMapId;
            req.io.respond(mapData);
            var socketId = req.socket.id;

            // remove old association between client and map:
            removeClientFromMap(socketId, req);

            // add new association between client and map:
            addClientToMap(socketId, requestedMapId, req);
        }
    );
});


app.io.sockets.on('connection', function(socket) {
    var socketId = socket.id;
    // and attach the disconnect event
    socket.on('disconnect', function() {
        removeClientFromMap(socketId);
    });
});

subSock.on('message', function(topic, msgData) {
    msgData = BSON.deserialize(msgData);
    //console.log('received a message related to:', topic, 'containing message:', msgData);
    app.io.room(msgData.map).broadcast(msgData.evt, msgData.dat);

    // TODO: hold broadcasts in memory for clients that are just connecting to this layer... send them this message delayed so that they don't miss any updates...

});

app.io.route('newGameEvent', function (req) {

    // check if correct login:
    if (req.session.loggedIn) {
        console.log("socket.io proxy receives new event from user " + req.session.username);
        var mapId = req.data[0];

        var msgData = {
            session: {
                username: req.session.username,
                loggedIn: req.session.loggedIn
            },
            data: req.data
        };

        // forward to corresponding serverLayer.js
        asyncSocket.sendReq(
            [targetProxy, 'layer_'+mapId],
            'newGameEvent',
            msgData,
            function (answer) {
                req.io.respond(answer);
            }
        );
    }
    else {
        req.io.respond({
            success: false
        });
        req.io.emit('loginPrompt');
    }
})




app.listen(8080)

