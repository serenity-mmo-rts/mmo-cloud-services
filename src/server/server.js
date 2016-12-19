var child_process = require('child_process');
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;
var debugPortIterator = 5873;

function startProxyRouter(id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverProxyRouter.js',
        [id],
        {
            //execArgv: ['--debug']
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}

function startPubSubForwarder(id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverPubsubForwarder.js',
        [id],
        {
            //execArgv: ['--debug']
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}


function startLayerServerById(mapId, cb) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverLayer.js',
        [mapId],
        {
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )

    forker.on('message', function(m) {
        if (cb) cb(m);
    });
}

function startSocketioProxy(id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverSocketio.js',
        [id],
        {
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}



var id = "master";
var targetProxy = 'proxy1';
console.log('started server: ' + id);
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
    // register this client to proxy:
    registerToProxy();
});
asyncSocket.connect('tcp://127.0.0.1:5001');


asyncSocket.on('startLayerServer',function(mapId, callback) {

    startLayerServerById(mapId, function(m) {

        callback({
            success: true
        });
        console.log("layer started and registered at proxy...");

    });

});




setTimeout(startProxyRouter("1"),200);
setTimeout(startPubSubForwarder("1"),400);
setTimeout(startSocketioProxy("1"),600);

//startLayerServerById("galaxyMap01");
//startLayerServerById("solarMap01");
setTimeout(startLayerServerById("moonMap01"),1000);
//startLayerServerById("moonMap02");
setTimeout(startLayerServerById("cityMap01"),1000);
setTimeout(startLayerServerById("cityMap02"),1000);




