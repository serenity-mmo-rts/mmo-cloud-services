var child_process = require('child_process');

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

function startLayerServerById(mapId) {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverLayer.js',
        [mapId],
        {
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}

function startSocketioProxy() {
    debugPortIterator++;
    var forker = child_process.fork(
        __dirname + '/serverSocketio.js',
        [],
        {
            execArgv: ['--debug-brk='+debugPortIterator]
        }
    )
}


setTimeout(startProxyRouter("1"),200);

//startLayerServerById("galaxyMap01");
//startLayerServerById("solarMap01");
//setTimeout(startLayerServerById("moonMap01"),200);
//startLayerServerById("moonMap02");
//setTimeout(startLayerServerById("cityMap01"),400);
setTimeout(startLayerServerById("cityMap02"),600);

//setTimeout(startSocketioProxy(),800);