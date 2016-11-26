var child_process = require('child_process');

console.log(process.execArgv)
 var execArgv = process.execArgv;
execArgv=[];
execArgv.push('--debug');


function spawnChild(mapId) {

    var forker = child_process.fork(
        __dirname + '/testChildProcessChild.js',
        [mapId],
        {
            execArgv: execArgv
        }
    )

}

console.log('I am master');

for (var mapId= 1; mapId<3; mapId++) {
    spawnChild(mapId);
}



