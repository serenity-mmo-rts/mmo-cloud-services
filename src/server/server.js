var child_process = require('child_process');
var AsyncSocket = require('./asyncReplySocket').AsyncRouter;
var debugPortIterator = 5873;



var currentlyStartingMapIds = {};

function startProxyRouter(_id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverProxyRouter.js',
        [_id],
        {
            //execArgv: ['--debug']
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}

function startPubSubForwarder(_id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverPubsubForwarder.js',
        [_id],
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

function startSocketioProxy(_id) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverSocketio.js',
        [_id],
        {
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}



var _id = "master";
var targetProxy = 'proxy1';
console.log('started server: ' + _id);
var asyncSocket = new AsyncSocket('router');
asyncSocket.identity = _id;
var registeredAtProxy = false;
function registerToProxy() {
    asyncSocket.sendReq(
        targetProxy,
        'register',
        _id,
        function(success, err) {
            if (success) {
                registeredAtProxy = true;
                console.log(_id + ': registered at proxy!');
            }
            else {
                console.log(err);
                console.log(_id + ': registration at proxy failed!');

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


asyncSocket.on('startLayerServer',function(msgData, callback) {

    console.log("master: starting layer server "+msgData.mapId+"...");

    if (currentlyStartingMapIds[msgData.mapId]) {
        var startingDate = currentlyStartingMapIds[msgData.mapId].date;
        var timeDiff = Date.now()-startingDate;

        if (currentlyStartingMapIds[msgData.mapId].started) {
            console.log("master: server "+msgData.mapId+" is now started...")
            callback({
                success: true
            });
        }
        else {
            console.log("master: server "+msgData.mapId+" is already starting up...")
            currentlyStartingMapIds[msgData.mapId].callbacks.push(
                function() {
                    callback({
                        success: true
                    });
                }
            );
        }

    }
    else {
        console.log("master: start layer server "+msgData.mapId+"...");
        currentlyStartingMapIds[msgData.mapId] = {
            date: Date.now(),
            started: false,
            callbacks: [
                function() {
                    callback({
                        success: true
                    });
                }
            ]
        };
        startLayerServerById(msgData.mapId, function(m) {
            console.log("master: layer "+msgData.mapId+" started and registered at proxy...");
            var cbs = currentlyStartingMapIds[msgData.mapId].callbacks;
            for (var i= 0, len=cbs.length; i<len; i++) {
                cbs[i]();
            }
        });
    }


});




setTimeout(startProxyRouter("1"),200);
setTimeout(startPubSubForwarder("1"),400);
setTimeout(startSocketioProxy("1"),600);

//startLayerServerById("galaxyMap01");
//startLayerServerById("solarMap01");
//setTimeout(startLayerServerById("moonMap01"),1000);
//startLayerServerById("moonMap01");
//setTimeout(startLayerServerById("cityMap01"),1000);
setTimeout(startLayerServerById("cityMap02"),1000);




