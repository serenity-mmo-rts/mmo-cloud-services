// Load the bcrypt module
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

express = require('express.io')
var MongoStore = require('connect-mongo')(express)
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

app = express().http().io()


var mapDataCollection;
var userCollection;
var collSpritesheets;
var collMapTypes;
var collObjectType;
var collMaps;
var collMapObjects;
var collGameVars;

var gameData = new GameData();
var gameVars = {};

var mongodb = require('mongodb');
var BSON = mongodb.BSONPure;

var db = new mongodb.Db('serenity', new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT, {auto_reconnect: true}), {w: 1});
db.open(function (err, db) {
    if (!err) {
        console.log("Connection to mongodb established.");

        // load gamedata:
        mapDataCollection = db.collection('mapData');
        userCollection = db.collection('users');
        collSpritesheets = db.collection('spritesheets');
        collMapTypes = db.collection('mapTypes');
        collObjectType = db.collection('objTypes');
        collMaps = db.collection('maps');
        collMapObjects = db.collection('mapObjects');
        collGameVars = db.collection('gameVars');

        collSpritesheets.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.spritesheets = new GameList(Spritesheet, docs);
        });
        collMapTypes.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.mapTypes = new GameList(MapType, docs);
        });
        collObjectType.find().toArray(function (err, docs) {
            if (err) throw err;
            gameData.objectTypes = new GameList(ObjectType, docs);
        });
        collMaps.find().each(function (err, doc) {
            if (err) throw err;
            if (doc != null) {
                var currentMapData = gameData.maps.add(doc);
                collMapObjects.find({'mapId': currentMapData._id}).toArray(function (err, docs) {
                    if (err) throw err;
                    currentMapData.mapObjects = new GameList(MapObject, docs);
                });
            }
        });
        collGameVars.findOne([], function (err, doc) {
            if (err) throw err;
            gameVars = doc;
        });


    }
})




// Setup sessions
app.use(express.cookieParser())
app.use(express.session({secret: 'thisIsAnAwesomeGame',
    store: new MongoStore({db: db})}))

app.use(express.static('../client'));
app.use('/game', express.static('../game'));

// Session is automatically setup on initial request.
app.get('/', function (req, res) {
    req.session.lastActive = new Date().toString()
    res.sendfile('../client/index.html')
})


app.io.route('login', function (req) {
    var sid = req.sessionID;
    var username = req.data.name;
    var password = req.data.password;

    userCollection.findOne({name: username}, function (err, doc) {
        if (err) throw err;
        if (doc == null) {
            req.io.emit('loginError', {msg: "username does not exist!"});
        }
        else {
            bcrypt.compare(password, doc.pw, function (err, res) {
                if (res) {
                    if (doc.sid != sid) {
                        userCollection.findAndModify({_id: doc._id }, [], {$set: {sid: sid}}, {new: true}, function (err, doc1) {
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
})

app.io.route('register', function (req) {

    var sid = req.sessionID;
    var username = req.data.name;
    var password = req.data.password;
    var email = req.data.email;

    userCollection.findOne({$or: [
        {name: username},
        {email: email}
    ]}, function (err, doc) {
        if (err) throw err;
        if (doc == null) {
            // Hash the password with the salt
            var pwhash = bcrypt.hashSync(password, salt);
            var userObject = {name: username, email: email, pw: pwhash, sid: sid};
            userCollection.insert(userObject, {w: 1 }, function (err) {
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
    })

})

app.io.route('ready', function (req) {
    var sid = req.sessionID;
    console.log("sid=" + sid);
    // check if logged in:
    userCollection.findOne({sid: sid}, function (err, doc) {
        if (err) throw err;
        if (doc == null) {
            req.session.loggedIn = false;
            req.io.emit('loginPrompt');
        }
        else {
            req.session.username = doc.name;
            req.session.userId = doc._id;
            req.session.loggedIn = true;
            console.log("user " + doc.name + " is back! (userId=" + doc._id + ")")
        }
    })

    // send map data anyway:
    initGameData = {
        spritesheets: gameData.spritesheets,
        mapTypes: gameData.mapTypes,
        objectTypes: gameData.objectTypes,
        initMap: gameData.maps.hashList[gameVars.rootMapId]
    };
    req.io.emit('initGameData', initGameData);
})

app.io.route('getMap', function (req) {
    req.io.emit('map', gameData.maps.hashList[req.data.mapId]);
})

app.io.route('buildHouse', function (req) {
    // check if correct login:
    if (req.session.loggedIn) {
        console.log("user " + req.session.username + " has build a " + req.data.objTypeId + " at coordinates ("+ req.data.x+","+req.data.y+")");
    }
    else {
        req.io.emit('loginPrompt');
    }
})


app.listen(8080)