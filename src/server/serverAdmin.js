
var express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
var app = express();
var server  = require("http").createServer(app);
var io = require("socket.io")(server);

var path = require('path');
var initDb = require('./initDb').initDb;

var child_process = require('child_process');
var dbConn = require('./dbConnection');

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


    app.get(
        '/admin/update',
        function(req, res, next) {
            console.log('updating server with git pull');
            var path_to_src = path.join(__dirname, '../..');
            var git_pull_process = child_process.spawn('git', ["pull"], {env: process.env, cwd: path_to_src});
            git_pull_process.stdout.on('data', function (data) {
                console.log('stdout: ' + data.toString());
            });
            git_pull_process.stderr.on('data', function (data) {
                console.log('stderr: ' + data.toString());
            });
            git_pull_process.on('exit', function (code) {
                console.log('child process exited with code ' + code.toString());
                if (code === 0) {
                    res.send({
                        success: true
                    });
                }
                else {
                    res.send({
                        success: false,
                        msg: "git pull failed",
                        error_code: code
                    });
                }
            });

        }
    );

    app.get(
        '/admin/restart',
        function(req, res, next) {
            console.log('restarting server');
            var path_to_src = path.join(__dirname, '../..');
            var compile_process = child_process.spawn('pm2', ["restart", "server"], {
                env: process.env,
                cwd: path_to_src
            });
            compile_process.stdout.on('data', function (data) {
                console.log('stdout: ' + data.toString());
            });
            compile_process.stderr.on('data', function (data) {
                console.log('stderr: ' + data.toString());
            });
            compile_process.on('exit', function (code) {
                if (code === 0) {
                    res.send({
                        success: true
                    });
                }
                else {
                    res.send({
                        success: false,
                        msg: "restart failed",
                        error_code: code
                    });
                }
            });
        }
    );

    app.get(
        '/admin/init',
        function(req, res, next) {
            console.log('init db');
            initDb(function() {
                res.send({
                    success: true
                });
            });
        }
    );


    app.get(
        '/admin/getLogTail',
        function(req, res, next) {
            var numBytes = 200000;
            var logFilePath = "/home/node/.pm2/logs/server-combined.outerr.log";
            fs.stat(logFilePath, function(err, stats) {
                if (err) {
                    res.send("Error no log file found!");
                    return;
                }
                var fileSize = stats.size;
                if (numBytes > fileSize) {
                    numBytes = fileSize;
                }
                fs.open(logFilePath, 'r', function(e, fd) {
                    if (e) {
                        return;
                    }
                    var endOfLogFile = new Buffer(numBytes);
                    fs.read(fd, endOfLogFile, 0, numBytes, fileSize-numBytes, function(e, bytesRead, data) {
                        if (e)
                            throw e;
                        res.send(data.toString('ascii'));
                    });
                });
            });
        }
    );

    server.listen(9080, "0.0.0.0");

});

