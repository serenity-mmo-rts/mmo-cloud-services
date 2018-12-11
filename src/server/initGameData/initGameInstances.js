var node = !(typeof exports === 'undefined');
if (node) {
    var State = require('../../game/AbstractBlock').State;
    var MapObject = require('../../game/MapObject').MapObject;
    var Layer = require('../../game/Layer').Layer;
    var User = require('../../game/User').User;
}

(function (exports) {

    function initGameInstances(gameData) {
        var galaxyMap = new Layer(gameData.layers,{
            _id: "galaxyMap01",
            parentObjId: null,
            width: 5000,              // pixelsize / 4
            height: 5000,             // pixelsize / 2
            mapTypeId: "galaxyMapType01",
            parentMapId: null,
            mapGeneratorParams: []
        });
        gameData.layers.add(galaxyMap);
        galaxyMap.initialize();
    }

    exports.initGameInstances = initGameInstances;

})(node ? exports : window);