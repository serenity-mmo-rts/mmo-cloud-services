var AsyncSocket = require('./asyncReplySocket').AsyncRouter;

var serverName = "proxy"+process.argv[2];
console.log('started proxy server: ' + serverName);
var port = 'tcp://127.0.0.1:500'+process.argv[2];
var asyncSocket = new AsyncSocket('router');
asyncSocket.identity = serverName;

asyncSocket.bind(port, function(err) {
    if (err) throw err;
});

asyncSocket.on( "destNotFound", function(destStr, forward) {

    if(destStr.indexOf('layer_') === 0) {
        var mapId = destStr.substring(6);
        console.log("layer server "+mapId+" not started. notify master...");
        asyncSocket.sendReq(
            'master',
            'startLayerServer',
            {mapId: mapId},
            function(answer) {
                console.log(serverName + ": destination "+ destStr + " was started... forward request now...");
                forward();
            }
        );
    }
    else {
        console.log(serverName + ': destNotFound: '+ destStr);
    }


});

asyncSocket.on( "clientRegistered", function(clientIdentifier) {
    console.log(serverName + ': clientRegistered: '+ clientIdentifier);
    var numClients = 0;
    for (var key in asyncSocket.connectedClients) {
        numClients++;
    }
    console.log(serverName + ': numClients='+numClients);
});