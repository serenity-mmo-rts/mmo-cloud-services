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

    function initGameTypesLayers(gameData) {

        var cityMapType = new LayerType(gameData,{
            id: "cityMapType01",
            name: "City",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 000000,
            groundImage: "resources/ground.png",
            groundImageScaling: 1,
            buildCategories: [
                {name: 'Resources', objectTypeIds: ["Hub", "reactor", "mineralStorage", "liquidStorage", "plantation1", "plantation2"]},
                {name: 'Production', objectTypeIds: ["Factory1", "furnitureFactory", "robotFactory1"]},
                {name: 'Military', objectTypeIds: ["ScienceCenter", "researchFacility1", "defenseTower", "subObject"]}
            ],
            blocks: {
                HubSystem: {}
            }
        });
        gameData.layerTypes.add(cityMapType);

        var moonMapType = new LayerType(gameData,{
            id: "moonMapType01",
            name: "Moon",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 000000,
            groundImage: "resources/moonGround.png",
            groundImageScaling: 1,
            buildCategories: [
                {name: 'Habitat', objectTypeIds: ["dome", "spacecraftUnitObject01", "PlanetHub"]}
            ],
            blocks: {
                HubSystem: {}
            }
        });
        gameData.layerTypes.add(moonMapType);

        var solarMapType = new LayerType(gameData,{
            id: "solarMapType01",
            name: "Solar",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 000000,
            groundImage: "resources/background/starBackground.jpg",
            groundImageScaling: 0.1,
            groundDragScaling: 0.1
        });
        gameData.layerTypes.add(solarMapType);


        var galaxyMapType = new LayerType(gameData,{
            id: "galaxyMapType01",
            name: "Galaxy",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 000000,
            groundImage: "resources/background/starBackgroundBlack.jpg",
            groundImageScaling: 1,
            groundDragScaling: 0.1
        });
        gameData.layerTypes.add(galaxyMapType);

    }

    exports.initGameTypesLayers = initGameTypesLayers;

})(node ? exports : window);