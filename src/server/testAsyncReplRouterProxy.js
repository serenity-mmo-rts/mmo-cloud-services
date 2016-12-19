require('v8-profiler');
//var AsyncSocket = require('./asyncReplRouter').AsyncSocket;
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;

var serverName = "proxy"+process.argv[2];
console.log('started proxy server: ' + serverName);
var port = 'tcp://127.0.0.1:500'+process.argv[2];
var asyncSocket = new AsyncSocket('router');
asyncSocket.identity = serverName;

//var connectedClients = {};

//asyncSocket.monitor();

//asyncSocket.on( "registerClient", function(clientIdentifier, reply) {
//    connectedClients[clientIdentifier] = true;
//    console.log(serverName + ': Registered '+ clientIdentifier);
//    reply(true);
//});

asyncSocket.bind(port, function(err) {
    if (err) throw err;
});

asyncSocket.on( "destNotFound", function(destStr) {
    console.log(serverName + ': destNotFound: '+ destStr);

    asyncSocket.sendReq(
        'master',
        'startLayerServer',
        destStr
    );

});

setInterval(function(){
    var numClients = 0;
    for (var key in asyncSocket.connectedClients) {
        numClients++;
    }
    console.log('numClients='+numClients);
},10000);