var node = !(typeof exports === 'undefined');
if (node) {
    var RessourceType = require('../../game/types/ResourceType').RessourceType;
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