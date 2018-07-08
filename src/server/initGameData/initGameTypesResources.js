var node = !(typeof exports === 'undefined');
if (node) {
    var RessourceType = require('../../game/types/ResourceType').RessourceType;
}

(function (exports) {

    function initGameTypesResources(gameData) {

        var granulateMaterial = new RessourceType(gameData,{
            _id: "granulateMaterial",
            name: "granulateMaterial",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 2,
            buildMenuTooltip:"granulateMaterial is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(granulateMaterial);

        var biomass = new RessourceType(gameData,{
            _id: "biomass",
            name: "biomass",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 0,
            buildMenuTooltip:"biomass is great",
            buildTime: 2000
        });

        var carbonFiber = new RessourceType(gameData,{
            _id: "carbonFiber",
            name: "carbonFiber",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 1,
            buildMenuTooltip:"carbonFiber is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(carbonFiber);

        var silicon = new RessourceType(gameData,{
            _id: "silicon",
            name: "silicon",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 4,
            buildMenuTooltip:"silicon is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(silicon);

        var copper = new RessourceType(gameData,{
            _id: "copper",
            name: "copper",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 4,
            buildMenuTooltip:"copper is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(copper);

        var titanium = new RessourceType(gameData,{
            _id: "titanium",
            name: "titanium",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 3,
            buildMenuTooltip:"titanium is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(titanium);


        var iridium = new RessourceType(gameData,{
            _id: "iridium",
            name: "iridium",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 1,
            buildMenuTooltip:"iridium is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(iridium);

        var palladium = new RessourceType(gameData,{
            _id: "palladium",
            name: "palladium",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 2,
            buildMenuTooltip:"palladium is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(palladium);

        var hydrogen = new RessourceType(gameData,{
            _id: "hydrogen",
            name: "hydrogen",
            iconSpritesheetId: "ressourceSprite01",
            iconSpriteFrame: 1,
            buildMenuTooltip:"hydrogen is great",
            buildTime: 2000
        });
        gameData.ressourceTypes.add(hydrogen);



        gameData.ressourceTypes.add(biomass);
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