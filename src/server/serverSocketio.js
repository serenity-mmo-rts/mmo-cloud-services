// Load the bcrypt module
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var path = require('path');

//express = require('express.io')
var express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
var app = express();
var server  = require("http").createServer(app);
var io = require("socket.io")(server);


var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/MapObject').MapObject;
var ObjectType = require('../game/types/ObjectType').ObjectType;
var Spritesheet = require('../game/Spritesheet').Spritesheet;
var User = require('../game/User').User;
var AbstractEvent = require('../game/events/AbstractEvent').AbstractEvent;
var EventFactory = require('../game/events/EventFactory').EventFactory;
var zmq = require('zeromq');
var socketioClient = require('socket.io-client');
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;
var BSON = new require('bson')();


var serverName = "socketioProxy"+process.argv[2];

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

//app = express().http().io();

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
var db = dbConn.getDb();
dbConn.connect(function() {
    console.log("setting up sessions and connecting them to express and socket.io");

    var session = expressSession({
        secret: "thisIsAnAwesomeGame",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({db: db})
    });
    var sharedsession = require("express-socket.io-session");
    app.use(session);

    // Share session with io sockets
    io.use(sharedsession(session));

    // Session is automatically setup on initial request.
    app.get('/', function (req, res) {
        req.session.lastActive = new Date().toString();
        req.session.cookie.maxAge = 3600000 * 24;
        res.sendFile(path.resolve(__dirname + '/../client/index.html'));
    });



    app.use(express.static('../client'));
    app.use('/game', express.static('../game'));
    app.use('/ntpClient', express.static('node_modules/socket-ntp/client'));

    io.on("connection", function(socket) {

        var socketId = socket._id;

        // Accept a login event with user's data
        socket.on("login", function(userdata) {

            var sid = socket.handshake.session.id;
            var username = userdata.name;
            var password = userdata.password;

            dbConn.get('logins',function(err,collLogins){
                if (err) throw err;
                collLogins.findOne({name: username}, function (err, doc) {
                    if (err) throw err;
                    if (doc == null) {
                        socket.emit('loginError', {msg: "username does not exist!"});
                    }
                    else {
                        bcrypt.compare(password, doc.pw, function (err, res) {
                            if (res) {

                                socket.handshake.session.userdata = {};
                                socket.handshake.session.userdata.username = doc.name;
                                socket.handshake.session.userdata.loginId = doc._id;
                                socket.handshake.session.userdata.userId = doc.userId;
                                socket.handshake.session.save();
                                userLoggedIn(socket);

                                if (doc.sid != sid) {
                                    collLogins.findAndModify({_id: doc._id }, [], {$set: {sid: sid}}, {new: true}, function (err, doc1) {
                                        if (err) throw err;
                                    });
                                }
                            }
                            else {
                                socket.emit('loginError', {msg: "wrong password!"});
                                console.log('loginError of userId: ' + doc._id + ' username: ' + doc.name);
                            }
                        });
                    }

                })
            });
        });

        socket.on("logout", function() {
            if (socket.handshake.session.userdata) {
                delete socket.handshake.session.userdata;
                socket.handshake.session.save();
            }
            socket.emit("loggedOut");
        });

        socket.on('register', function (data) {

            var sid = socket.handshake.session.id;
            var username = data.name;
            var password = data.password;
            var email = data.email;

            dbConn.get('logins',function(err,collLogins){
                if (err) throw err;
                collLogins.findOne({$or: [
                    {name: username},
                    {email: email}
                ]}, function (err, doc) {
                    if (err) throw err;
                    if (doc == null) {

                        // Hash the password with the salt
                        var pwhash = bcrypt.hashSync(password, salt);
                        var loginId = (new mongodb.ObjectID()).toHexString();
                        var userId = (new mongodb.ObjectID()).toHexString();

                        var userLogin = {_id: loginId, userId: userId, name: username, email: email, pw: pwhash, sid: sid};
                        var userObject = new User(gameData,{_id: userId, userTypeId: "normalUser" , name: username, loginId: loginId});

                        collLogins.insert(userLogin, {w: 1 }, function (err) {
                            if (err) throw err;
                            console.log("inserted loginId=" + userLogin._id);
                            dbConn.get('users',function(err,collUsers) {
                                if (err) throw err;
                                collUsers.insert(userObject.save(), {w: 1 }, function (err) {
                                    if (err) throw err;
                                    console.log("inserted userId=" + userId);
                                    socket.handshake.session.userdata = {};
                                    socket.handshake.session.userdata.username = username;
                                    socket.handshake.session.userdata.loginId = loginId;
                                    socket.handshake.session.userdata.userId = userId;
                                    socket.handshake.session.save();
                                    socket.emit('registerFeedback', {
                                        success: true
                                    });
                                    userLoggedIn(socket);
                                });
                            });

                        });

                    } else {
                        var errormessage = "";
                        if (doc.name == username) {
                            errormessage = "username already exists!";
                        }
                        if (doc.email == email) {
                            errormessage = "email already exists!";
                        }
                        socket.emit('registerFeedback', {
                            success: false,
                            errormessage: errormessage
                        })
                    }
                });
            });

        });

        socket.on('ready', function (data) {
            ntp.sync(socket);

            var sid = socket.handshake.session.id;
            console.log("sid=" + sid);

            // check if logged in:
            if (socket.handshake.session.userdata) {
                console.log("user is already logged in");
                userLoggedIn(socket);
            }
            else {
                console.log("user is not logged in");
                socket.emit('loginPrompt');
            }

            // send map data anyway:
            var initGameData = {
                spritesheets: gameData.spritesheets.save(),
                layerTypes: gameData.layerTypes.save(),

                objectTypes: gameData.objectTypes.save(),
                ressourceTypes: gameData.ressourceTypes.save(),
                technologyTypes: gameData.technologyTypes.save(),
                itemTypes: gameData.itemTypes.save(),
                userTypes: gameData.userTypes.save(),
                //featureTypes: gameData. featureTypes.save(),
                initMapId: gameVars.rootMapId

            };
            socket.emit('initGameData', initGameData);
        });



        socket.on('getMap', function (data, replyFcn) {
            var requestedMapId = data.mapId;
            console.log("serverSocketio: getMap: "+requestedMapId);
            if (requestedMapId==0) {
                console.log("error: the client is requesting MapId=0 !!!!!!!!!!!")
                return;
            }
            asyncSocket.sendReq(
                [targetProxy, 'layer_'+requestedMapId],
                'getMap',
                {
                    mapId: requestedMapId
                    //userId: socket.handshake.session.userdata.userId
                },
                function (mapData) {
                    socket.handshake.session.mapId = requestedMapId;
                    socket.handshake.session.save();
                    replyFcn(mapData);
                    var socketId = socket._id;

                    // remove old association between client and map:
                    removeClientFromMap(socketId, socket);

                    // add new association between client and map:
                    addClientToMap(socketId, requestedMapId, socket);
                }
            );
        });


        socket.on('getUserData', function (data, replyFcn) {
            var clientConnectedToMapId = socket.handshake.session.mapId;
            if (!clientConnectedToMapId) {
                console.log(serverName+': ERROR: getUserData without a valid mapId!!!');
                replyFcn(null);
                return;
            }
            if (!socket.handshake.session.userdata) {
                console.log(serverName+': ERROR: cannot getUserData, because user is not logged in!');
                replyFcn(null);
                return;
            }
            asyncSocket.sendReq(
                [targetProxy, 'layer_'+clientConnectedToMapId],
                'getUserData',
                {
                    userId: socket.handshake.session.userdata.userId
                },
                function (userData) {
                    replyFcn(userData);
                }
            );
        });

        // and attach the disconnect event
        socket.on('disconnect', function() {
            removeClientFromMap(socketId);
        });

        socket.on('newGameEvent', function (data, replyFcn) {

            // check if correct login:
            if (socket.handshake.session.userdata) {
                console.log("socket.io proxy receives new event from user " + socket.handshake.session.userdata.username);
                var mapId = data[0];

                var msgData = {
                    session: {
                        username: socket.handshake.session.userdata.username,
                        loggedIn: true,
                        userId: socket.handshake.session.userdata.userId
                    },
                    data: data
                };

                // forward to corresponding serverLayer.js
                asyncSocket.sendReq(
                    [targetProxy, 'layer_'+mapId],
                    'newGameEvent',
                    msgData,
                    function (answer) {
                        replyFcn(answer);
                    }
                );
            }
            else {
                replyFcn({
                    success: false
                });
                socket.emit('loginPrompt');
            }
        })


    });



    var clientsInMapIds = {}; // key: client, val: mapId
    var mapIdsWithClients = {}; // key: mapId, val: {clientIds...}

    function removeClientFromMap(socketId, socket) {
        if (clientsInMapIds.hasOwnProperty(socketId)) {
            var oldMapId = clientsInMapIds[socketId];
            if (socket) {
                socket.leave(oldMapId);
            }
            delete mapIdsWithClients[oldMapId][socketId];
            if (mapIdsWithClients[oldMapId].length === 0) {
                subSock.unsubscribe('map_' + oldMapId);
            }
        }
        // TODO: notify old map server that this client left, so that the server may shutdown after some time...
    }

    function addClientToMap(socketId, mapId, socket){
        if (socket) {
            socket.join(mapId);
        }

        if (!mapIdsWithClients.hasOwnProperty(mapId)) {
            mapIdsWithClients[mapId] = {};
        }
        mapIdsWithClients[mapId][socketId] = true;
        clientsInMapIds[socketId] = mapId;
        subSock.subscribe('map_' + mapId);
    }


    function userLoggedIn(socket) {
        console.log("user " + socket.handshake.session.userdata.username + " is back! (userId=" + socket.handshake.session.userdata.userId + ")");
        socket.emit('loggedIn', {userId: socket.handshake.session.userdata.userId, userName: socket.handshake.session.userdata.username });
    }


    subSock.on('message', function(topic, msgData) {
        msgData = BSON.deserialize(msgData);
        //console.log('received a message related to:', topic, 'containing message:', msgData);
        io.to(msgData.map).emit(msgData.evt, msgData.dat);

        // TODO: hold broadcasts in memory for clients that are just connecting to this layer... send them this message delayed so that they don't miss any updates...

    });




    server.listen(8080);



});

