// pubber.js
var zmq = require('zeromq');
var subSock = zmq.socket('sub');
var pubSock = zmq.socket('pub');

require('console-stamp')(console, {
    pattern: 'HH:MM:ss.l',
    metadata: '[pubSubForwarder]'
});

subSock.bindSync('tcp://127.0.0.1:3001');
pubSock.bindSync('tcp://127.0.0.1:3000');

// listen for all incoming messages:
subSock.subscribe('');

subSock.on('message', function(topic, message) {
    // forward all incoming messages to publisher socket:
    pubSock.send([topic, message]);
});
