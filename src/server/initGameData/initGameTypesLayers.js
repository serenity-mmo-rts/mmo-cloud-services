var node = !(typeof exports === 'undefined');
if (node) {
    var LayerType = require('../../game/types/LayerType').LayerType;
}

(function (exports) {

    function initGameTypesLayers(gameData) {

        var cityMapType = new LayerType(gameData,{
            _id: "cityMapType01",
            name: "City",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 0,
            groundImage: "resources/ground.png",
            groundImageScaling: 1,
            isPeriodic: true,
            buildCategories: [
                {name: 'Resources', objectTypeIds: ["Hub", "reactor", "mineralStorage", "liquidStorage", "plantation1", "plantation2", "miningPlant"]},
                {name: 'Production', objectTypeIds: ["Factory1", "furnitureFactory", "robotFactory1"]},
                {name: 'Military', objectTypeIds: ["ScienceCenter", "researchFacility1", "defenseTower", "subObject"]}
            ],
            blocks: {
                HubSystemManager: {}
            }
        });
        gameData.layerTypes.add(cityMapType);

        var moonMapType = new LayerType(gameData,{
            _id: "moonMapType01",
            name: "Moon",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 0,
            groundImage: "resources/moonGround.png",
            groundImageScaling: 1,
            isPeriodic: true,
            buildCategories: [
                {name: 'Habitat', objectTypeIds: ["dome", "spacecraftUnitObject01", "PlanetHub"]}
            ],
            blocks: {
                HubSystemManager: {}
            }
        });
        gameData.layerTypes.add(moonMapType);

        var solarMapType = new LayerType(gameData,{
            _id: "solarMapType01",
            name: "Solar",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 0,
            groundImage: "resources/background/starBackground.jpg",
            groundImageScaling: 0.1,
            isPeriodic: false,
            groundDragScaling: 0.1,
            blocks: {
                HubSystemManager: {}
            }
        });
        gameData.layerTypes.add(solarMapType);


        var galaxyMapType = new LayerType(gameData,{
            _id: "galaxyMapType01",
            name: "Galaxy",
            scale: 1,
            ratioWidthHeight: 2,
            bgColor: 0,
            groundImage: "resources/background/starBackgroundBlack.jpg",
            groundImageScaling: 1,
            isPeriodic: false,
            groundDragScaling: 0.1
        });
        gameData.layerTypes.add(galaxyMapType);

    }

    exports.initGameTypesLayers = initGameTypesLayers;

})(node ? exports : window);