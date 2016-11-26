var child_process = require('child_process');

function startLayerServerById(mapId) {
    var forker = child_process.fork(
        __dirname + '/server.js',
        [mapId],
        {
            execArgv: ['--debug']
        }
    )
}

function startSocketioProxy() {
    var forker = child_process.fork(
        __dirname + '/serverSocketio.js',
        [],
        {
            execArgv: ['--debug']
        }
    )
}

//startLayerServerById("galaxyMap01");
//startLayerServerById("solarMap01");
//setTimeout(startLayerServerById("moonMap01"),200);
//startLayerServerById("moonMap02");
//setTimeout(startLayerServerById("cityMap01"),400);
setTimeout(startLayerServerById("cityMap02"),600);

//setTimeout(startSocketioProxy(),800);