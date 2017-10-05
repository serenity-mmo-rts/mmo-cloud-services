var node = !(typeof exports === 'undefined');
if (node) {

    var initGameSprites = require('./initGameData/initGameSprites').initGameSprites;
    var initGameTypes = require('./initGameData/initGameTypes').initGameTypes;
    var initGameInstances = require('./initGameData/initGameInstances').initGameInstances;

    var GameData = require('../game/GameData').GameData;
    var State = require('../game/AbstractBlock').State;
    var MapObject = require('../game/MapObject').MapObject;
    var LayerType = require('../game/types/LayerType').LayerType;
    var ObjectType = require('../game/types/ObjectType').ObjectType;
    var Spritesheet = require('../game/Spritesheet').Spritesheet;
    var Layer = require('../game/Layer').Layer;
    var User = require('../game/User').User;

}

(function (exports) {

    function initGameData() {
        var gameData = new GameData();

        initGameSprites(gameData);

        initGameTypes(gameData);

        initGameInstances(gameData);

        gameData.initialize();

        return gameData;
    }


    var gameVars = {
        rootMapId: "cityMap02"
        //rootMapId: "galaxyMap01"
    };

    exports.initGameData = initGameData;
    exports.gameVars = gameVars;

})(node ? exports : window);
