var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../../game/GameData').GameData;
    var State = require('../../game/AbstractBlock').State;
    var MapObject = require('../../game/MapObject').MapObject;
    var LayerType = require('../../game/types/LayerType').LayerType;
    var ObjectType = require('../../game/types/objectType').ObjectType;
    var RessourceType = require('../../game/types/ResourceType').RessourceType;
    var TechnologyType = require('../../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../../game/types/ItemType').ItemType;
    var UserType = require('../../game/types/userType').UserType;
    var Spritesheet = require('../../game/Spritesheet').Spritesheet;
    var Layer = require('../../game/Layer').Layer;
    var User = require('../../game/User').User;

}

(function (exports) {

    function initGameTypesResources(gameData) {


        var carbon = new RessourceType(gameData,{
            _id: "carbon",
            name: "carbon",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 0,
            buildMenuTooltip:"carbon is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(carbon);
        var iron = new RessourceType(gameData,{
            _id: "iron",
            name: "iron",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 3,
            buildMenuTooltip:"iron is great",
            buildTime: 2000
        });

        gameData.ressourceTypes.add(iron);
        var oxygen = new RessourceType(gameData,{
            _id: "oxygen",
            name: "oxygen",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 1,
            buildMenuTooltip:"oxygen is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(oxygen);


    }

    exports.initGameTypesResources = initGameTypesResources;

})(node ? exports : window);