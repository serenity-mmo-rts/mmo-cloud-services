var node = !(typeof exports === 'undefined');
if (node) {
    var Spritesheet = require('../../game/Spritesheet').Spritesheet;
}

(function (exports) {

    function initGameSprites(gameData) {

        var forestSprite = new Spritesheet(gameData, {
            _id: 'forestSprite01',
            images: ["resources/forest.png"],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 448, 64, 64, 0, 32, 48],
                [64, 448, 64, 64, 0, 32, 48]
            ]
        });
        gameData.spritesheets.add(forestSprite);

        var moonSprite = new Spritesheet(gameData, {
            _id: 'moonSprite01',
            images: ["resources/objects/crater.png", "resources/objects/dome.png", "resources/objects/domeIcon.png"],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 242, 122, 0, 121, 61],
                [0, 0, 164, 79, 1, 82, 45],
                [0, 0, 32, 15, 2, 0, 0]
            ]
        });
        gameData.spritesheets.add(moonSprite);

        var citySprite = new Spritesheet(gameData, {
            _id: 'cityBuildingsSprite01',
            images: ["resources/CityBuildings.png", "resources/CityBuildingsIcons.png"],
            frames: [
                // x, y, width, height, imageIndex, regX, regY

                //mapObjects
                [0, 0, 128, 128, 0, 64, 90],
                [128, 0, 128, 128, 0, 60, 90],
                [256, 0, 128, 128, 0, 64, 83],
                [386, 0, 254, 147, 0, 128, 74],
                [0, 128, 192, 192, 0, 96, 146],
                [192, 128, 192, 192, 0, 96, 122],

                //icons:
                [0, 0, 32, 32, 1, 0, 0],
                [32, 0, 32, 32, 1, 0, 0],
                [64, 0, 32, 32, 1, 0, 0],
                [96, 0, 32, 32, 1, 0, 0],
                [128, 0, 32, 32, 1, 0, 0]
            ]
        });
        gameData.spritesheets.add(citySprite);

        var objectsSprite = new Spritesheet(gameData, {
            _id: 'objectsSprite',
            images: ["resources/objects/defenseTower.png", "resources/objects/defenseTowerIcon.png",
                "resources/objects/furnitureFactory.png", "resources/objects/furnitureFactoryIcon.png",
                "resources/objects/spacecraft.png", "resources/objects/spacecraftIcon.png",
                "resources/objects/hub3.png", "resources/objects/hub3Icon.png",
                "resources/objects/storageYardLiquid.png", "resources/objects/storageYardLiquidIcon.png",
                "resources/objects/mineralStorage2.png", "resources/objects/mineralStorage2Icon.png",
                "resources/objects/plantation1.png", "resources/objects/plantation1Icon.png",
                "resources/objects/plantation2.png", "resources/objects/plantation2Icon.png",
                "resources/objects/planetHub/Image0001.png",
                "resources/objects/Reactor/Image0001.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 250, 215, 0, 125, 80],
                [0, 0, 48, 41, 1, 0, 0],

                [0, 0, 192, 160, 2, 125, 80],
                [0, 0, 48, 48, 3, 0, 0],

                [0, 0, 200, 146, 4, 100, 70],
                [0, 0, 48, 48, 5, 0, 0],

                [0, 0, 95, 60, 6, 47, 29],
                [0, 0, 48, 30, 7, 0, 0],

                [0, 0, 516, 387, 8, 258, 193],
                [0, 0, 48, 36, 9, 0, 0],

                [0, 0, 300, 271, 10, 150, 120],
                [0, 0, 48, 43, 11, 0, 0],

                [0, 0, 150, 124, 12, 75, 50],
                [0, 0, 48, 40, 13, 0, 0],

                [0, 0, 150, 124, 14, 75, 50],
                [0, 0, 48, 40, 15, 0, 0],

                [0, 0, 100, 100, 16, 50, 40],

                [0, 0, 129, 142, 17, 65, 70]
            ]
        });
        gameData.spritesheets.add(objectsSprite);

        var planetConnectionSprite = new Spritesheet(gameData, {
            _id: 'planetConnectionSprite',
            images: [
                "resources/objects/planetPipe.ori/Image0000.png",
                "resources/objects/planetPipe.ori/Image0001.png",
                "resources/objects/planetPipe.ori/Image0002.png",
                "resources/objects/planetPipe.ori/Image0003.png",
                "resources/objects/planetPipe.ori/Image0004.png",
                "resources/objects/planetPipe.ori/Image0005.png",
                "resources/objects/planetPipe.ori/Image0006.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 100, 50, 0, 50, 25],
                [0, 0, 100, 50, 1, 50, 25],
                [0, 0, 100, 50, 2, 50, 25],
                [0, 0, 100, 50, 3, 50, 25],
                [0, 0, 100, 50, 4, 50, 25],
                [0, 0, 100, 50, 5, 50, 25],
                [0, 0, 100, 50, 6, 50, 25]
            ]
        });
        gameData.spritesheets.add(planetConnectionSprite);

        var robotFactorySprite = new Spritesheet(gameData, {
            _id: 'robotFactorySprite',
            images: [
                "resources/objects/RobotFactory/Image0000.png",
                "resources/objects/RobotFactory/Image0020.png",
                "resources/objects/RobotFactory/Image0040.png",
                "resources/objects/RobotFactory/Image0060.png",
                "resources/objects/RobotFactory/Image0080.png",
                "resources/objects/RobotFactory/Image0100.png",
                "resources/objects/RobotFactory/Image0120.png",
                "resources/objects/RobotFactory/Image0140.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 300, 200, 0, 150, 100],
                [0, 0, 300, 200, 1, 150, 100],
                [0, 0, 300, 200, 2, 150, 100],
                [0, 0, 300, 200, 3, 150, 100],
                [0, 0, 300, 200, 4, 150, 100],
                [0, 0, 300, 200, 5, 150, 100],
                [0, 0, 300, 200, 6, 150, 100],
                [0, 0, 300, 200, 7, 150, 100]
            ],
            animations: {
                working: [0, 7, "working", 0.05]
            }
        });
        gameData.spritesheets.add(robotFactorySprite);

        var researchFacilitySprite = new Spritesheet(gameData, {
            _id: 'researchFacilitySprite',
            images: [
                "resources/objects/ResearchFacility/Image0001.png",
                "resources/objects/ResearchFacility/Image0002.png",
                "resources/objects/ResearchFacility/Image0003.png",
                "resources/objects/ResearchFacility/Image0004.png",
                "resources/objects/ResearchFacility/Image0005.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 191, 128, 0, 95, 65],
                [0, 0, 191, 128, 1, 95, 65],
                [0, 0, 191, 128, 2, 95, 65],
                [0, 0, 191, 128, 3, 95, 65],
                [0, 0, 191, 128, 4, 95, 65]
            ],
            animations: {
                working: {
                    frames: [0, 1, 2, 3, 4, 4, 4, 3, 2, 1, 0, 0],
                    next: "working",
                    speed: 0.05
                }
            }
        });
        gameData.spritesheets.add(researchFacilitySprite);

        var mineralStorageSprite = new Spritesheet(gameData, {
            _id: 'mineralStorageSprite',
            images: [
                "resources/objects/mineralStorage/Image0001.png",
                "resources/objects/mineralStorage/Image0002.png",
                "resources/objects/mineralStorage/Image0003.png",
                "resources/objects/mineralStorage/Image0004.png",
                "resources/objects/mineralStorage/Image0005.png",
                "resources/objects/mineralStorage/Image0006.png",
                "resources/objects/mineralStorage/Image0007.png",
                "resources/objects/mineralStorage/Image0008.png",
                "resources/objects/mineralStorage/Image0009.png",
                "resources/objects/mineralStorage/Image0010.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 500, 500, 0, 250, 250],
                [0, 0, 500, 500, 1, 250, 250],
                [0, 0, 500, 500, 2, 250, 250],
                [0, 0, 500, 500, 3, 250, 250],
                [0, 0, 500, 500, 4, 250, 250],
                [0, 0, 500, 500, 5, 250, 250],
                [0, 0, 500, 500, 6, 250, 250],
                [0, 0, 500, 500, 7, 250, 250],
                [0, 0, 500, 500, 8, 250, 250],
                [0, 0, 500, 500, 9, 250, 250]
            ],
            animations: {
                working: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                    next: "working",
                    speed: 0.05
                }
            }
        });
        gameData.spritesheets.add(mineralStorageSprite);


        var miningSprite = new Spritesheet(gameData, {
            _id: 'miningSprite',
            images: [
                "resources/objects/miningPlant/Image0001.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0, 0, 800, 465, 0, 400, 232]
            ]
        });
        gameData.spritesheets.add(miningSprite);




        var ressourceSprite = new Spritesheet(gameData, {
            _id: 'ressourceSprite01',
            images: ["resources/RessourceIcons.png"],
            frames: [
                // x, y, width, height, imageIndex, regX, regY

                //icons:
                [0, 0, 32, 32, 0, 0, 0],
                [32, 0, 32, 32, 0, 0, 0],
                [64, 0, 32, 32, 0, 0, 0],
                [96, 0, 32, 32, 0, 0, 0],
                [128, 0, 32, 32, 0, 0, 0]
            ]
        });
        gameData.spritesheets.add(ressourceSprite);

        var itemSprite = new Spritesheet(gameData, {
            _id: 'itemSprite',
            images: ["resources/own_icons/connectionSlot.png", "resources/own_icons/engineerDepartment.png", "resources/own_icons/excavator.png",
                "resources/own_icons/itDepartment.png", "resources/own_icons/officePlace.png", "resources/own_icons/robotArm.png",
                "resources/own_icons/slotMachine.png", "resources/own_icons/telescope.png", "resources/own_icons/warehouseStorage.png"],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                //icons:
                [0, 0, 48, 48, 0, 24, 24],
                [0, 0, 48, 48, 1, 24, 24],
                [0, 0, 48, 48, 2, 24, 24],
                [0, 0, 48, 48, 3, 24, 24],
                [0, 0, 48, 48, 4, 24, 24],
                [0, 0, 48, 48, 5, 24, 24],
                [0, 0, 48, 48, 6, 24, 24],
                [0, 0, 48, 48, 7, 24, 24],
                [0, 0, 48, 48, 8, 24, 24]

            ]
        });
        gameData.spritesheets.add(itemSprite);


        var planetSprite = new Spritesheet(gameData, {
            _id: 'planetSprite',
            images: [
                "resources/objects/planets/Earth.png",
                "resources/objects/planets/Mars.png",
                "resources/objects/planets/Moon.png",
                "resources/objects/planets/Saturn.png",
                "resources/objects/planets/sunMOrange.png",
                "resources/objects/planets/starM_lightGreen.png",
                "resources/objects/planets/starM_Yellow.png",
                "resources/objects/planets/starM_White.png",
                "resources/objects/planets/starS_lightBlue.png",
                "resources/objects/planets/starS_White.png",
                "resources/objects/planets/starM_Orange.png"
            ],
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                //icons:
                [0, 0, 512, 509, 0, 256, 254],
                [0, 0, 640, 640, 1, 320, 320],
                [0, 0, 150, 148, 2, 75, 74],
                [0, 0, 640, 320, 3, 320, 160],
                [0, 0, 1200, 1145, 4, 600, 572],
                [0, 0, 6, 6, 5, 3, 3],
                [0, 0, 72, 66, 6, 36, 32],
                [0, 0, 6, 6, 7, 3, 3],
                [0, 0, 27, 29, 8, 13, 14],
                [0, 0, 16, 15, 9, 8, 8],
                [0, 0, 18, 17, 10, 9, 8]
            ]
        });
        gameData.spritesheets.add(planetSprite);

    }

    exports.initGameSprites = initGameSprites;

})(node ? exports : window);