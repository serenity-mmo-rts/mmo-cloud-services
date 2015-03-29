var mongodb = require('mongodb');
var dbclient;
var collections = { };

var mongoServer = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT, {auto_reconnect: true});
var db = new mongodb.Db( 'serenity', mongoServer, {w: 1} );

exports.connect = function(callback) {
    db.open(function (err, c) {
        if (!err) {
            console.log("New Connection to mongodb established.");
            dbclient = c;
            dbclient.on('close', function() {
                console.log("Connection to mongodb was closed.");
                dbclient = null; // clear client
                collections = { }; // clear old collections
                // connection closed
            });
            if (callback) {
                callback();
            }
        } else {
            // error connecting
            console.log("error connecting to mongodb server");
        }
    });
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

// get colleciton
exports.get = function(name, callback) {
    if (dbclient) {
        if (!collections[name]) {
            collections[name] = new mongodb.Collection(dbclient, name);
        }
        callback(null, collections[name]);
    } else {
        // can perform reconnecting and then get collection and call callback
        exports.connect(function(){exports.get(name,callback);});
        //callback(new Error('not connected'));
    }
}