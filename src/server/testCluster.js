var cluster = require('cluster');
var freeport = require('freeport');


function spawnChild() {
    cluster.setupMaster({
        execArgv: ['--debug']
    });
    cluster.fork();
}

if (cluster.isMaster) {
    console.log('I am master');

    setTimeout(spawnChild, 1000);
    setTimeout(spawnChild, 2000);
    setTimeout(spawnChild, 3000);


} else if (cluster.isWorker) {
    console.log('I am worker #' + cluster.worker.id);
    setTimeout(function() {
        console.log('testing after 1.5 sec worker #' + cluster.worker.id)
    }, 1500);
}

