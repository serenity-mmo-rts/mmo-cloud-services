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

    function initGameTypesTechnologies(gameData) {


        gameData.technologyTypes.add(new TechnologyType(gameData,{
            id: "wormholeTech",
            name: "Wormhole Technology",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 0,
            buildTime: 5000,
            initWidth: 96,
            initHeight: 96,

            allowOnMapTypeId: "moonMap01",
            allowOnObjTypeId: "ScienceCenter",
            requiredTechnologies: [],
            requiredItemIds: [],
            requiredItemLevels: [],
            requiredSkillIds: [],
            requiredSkillPoints: [],
            requiredResourceIds: [],
            requiredResourceAmounts: [],
            techPoints: 50
        }));


    }

    exports.initGameTypesTechnologies = initGameTypesTechnologies;

})(node ? exports : window);