require('v8-profiler');
//var AsyncSocket = require('./asyncReplRouter').AsyncSocket;
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;

var id = "socketio"+process.argv[2];
console.log('started server: ' + id);
var interval = 5000;
var targetClient = "socketio1";
var targetProxy = "proxy1";
if (process.argv[2] == "1") {
    interval = 300000;
    targetClient = "socketio2";
}

var asyncSocket = new AsyncSocket('router');
asyncSocket.identity = id;


var registeredAtProxy = false;

function registerToProxy() {
    asyncSocket.sendReq(
        targetProxy,
        'register',
        id,
        function(success, err) {
            if (success) {
                registeredAtProxy = true;
                console.log(id + ': registered at proxy!');
            }
            else {
                console.log(err);
                console.log(id + ': registration at proxy failed!');

                //retry:
                registerToProxy();
            }
        },
        300 //timeout 300 ms
    );
}


asyncSocket.monitor();
asyncSocket.on("connect",function(event_value, event_endpoint_addr){
    console.log(id + ': Connect event: '+ event_value + '  addr: ' + event_endpoint_addr);
    // register this client to proxy:
    registerToProxy();
});

asyncSocket.connect('tcp://127.0.0.1:5001');


asyncSocket.on('testRequest',function(msgData, reply) {
    var answer = msgData * 2;
    //console.log(id + ': Received msgData '+ msgData +'. answer with '+ answer);
    reply(answer);
});

var accumResult = 0;
var logIterator = 0;
function startNextRequest(valIterator) {

    logIterator = valIterator;
        var value = valIterator; //Math.floor(Math.random()*100);
        asyncSocket.sendReq(
            [targetProxy, targetClient],
            'testRequest',
            value,
            function (answer) {
                accumResult += answer;

                //console.log(id + ': data value sent: '+value+'. Received answer: ' + answer);
                startNextRequest(valIterator+1);
            }
        );
        //console.log(id + ': send request to '+targetClient+' value ' + value);

}

setTimeout(function() {startNextRequest(1);}, interval);

setInterval(function() {
    console.log(id + ": iterator=" + logIterator);
},500)