var node = !(typeof exports === 'undefined');
if (node) {
    var TechnologyType = require('../../game/types/TechnologyType').TechnologyType;
}

(function (exports) {

    function initGameTypesTechnologies(gameData) {


        gameData.technologyTypes.add(new TechnologyType(gameData,{
            _id: "wormholeTech",
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