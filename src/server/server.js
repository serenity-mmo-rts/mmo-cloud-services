// Load the bcrypt module
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

express = require('express.io')
var MongoStore = require('connect-mongo')(express)

var GameList = require('../game/GameList').GameList;
var GameData = require('../game/GameData').GameData;
var MapObject = require('../game/mapObjects/MapObject').MapObject;
var createMapObject = require('../game/mapObjects/createMapObject').createMapObject;
var MapType = require('../game/MapType').MapType;

var ObjectType = require('../game/types/ObjectType').ObjectType;
var RessourceType = require('../game/types/RessourceType').RessourceType;
var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
var ItemType = require('../game/types/ItemType').ItemType;
//var FeatureType = require('../game/types/FeatureType').FeatureType;


var Spritesheet = require('../game/Spritesheet').Spritesheet;
var MapData = require('../game/MapData').MapData;
var User = require('../game/User').User;
var AbstractEvent = require('../game/events/AbstractEvent').AbstractEvent;
var EventFactory = require('../game/events/EventFactory').EventFactory;



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
loadDb.getGameData(gameData,gameVars);

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
    initGameData = {
        spritesheets: gameData.spritesheets.save(),
        mapTypes: gameData.mapTypes.save(),

        objectTypes: gameData.objectTypes.save(),
        ressourceTypes: gameData.ressourceTypes.save(),
        technologyTypes: gameData.technologyTypes.save(),
        itemTypes: gameData.itemTypes.save(),
        //featureTypes: gameData. featureTypes.save(),
        initMapId: gameVars.rootMapId

    };
    req.io.emit('initGameData', initGameData);
})

app.io.route('getMap', function (req) {

    var mapData = gameData.maps.get(req.data.mapId);

    if (mapData) {
        // update world:
        mapData.eventScheduler.finishAllTillTime(Date.now());

        req.io.respond({
            initMap: mapData.save(),
            initMapObjects: mapData.mapObjects.save(),
            initMapEvents: mapData.eventScheduler.events.save(),
            initItems: mapData.items.save()
        });
    }

})

app.io.route('newGameEvent', function (req) {



    // check if correct login:
    if (req.session.loggedIn) {
        console.log("new event from user " + req.session.username);
        var mapId = req.data[0];

        // update world:
        gameData.maps.get(mapId).eventScheduler.finishAllTillTime(Date.now());

        var gameEvent = EventFactory(gameData,req.data[1]);
        gameEvent.setInitialized();

        // check if event is valid:
        if (gameEvent.isValid()) {
            gameEvent.setValid();

            gameEvent._id = (new mongodb.ObjectID()).toHexString();

            // execute event locally on server:
            gameEvent.executeOnServer();

            console.log("event was successfully executed and added to eventScheduler. Now broadcast to clients...");

            // the following broadcast goes to the client who created the event:
            req.io.respond({
                success: true,
                updatedEvent: gameEvent.save()
            });

            // the following broadcast goes to all clients, but not the one who created the event:
            req.io.broadcast('newGameEvent', [mapId, gameEvent.save()]);
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


app.listen(8080)

