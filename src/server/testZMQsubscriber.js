// subber.js
var zmq = require('zmq');
var subSock = zmq.socket('sub');

subSock.connect('tcp://127.0.0.1:3000');
subSock.subscribe('kitty cats');
console.log('Subscriber connected to port 3000');

subSock.on('message', function(topic, message) {
    console.log('received a message related to:', topic, 'containing message:', message);
});