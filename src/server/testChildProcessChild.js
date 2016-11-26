

var serverMapId = process.argv[2];
console.log('I am worker with mapId=' + serverMapId);
setTimeout(function() {
    console.log('testing after 0.5 sec worker with mapId=' + serverMapId)
}, 500);
setTimeout(function() {
    console.log('testing after 15 sec worker with mapId=' + serverMapId)
}, 15000);