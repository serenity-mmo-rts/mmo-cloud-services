// pubber.js
var zmq = require('zmq')
    , pubSock = zmq.socket('pub');

pubSock.connect('tcp://127.0.0.1:3001');

setInterval(function(){
    console.log('sending a multipart message envelope');
    pubSock.send(['kitty cats', 'meow!']);
}, 500);