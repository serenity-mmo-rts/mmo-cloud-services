var mongodb = require('mongodb');
var dbclient;
var collections = { };

var mongoServer = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db( 'serenity', mongoServer, {w: 1} );

var isConnecting = false;
var queuedCallbacks = [];

exports.connect = function(callback) {

    if (isConnecting){
        // queue callback...
        queuedCallbacks.push(callback);
    }
    else {
        isConnecting = true;
        db.open(function (err, c) {
            if (!err) {
                console.log("New Connection to mongodb established.");
                dbclient = c;
                dbclient.on('close', function () {
                    console.log("Connection to mongodb was closed.");
                    dbclient = null; // clear client
                    collections = {}; // clear old collections
                    // connection closed
                });
                isConnecting = false;
                if (callback) {
                    callback();
                }
                if (queuedCallbacks.length > 0) {
                    for (var i=0; i<queuedCallbacks.length; i++) {
                        queuedCallbacks[i]();
                    }
                    queuedCallbacks = [];
                }
            } else {
                // error connecting
                console.log("error connecting to mongodb server");
                isConnecting = false;
            }
        });
    }
}

exports.getDb = function() {
    return db;
}

exports.isConnected = function() {
    if (dbclient) {
        return true;
    }
    else {
        return false;
    }
}

// get collection
exports.get = function(name, callback) {
    if (dbclient) {
        if (!collections[name]) {
            collections[name] = dbclient.collection(name);
            //collections[name] = new mongodb.Collection(dbclient, name);
        }
        callback(null, collections[name]);
    } else {
        // perform connect and then retry in recursive call
        exports.connect(
            function(){
                exports.get(name,callback);
            }
        );
    }
}