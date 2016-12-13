require('v8-profiler');
//var AsyncSocket = require('./asyncReplRouter').AsyncSocket;
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;

var id = "proxy"+process.argv[2];
console.log('started proxy server: ' + id);
var port = 'tcp://127.0.0.1:500'+process.argv[2];
var asyncSocket = new AsyncSocket('router');
asyncSocket.identity = id;

var connectedClients = {};

//asyncSocket.monitor();

asyncSocket.on( "registerClient", function(clientIdentifier, reply) {
    connectedClients[clientIdentifier] = true;
    console.log(id + ': Registered '+ clientIdentifier);
    reply(true);
});

asyncSocket.bind(port, function(err) {
    if (err) throw err;
});

setInterval(function(){
    var numClients = 0;
    for (var key in connectedClients) {
        numClients++;
    }
    console.log('numClients='+numClients);
},6000);