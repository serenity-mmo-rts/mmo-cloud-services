var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../game/GameData').GameData;
    var State = require('../game/AbstractBlock').State;
    var MapObject = require('../game/MapObject').MapObject;
    var LayerType = require('../game/types/LayerType').LayerType;
    var ObjectType = require('../game/types/ObjectType').ObjectType;
    var RessourceType = require('../game/types/ResourceType').RessourceType;
    var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../game/types/ItemType').ItemType;
    var UserType = require('../game/types/UserType').UserType;
    var Spritesheet = require('../game/Spritesheet').Spritesheet;
    var Layer = require('../game/Layer').Layer;
    var User = require('../game/User').User;

}

(function (exports) {
    var gameData = new GameData();

    var forestSprite = new Spritesheet(gameData,{
        id: 'forestSprite01',
        images: ["resources/forest.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 448, 64, 64, 0, 32, 48],
            [64, 448, 64, 64, 0, 32, 48]
        ]
    });
    gameData.spritesheets.add(forestSprite);

    var moonSprite = new Spritesheet(gameData,{
        id: 'moonSprite01',
        images: ["resources/objects/crater.png","resources/objects/dome.png","resources/objects/domeIcon.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 0, 242, 122, 0, 121, 61],
            [0, 0, 164, 79, 1, 82, 45],
            [0, 0, 32, 15, 2, 0, 0]
        ]
    });
    gameData.spritesheets.add(moonSprite);

    var citySprite = new Spritesheet(gameData,{
        id: 'cityBuildingsSprite01',
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
            [0, 0, 32, 32, 1, 0,0],
            [32, 0, 32, 32, 1, 0,0],
            [64, 0, 32, 32, 1, 0,0],
            [96, 0, 32, 32, 1,  0,0],
            [128, 0, 32, 32, 1, 0,0]
        ]
    });
    gameData.spritesheets.add(citySprite);

    var objectsSprite = new Spritesheet(gameData,{
        id: 'objectsSprite',
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

    var planetConnectionSprite = new Spritesheet(gameData,{
        id: 'planetConnectionSprite',
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

    var robotFactorySprite = new Spritesheet(gameData,{
        id: 'robotFactorySprite',
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

    var researchFacilitySprite = new Spritesheet(gameData,{
        id: 'researchFacilitySprite',
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
                frames: [0,1,2,3,4,4,4,3,2,1,0,0],
                next: "working",
                speed: 0.05
            }
        }
    });
    gameData.spritesheets.add(researchFacilitySprite);

    var mineralStorageSprite = new Spritesheet(gameData,{
        id: 'mineralStorageSprite',
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
                frames: [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0],
                next: "working",
                speed: 0.05
            }
        }
    });
    gameData.spritesheets.add(mineralStorageSprite);


    var ressourceSprite = new Spritesheet(gameData,{
        id: 'ressourceSprite01',
        images: ["resources/RessourceIcons.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY

            //icons:
            [0, 0, 32, 32, 0, 0,0],
            [32, 0, 32, 32, 0, 0,0],
            [64, 0, 32, 32, 0, 0,0],
            [96, 0, 32, 32, 0,  0,0],
            [128, 0, 32, 32, 0, 0,0]
        ]
    });
    gameData.spritesheets.add(ressourceSprite);

    var itemSprite = new Spritesheet(gameData,{
        id: 'itemSprite',
        images: ["resources/own_icons/connectionSlot.png","resources/own_icons/engineerDepartment.png","resources/own_icons/excavator.png",
            "resources/own_icons/itDepartment.png","resources/own_icons/officePlace.png","resources/own_icons/robotArm.png",
            "resources/own_icons/slotMachine.png","resources/own_icons/telescope.png","resources/own_icons/warehouseStorage.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            //icons:
            [0, 0, 48, 48, 0, 24,24],
            [0, 0, 48, 48, 1, 24,24],
            [0, 0, 48, 48, 2, 24,24],
            [0, 0, 48, 48, 3, 24,24],
            [0, 0, 48, 48, 4, 24,24],
            [0, 0, 48, 48, 5, 24,24],
            [0, 0, 48, 48, 6, 24,24],
            [0, 0, 48, 48, 7, 24,24],
            [0, 0, 48, 48, 8, 24,24]

        ]
    });
    gameData.spritesheets.add(itemSprite);


    var planetSprite = new Spritesheet(gameData,{
        id: 'planetSprite',
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
            [0, 0, 512, 509, 0, 256,254],
            [0, 0, 640, 640, 1, 320,320],
            [0, 0, 1280, 1264, 2, 640,632],
            [0, 0, 640, 320, 3, 320,160],
            [0, 0, 1200,1145, 4,600,572],
            [0, 0, 6,6, 5,3,3],
            [0, 0, 72,66, 6,36,32],
            [0, 0, 6,6, 7,3,3],
            [0, 0, 27,29, 8,13,14],
            [0, 0, 16,15, 9,8,8],
            [0, 0, 18,17, 10,9,8]
        ]
    });
    gameData.spritesheets.add(planetSprite);

    var user = gameData.userTypes.add(new UserType(gameData,{
        id: "normalUser",
        blocks: {
            Skills: {},
            Technologies: {}
        }
    }));

    var cityMapType = new LayerType(gameData,{
        id: "cityMapType01",
        name: "City",
        scale: 1,
        ratioWidthHeight: 2,
        bgColor: 000000,
        groundImage: "resources/ground.png",
        groundImageScaling: 1,
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


    var redDwarf = new ObjectType(gameData, {
        id: "redDwarf",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 32,
        initHeight: 32,
        allowOnMapTypeId: "galaxyMapType01",
        name: "redDwarf",
        spritesheetId: planetSprite.id,
        spriteFrame: 5,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 5,
        buildTime: 0,
        StarSizesMean : 2,
        StarSizesStd :0.5,
        StarHeatMean : 2,
        StarHeatStd : 0.5,
        PlanetAmountMean : 8,
        PlanetAmountStd : 4,
        PlanetSizesMean : 14, // in 2 pow n
        PlanetSizesStd : 3
    });
    gameData.objectTypes.add(redDwarf);


    var normalStar = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "normalStar",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 32,
        initHeight: 32,
        allowOnMapTypeId: "galaxyMapType01",
        name: "normalStar",
        spritesheetId: planetSprite.id,
        spriteFrame: 6,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 6,
        buildTime: 0,
        StarSizesMean : 5,
        StarSizesStd :1,
        StarHeatMean : 5,
        StarHeatStd : 1,
        PlanetAmountMean : 7,
        PlanetAmountStd : 5,
        PlanetSizesMean : 15, // in 2 pow n
        PlanetSizesStd : 4
    }));

    var doubleSystem = new ObjectType(gameData, {
        id: "doubleSystem",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 32,
        initHeight: 32,
        allowOnMapTypeId: "galaxyMapType01",
        name: "doubleSystem",
        spritesheetId: planetSprite.id,
        spriteFrame: 7,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 7,
        buildTime: 0,
        StarSizesMean : 4,
        StarSizesStd :1,
        StarHeatMean : 4,
        StarHeatStd : 1,
        PlanetAmountMean : 6,
        PlanetAmountStd : 5,
        PlanetSizesMean : 14, // in 2 pow n
        PlanetSizesStd : 2
    });
    gameData.objectTypes.add(doubleSystem);


    var neutronStar = new ObjectType(gameData, {
        id: "neutronStar",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 16,
        initHeight: 16,
        allowOnMapTypeId: "galaxyMapType01",
        name: "neutronStar",
        spritesheetId: planetSprite.id,
        spriteFrame: 8,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 8,
        buildTime: 0,
        StarSizesMean : 0.5,
        StarSizesStd :0.1,
        StarHeatMean : 0.5,
        StarHeatStd : 0.1,
        PlanetAmountMean : 3,
        PlanetAmountStd : 2,
        PlanetSizesMean : 13, // in 2 pow n
        PlanetSizesStd : 5
    });
    gameData.objectTypes.add(neutronStar);

    var blackHole = new ObjectType(gameData, {
        id: "blackHole",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 16,
        initHeight: 16,
        allowOnMapTypeId: "galaxyMapType01",
        name: "blackHole",
        spritesheetId: planetSprite.id,
        spriteFrame: 9,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 9,
        buildTime: 0,
        StarSizesMean : 0.25,
        StarSizesStd : 10,
        StarHeatMean : 0.25,
        StarHeatStd : 10,
        PlanetAmountMean : 1,
        PlanetAmountStd : 1,
        PlanetSizesMean : 13, // in 2 pow n
        PlanetSizesStd : 5
    });
    gameData.objectTypes.add(blackHole);

    var crater01 = new ObjectType(gameData, {
        id: "crater01",
        blocks: {
            Environment: {}
        },
        className: "environment",
        initWidth: 10,
        initHeight: 10,
        allowOnMapTypeId: "moonMapType01",
        name: "crater01",
        spritesheetId: moonSprite.id,
        spriteFrame: 0,
        iconSpritesheetId: moonSprite.id,
        iconSpriteFrame: 0,
        buildTime: 0
    });
    gameData.objectTypes.add(crater01);

    var rock01 = new ObjectType(gameData,{
        id: "rock01",
        blocks: {
            Environment: {}
        },
        className: "environment",
        initWidth: 12,
        initHeight: 12,
        allowOnMapTypeId: "cityMapType01",
        name: "rock01",
        spritesheetId: "forestSprite01",
        spriteFrame: 0,
        iconSpritesheetId: "forestSprite01",
        iconSpriteFrame: 0,
        buildTime: 0
    });
    gameData.objectTypes.add(rock01);

    var rock02 = new ObjectType(gameData,{
        id: "rock02",
        blocks: {
            Environment: {}
        },
        className: "environment",
        initWidth: 12,
        initHeight: 12,
        allowOnMapTypeId: "cityMapType01",
        name: "rock2",
        spritesheetId: "forestSprite01",
        spriteFrame: 1,
        iconSpritesheetId: "forestSprite01",
        iconSpriteFrame: 0,
        buildTime: 0
    });
    gameData.objectTypes.add(rock02);

    var factory = new ObjectType(gameData,{
        id: "Factory1",
        blocks: {
            HubConnectivity: {},
            ResourceProduction: {},
            EnergyManager: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept", "solarPanel"]
            },
            FeatureManager: {},
            WorkingPlace: {},
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints: 10,
                points: 5
            }
        },


        className: "factory",
        initWidth: 36,
        initHeight: 36,
        allowOnMapTypeId: "cityMapType01",
        name: "Mining Factory",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 0,
        iconSpritesheetId: "cityBuildingsSprite01",
        iconSpriteFrame: 6,
        buildTime: 20000
    });
    gameData.objectTypes.add(factory);

    var robotFactory = new ObjectType(gameData,{
        id: "robotFactory1",
        blocks: {
            HubConnectivity: {},
            ResourceProduction: {},
            EnergyManager: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept", "solarPanel"]
            },
            FeatureManager: {},
            WorkingPlace: {},
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints: 10,
                points: 5
            }
        },


        className: "factory",
        initWidth: 85,
        initHeight: 85,
        allowOnMapTypeId: "cityMapType01",
        name: "Robot Factory",
        spritesheetId: "robotFactorySprite",
        spriteFrame: 0,
        spriteAnimation: "working",
        iconSpritesheetId: "robotFactorySprite",
        iconSpriteFrame: 0,
        buildTime: 2000
    });
    gameData.objectTypes.add(robotFactory);

    var researchFacility = new ObjectType(gameData,{
        id: "researchFacility1",
        blocks: {
            HubConnectivity: {},
            ResourceProduction: {},
            EnergyManager: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept", "solarPanel"]
            },
            FeatureManager: {},
            WorkingPlace: {},
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints: 10,
                points: 5
            }
        },


        className: "factory",
        initWidth: 40,
        initHeight: 60,
        allowOnMapTypeId: "cityMapType01",
        name: "Research Facility",
        spritesheetId: "researchFacilitySprite",
        spriteFrame: 0,
        spriteAnimation: "working",
        iconSpritesheetId: "researchFacilitySprite",
        iconSpriteFrame: 0,
        buildTime: 2000
    });
    gameData.objectTypes.add(researchFacility);

    var hub = new ObjectType(gameData,{
        id: "Hub",
        blocks: {
            HubNode: {
                canBuildConnectionTypeId: "connection",
                maxRange: 1000,
                connBuildTimePerDist: 1
            },
            HubConnectivity: {
                numPorts:  5
            },
            EnergyManager: {
                requiredPerSec:  0
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: []
            },
            FeatureManager: {},
            WorkingPlace: {
                requiredSkills: 0
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }
        },
        className: "hub",
        initWidth: 35,
        initHeight: 35,
        allowOnMapTypeId: "cityMapType01",
        name: "Small Hub",
        spritesheetId: "objectsSprite",
        spriteFrame: 6,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 7,
        buildTime: 12000
    });
    gameData.objectTypes.add(hub);

    var planethub = new ObjectType(gameData,{
        id: "PlanetHub",
        blocks: {
            HubNode: {
                canBuildConnectionTypeId: "planetConnection",
                maxRange: 1000,
                connBuildTimePerDist: 1
            },
            HubConnectivity: {
                numPorts:  20
            },
            EnergyManager: {
                requiredPerSec:  0
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: []
            },
            FeatureManager: {},
            WorkingPlace: {
                requiredSkills: 0
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }
        },
        className: "hub",
        initWidth: 35,
        initHeight: 35,
        allowOnMapTypeId: "moonMapType01",
        name: "Small Planet Hub",
        spritesheetId: "objectsSprite",
        spriteFrame: 16,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 16,
        buildTime: 12000
    });
    gameData.objectTypes.add(planethub);

    var sciencecenter = new ObjectType(gameData,{
        id: "ScienceCenter",
        blocks: {
            TechProduction: {
                producableTechnologies:["wormholeTech"]
            },
            HubConnectivity: {},
            EnergyManager: {
                requiredPerSec: 0,
                availablePerSec: 0
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: []
            },
            FeatureManager: {},
            WorkingPlace: {
                requiredSkills: null
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }

        },
        className: "scienceCenter",
        initWidth: 36,
        initHeight: 36,
        allowOnMapTypeId: "cityMapType01",
        name: "Military Research Facility",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 2,
        iconSpritesheetId: "cityBuildingsSprite01",
        iconSpriteFrame: 8,
        buildTime: 10000
    });
    gameData.objectTypes.add(sciencecenter);

    var reactor = new ObjectType(gameData,{
        id: "reactor",
        blocks: {
            TechProduction: {
                producableTechnologies:["wormholeTech"]
            },
            HubConnectivity: {},
            EnergyManager: {
                requiredPerSec: 0,
                availablePerSec: 0
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: []
            },
            FeatureManager: {},
            WorkingPlace: {
                requiredSkills: null
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }

        },
        className: "reactor",
        initWidth: 45,
        initHeight: 45,
        allowOnMapTypeId: "cityMapType01",
        name: "Reactor",
        spritesheetId: "objectsSprite",
        spriteFrame: 17,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 17,
        buildTime: 3000
    });
    gameData.objectTypes.add(reactor);

    var furnitureFactory = new ObjectType(gameData,{
        id: "furnitureFactory",
        blocks: {
            ResourceProduction: {},
            HubConnectivity: {},
            EnergyManager: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept","solarPanel","activationItem","targetSelectionItem"]
            },
            FeatureManager: {},
            WorkingPlace: {
                requiredSkills: 0
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }

        },
        className: "factory",
        initWidth: 48,
        initHeight: 48,
        allowOnMapTypeId: "cityMapType01",
        name: "Furniture Factory",
        spritesheetId: "objectsSprite",
        spriteFrame: 2,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 3,
        buildTime: 1000
    });
    gameData.objectTypes.add(furnitureFactory);

    var mineralStorage = new ObjectType(gameData,{
        id: "mineralStorage",
        blocks: {
            ResourceStorage: {
                ressourceTypeIds: ["iron","carbon"],
                ressourceCapacity: [100, 200]
            },
            FeatureManager: {},
            HubConnectivity: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept","solarPanel"]
            },
            WorkingPlace: {
                requiredSkills: 0
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }

        },
        className: "storage",
        initWidth: 95,
        initHeight: 95,
        allowOnMapTypeId: "cityMapType01",
        name: "Mineral Storage",
        spritesheetId: "mineralStorageSprite",
        spriteFrame: 0,
        spriteAnimation: "working",
        iconSpritesheetId: "mineralStorageSprite",
        iconSpriteFrame: 0,
        buildTime: 1000
    });
    gameData.objectTypes.add(mineralStorage);

    var liquidStorage = new ObjectType(gameData,{
        id: "liquidStorage",
        blocks: {
            ResourceStorage: {
                ressourceTypeIds: ["oxygen"],
                ressourceCapacity: [100]
            },
            FeatureManager: {},
            HubConnectivity: {
                numPorts:  1
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept","solarPanel"]
            },
            WorkingPlace: {
                requiredSkills:  0
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }

        },
        className: "storage",
        initWidth: 150,
        initHeight: 150,
        allowOnMapTypeId: "cityMapType01",
        name: "Liquid Storage",
        spritesheetId: "objectsSprite",
        spriteFrame: 8,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 9,
        buildTime: 1000
    });
    gameData.objectTypes.add(liquidStorage);

    var plantation1 = new ObjectType(gameData,{
        id: "plantation1",
        blocks: {
            ResourceStorage: {
                ressourceTypeIds: ["oxygen"],
                ressourceCapacity: [5]
            },
            FeatureManager: {},
            HubConnectivity: {
                numPorts:  1
            },
            SoilPuller: {
                ressourceTypeIds: ["oxygen"],
                ressourceMaxInPerSec: [5]
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept","solarPanel"]
            },
            WorkingPlace: {
                requiredSkills:  0
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }
        },
        className: "plantation",
        initWidth: 40,
        initHeight: 40,
        allowOnMapTypeId: "cityMapType01",
        name: "tree plantation",
        spritesheetId: "objectsSprite",
        spriteFrame: 12,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 13,
        buildTime: 1000
    });
    gameData.objectTypes.add(plantation1);

    var plantation2 = new ObjectType(gameData,{
        id: "plantation2",
        blocks: {
            ResourceStorage: {
                ressourceTypeIds: ["oxygen"],
                ressourceCapacity: [5]
            },
            FeatureManager: {},
            SoilPuller: {
                ressourceTypeIds: ["oxygen"],
                ressourceMaxInPerSec: [5]
            },
            HubConnectivity: {
                numPorts:  1
            },
            WorkingPlace: {
                requiredSkills: 0
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: []
            },
            ProductivityCalculator: {},
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }
        },
        className: "plantation",
        initWidth: 40,
        initHeight: 40,
        allowOnMapTypeId: "cityMapType01",
        name: "tree plantation 2",
        spritesheetId: "objectsSprite",
        spriteFrame: 14,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 15,
        buildTime: 1000
    });
    gameData.objectTypes.add(plantation2);

    var defenseTower = new ObjectType(gameData,{
        id: "defenseTower",
        blocks: {
            Tower: {},
            FeatureManager: {},
            HubConnectivity: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["solarPanel"]
            },
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }
        },
        className: "tower",
        initWidth: 48,
        initHeight: 48,
        allowOnMapTypeId: "cityMapType01",
        name: "Defense Tower",
        spritesheetId: "objectsSprite",
        spriteFrame: 0,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 1,
        buildTime: 5000
    });
    gameData.objectTypes.add(defenseTower);

    var subObject = new ObjectType(gameData,{
        id: "subObject",
        blocks: {
            Unit: {
                itemTypeId:"unitItem1",
                deployTime: 20000,
            },
            FeatureManager: {},
            HubConnectivity: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: []
            },
            UserObject: {
                maxHealthPoints:20,
                points: 15
            }
        },
        className: "subObject",
        initWidth: 48,
        initHeight: 48,
        allowOnMapTypeId: "cityMapType01",
        name: "Attack Unit",
        spritesheetId: "objectsSprite",
        spriteFrame: 0,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 1,
        buildTime: 5000
    });
    gameData.objectTypes.add(subObject);

    gameData.itemTypes.add(new ItemType(gameData,{
        id: "unitItem1",
        name: "excavator",
        className: "unitItem",
        blocks: {
            SubObject: {
                mapObjTypeId: "subObject"
            },
            Movable: {
                movementSpeed: 0.1,  // per sec
                maxRange: 500,
                movingUpTime: 3000
            },
            FeatureManager: {}
        },
        allowOnMapTypeId: "moonMap01",
        iconSpritesheetId: "itemSprite",
        iconSpriteFrame: 3,
        buildMenuTooltip: "this is awesome",
        transitionTime: [10000,10000]

    }));


    var spacecraftUnitObject = new ObjectType(gameData,{
        id: "spacecraftUnitObject01",
        blocks: {
            Unit: {},
            FeatureManager: {},
            HubConnectivity: {
                numPorts:  1
            },
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["solarPanel"]
            },
            UserObject: {
                maxHealthPoints:10,
                points: 5
            }
        },
        className: "spacecraft",
        initWidth: 48,
        initHeight: 48,
        allowOnMapTypeId: "moonMapType01",
        name: "spacecraft",
        spritesheetId: "objectsSprite",
        spriteFrame: 4,
        iconSpritesheetId: "objectsSprite",
        iconSpriteFrame: 5,
        buildTime: 5000
    });
    gameData.objectTypes.add(spacecraftUnitObject);

    var connection = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "connection",
        blocks: {
            Connection: {},
            UpgradeProduction: {}
        },
        className: "connection",
        initWidth: 150,
        initHeight: 10,
        allowOnMapTypeId: "cityMapType01",
        name: "Connection",
        spritesheetId: "forestSprite01",
        spriteFrame: 1,
        iconSpritesheetId: "forestSprite01",
        iconSpriteFrame: 0,
        buildTime: 2000
    }));

    var planetConnection = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "planetConnection",
        blocks: {
            Connection: {},
            UpgradeProduction: {}
        },
        className: "connection",
        initWidth: 150,
        initHeight: 10,
        allowOnMapTypeId: "moonMapType01",
        name: "Planet Hub Connection",
        spritesheetId: "planetConnectionSprite",
        spriteFrame: [0, 1, 2, 3, 4, 5, 6],
        iconSpritesheetId: "planetConnectionSprite",
        iconSpriteFrame: 0,
        buildTime: 2000
    }));

    var constructionSite = new ObjectType(gameData,{
        id: "constructionSite",
        blocks: {
            ConstructionSite: {},
            HubConnectivity: {},
            UserObject: {
                maxHealthPoints:0,
                points: 0
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "constructionSite",
        initWidth: 48,
        initHeight: 48,
        allowOnMapTypeId: "cityMapType01",
        name: "constructionSite",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 3,
        iconSpritesheetId: "cityBuildingsSprite01",
        iconSpriteFrame: 10,
        buildTime: 0
    });
    gameData.objectTypes.add(constructionSite);

    var dome = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "dome",
        blocks: {
            Sublayer: {},
            HubNode: {
                minRange: 400,
                maxRange: 3000,
                connBuildTimePerDist: 1
            },
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 80,
        initHeight: 80,
        allowOnMapTypeId: "moonMapType01",
        name: "City Dome",
        spritesheetId: moonSprite.id,
        spriteFrame: 1,
        iconSpritesheetId: moonSprite.id,
        iconSpriteFrame: 2,
        buildTime: 2000
    }));


    var sunPlanet = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "sunPlanet",
        blocks: {
            Environment: {}
        },
        className: "center",
        initWidth: 255,
        initHeight: 255,
        allowOnMapTypeId: "solarMapType01",
        name: "Sun",
        spritesheetId: planetSprite.id,
        spriteFrame: 4,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 4,
        buildTime: 20000
    }));

    var earthPlanet = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "earthPlanet",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 255,
        initHeight: 255,
        allowOnMapTypeId: "solarMapType01",
        name: "Earth",
        spritesheetId: planetSprite.id,
        spriteFrame: 0,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 0,
        buildTime: 20000
    }));


    var marsPlanet = gameData.objectTypes.add(new ObjectType(gameData,{
        id: "marsPlanet",
        blocks: {
            Sublayer: {},
            HubConnectivity: {
                numPorts: 12
            },
            UserObject: {
                maxHealthPoints: 100,
                points: 50
            },
            UpgradeProduction: {
                numSlots: 0,
                itemTypeIds: []
            }
        },
        className: "sublayer",
        initWidth: 255,
        initHeight: 255,
        allowOnMapTypeId: "solarMapType01",
        name: "Mars",
        spritesheetId: planetSprite.id,
        spriteFrame: 1,
        iconSpritesheetId: planetSprite.id,
        iconSpriteFrame: 1,
        buildTime: 15000
    }));

    var carbon = new RessourceType(gameData,{
        id: "carbon",
        name: "carbon",
        iconSpritesheetId: "ressourceSprite01",
        iconSpriteFrame: 0,
        buildMenuTooltip:"carbon is great",
        buildTime: 2000
    });
    gameData.ressourceTypes.add(carbon);
    var iron = new RessourceType(gameData,{
        id: "iron",
        name: "iron",
        iconSpritesheetId: "ressourceSprite01",
        iconSpriteFrame: 3,
        buildMenuTooltip:"iron is great",
        buildTime: 2000
    });
    gameData.ressourceTypes.add(iron);
    var oxygen = new RessourceType(gameData,{
        id: "oxygen",
        name: "oxygen",
        iconSpritesheetId: "ressourceSprite01",
        iconSpriteFrame: 1,
        buildMenuTooltip:"oxygen is great",
        buildTime: 2000
    });
    gameData.ressourceTypes.add(oxygen);

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




    gameData.itemTypes.add(new ItemType(gameData,{
        id: "engineerDept",
        name: "Engineering Department",
        className: "ProductivityUpgrade",
        blocks: {
            Feature: [
                {
                    stack: [
                        {getParentObj: {}},
                        {
                            addToProp: {
                                vars: ["maxHealthPoints", "points"],
                                blocks: ["UserObject", "UserObject"],
                                operator: ["plus", "times"],
                                values: ["10", "2"]
                            }
                        }
                    ]
                },
                {
                    stack: [
                        {getParentObj: {}},
                        {
                            addToProp: {
                                vars: ["maxHealthPoints", "points"],
                                blocks: ["UserObject", "UserObject"],
                                operator: ["plus", "times"],
                                values: ["20", "3"]
                            }
                        }
                    ]
                }
            ],
            FeatureManager: {

            },
            Movable: {
                movementSpeed: 0.1,  // per sec
                maxRange: 500
            }
        },
        allowOnMapTypeId: "moonMap01",
        iconSpritesheetId: "itemSprite",
        iconSpriteFrame: 1,
        buildMenuTooltip: "this is awesome",
        buildTime: [10000,10000,10000,10000,10000]

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        id: "solarPanel",
        name: "Solar Panels",
        className: "ProductivityUpgrade",
        blocks: {
            Feature: [
                {
                    stack:
                        [
                            {getObjInRange: 500},
                            {
                                addToProp: {
                                    vars: ["maxHealthPoints", "points"],
                                    blocks: ["UserObject", "UserObject"],
                                    operator: ["plus", "times"],
                                    values: ["5", "1.5"]
                                }
                            }
                        ]
                },
                {
                    stack:
                        [
                            {getObjInRange: 500},
                            {
                                addToProp: {
                                    vars: ["maxHealthPoints", "points"],
                                    blocks: ["UserObject", "UserObject"],
                                    operator: ["plus", "times"],
                                    values: ["10", "2"]
                                }
                            }
                        ]
                }
            ],
            FeatureManager: {

            }
        },
        allowOnMapTypeId: "moonMap01",
        iconSpritesheetId: "itemSprite",
        iconSpriteFrame: 7,
        buildMenuTooltip: "this is even better",
        buildTime: [10000,10000,10000,10000,10000]

    }));



    gameData.itemTypes.add(new ItemType(gameData,{
        id: "activationItem",
        name: "activationItem",
        className: "ProductivityUpgrade",
        blocks: {
            Feature: [
                {
                    stack: [
                        {activatePerClick: {targetType: "self", range: Infinity}},
                        {getParentObj: {}},
                        {addToProp: {
                            vars: ["maxHealthPoints"],
                            blocks: ["UserObject"],
                            operator: ["plus"],
                            values: ["50"]
                        }
                        },
                        {wait: { waitingTime : 5000 }},
                        {clear: { effectIdx: 0}},
                        {deactivate:{}},
                        {wait: { waitingTime : 3000}},
                        {goToExecutionIndex: {index : 0}}

                    ]
                },
                {
                    stack: [
                        {getParentObj: {}},
                        {
                            addToProp: {
                                vars: ["maxHealthPoints", "points"],
                                blocks: ["UserObject", "UserObject"],
                                operator: ["plus", "times"],
                                values: ["20", "3"]
                            }
                        }
                    ]
                }
            ],
            FeatureManager: {

            }
        },
        allowOnMapTypeId: "moonMap01",
        iconSpritesheetId: "itemSprite",
        iconSpriteFrame: 4,
        buildMenuTooltip: "this is awesome",
        buildTime: [10000,10000,10000,10000,10000]

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        id: "targetSelectionItem",
        name: "targetSelectionItem",
        className: "ProductivityUpgrade",
        blocks: {
            Feature: [
                {
                    stack: [
                        {activatePerClick: {targetType: "object", range: 500}},
                        {addToProp: {
                            vars: ["maxHealthPoints"],
                            blocks: ["UserObject"],
                            operator: ["plus"],
                            values: ["50"]
                        }
                        }
                    ]
                }
            ],
            FeatureManager: {

            }
        },
        allowOnMapTypeId: "moonMap01",
        iconSpritesheetId: "itemSprite",
        iconSpriteFrame: 2,
        buildMenuTooltip: "this is awesome",
        buildTime: [10000,10000,10000,10000,10000]

    }));

// save build categories:
    gameData.layerTypes.get("cityMapType01").buildCategories = [
        {name: 'Resources', objectTypeIds: ["Hub", "reactor", "mineralStorage", "liquidStorage", "plantation1", "plantation2"]},
        {name: 'Production', objectTypeIds: ["Factory1", "furnitureFactory", "robotFactory1"]},
        {name: 'Military', objectTypeIds: ["ScienceCenter", "researchFacility1", "defenseTower", "subObject"]}
    ];

    // save build categories:
    gameData.layerTypes.get("moonMapType01").buildCategories = [
        {name: 'Habitat', objectTypeIds: ["dome", "spacecraftUnitObject01", "PlanetHub"]}
    ];

    // create instances from here

    var galaxyMap = new Layer(gameData,{
        id: "galaxyMap01",
        parentObjId: null,
        width: 5000,              // pixelsize / 4
        height: 5000,             // pixelsize / 2
        mapTypeId: "galaxyMapType01",
        parentMapId: null,
        mapGeneratorParams: []

    });
    gameData.layers.add(galaxyMap);


    var solarMap = new Layer(gameData,{
        id: "solarMap01",
        parentObjId: "solarSystem01",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "solarMapType01",
        parentMapId: "galaxyMap01",
        mapGeneratorParams: [0.5,5500,40,6,13,5] // subLayerSeed,starTemperature,starSize,planetAmount,planetSizeMean,planetSizeStd
});
    gameData.layers.add(solarMap);


    var moonMap = new Layer(gameData,{
        id: "moonMap01",
        parentObjId: "firstPlanet",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "moonMapType01",
        parentMapId: "solarMap01",
        mapGeneratorParams: [2,10000,14,2,50,20]  // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
    });
    gameData.layers.add(moonMap);


    var moonMap2 = new Layer(gameData,{
        id: "moonMap02",
        parentObjId: "secondPlanet",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "moonMapType01",
        parentMapId: "solarMap01",
        mapGeneratorParams: [1,10000,15,2,50,20] // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
    });
    gameData.layers.add(moonMap2);

    var cityMap = new Layer(gameData,{
        id: "cityMap01",
        parentObjId: "firstCity",
        width: 10000,
        height: 10000,
        xPos: 10000,
        yPos: 10000,
        mapTypeId: "cityMapType01",
        parentMapId: "moonMap01",
        mapGeneratorParams: [1,10000,18,2,50,20]
    });
    gameData.layers.add(cityMap); // subLayerSeed,roughness,citySize,waterLevel,avgTemperature

    var cityMap2 = new Layer(gameData,{
        id: "cityMap02",
        parentObjId: "secondCity",
        width: 10000,
        height: 10000,
        xPos: 30000,
        yPos: 30000,
        mapTypeId: "cityMapType01",
        parentMapId: "moonMap01",
        mapGeneratorParams: [1,10000,18,2,50,20] // subLayerSeed,roughness,citySize,waterLevel,avgTemperature

    });
    gameData.layers.add(cityMap2);

// Sublayer Map Objects
    var sun = new MapObject(gameData,{
        id: "sun01",
        objTypeId: "sunPlanet",
        sublayerId: null,
        mapId: solarMap.id(),
        userId: 0,
        x: 0,
        y: 0
    });
    solarMap.mapData.mapObjects.add(sun);

    var planet1 = new MapObject(gameData,{
        id: "firstPlanet",
        objTypeId: "earthPlanet",
        sublayerId: "moonMap01",
        mapId: solarMap.id(),
        userId: 0,
        x: 1500,
        y: 0
    });
    solarMap.mapData.mapObjects.add(planet1);

    var planet2 = new MapObject(gameData,{
        id: "secondPlanet",
        objTypeId: "marsPlanet",
        sublayerId: "moonMap02",
        mapId: solarMap.id(),
        userId: 0,
        x: -1500,
        y: 1500
    });
    solarMap.mapData.mapObjects.add(planet2);

    var city1 = new MapObject(gameData,{
        id: "firstCity",
        objTypeId: "dome",
        sublayerId: "cityMap01",
        mapId: moonMap.id(),
        userId: 0,
        x: 0,
        y: 0
    });
    moonMap.mapData.mapObjects.add(city1);

    moonMap.mapData.mapObjects.add(new MapObject(gameData,{
        id: "secondCity",
        objTypeId: "dome",
        sublayerId: "cityMap02",
        mapId: moonMap.id(),
        userId: 0,
        x: 300,
        y: 0
    }));



    var solarSystem1 = new MapObject(gameData,{
        id: "solarSystem01",
        objTypeId: "normalStar",
        sublayerId: "solarMap01",
        mapId: galaxyMap.id(),
        userId: 0,
        x: 200,
        y: 100
    });
    galaxyMap.mapData.mapObjects.add(solarSystem1);




    for (var i = 1; i < 2000; i++) {
        moonMap.mapData.mapObjects.add(new MapObject(gameData,{
            id: "Moon1crater01inst" + i,
            mapId: moonMap.id(),
            x: Math.floor((Math.random() - 0.5) * (moonMap.width - crater01.initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (moonMap.height - crater01.initHeight / 2)),
            objTypeId: crater01.id,
            userId: 0
        }));
    }


    for (var i = 1; i < 2000; i++) {
        moonMap2.mapData.mapObjects.add(new MapObject(gameData,{
            id: "Moon2crater01inst" + i,
            mapId: moonMap2.id(),
            x: Math.floor((Math.random() - 0.5) * (moonMap2.width - crater01.initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (moonMap2.height - crater01.initHeight / 2)),
            objTypeId: crater01.id,
            userId: 0
        }));
    }


// Now start adding example objects to our example cityMap01
    for (var i = 1; i < 1000; i++) {
        cityMap.mapData.mapObjects.add(new MapObject(gameData,{
            id: "rock01inst" + i,
            mapId: cityMap.id(),
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock01.initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock01.initHeight / 2)),
            objTypeId: rock01.id,
            userId: 0
        }));
    }
    for (var i = 1; i < 1000; i++) {
        cityMap.mapData.mapObjects.add(new MapObject(gameData,{
            id: "rock02inst" + i,
            mapId: cityMap.id(),
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock02.initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock02.initHeight / 2)),
            objTypeId: rock02.id,
            userId: 0
        }));
    }

    // Add Start Building
    cityMap.mapData.mapObjects.add(new MapObject(gameData,{
        id: "furnitureFactory01",
        mapId: cityMap.id(),
        x: 0,
        y: 0,
        objTypeId: "furnitureFactory",
        userId: 0,
        state: State.NORMAL
    }));


    // Add Start Building
    cityMap2.mapData.mapObjects.add(new MapObject(gameData,{
        id: "furnitureFactory02",
        mapId: cityMap2.id(),
        x: 0,
        y: 0,
        objTypeId: "furnitureFactory",
        userId: 0,
        state: State.NORMAL
    }));

    // Add Start Building
    cityMap2.mapData.mapObjects.add(new MapObject(gameData,{
        id: "furnitureFactory03",
        mapId: cityMap2.id(),
        x: 500,
        y: 500,
        objTypeId: "furnitureFactory",
        userId: 0,
        state: State.NORMAL
    }));





    /*gameData.users.add(new User(gameData, {
     id: "testuser01",
     name: "testuser"
     }));*/


    var gameVars = {
        rootMapId: cityMap2.id()
        //rootMapId: galaxyMap.id

    };

    exports.gameData = gameData;
    exports.gameVars = gameVars;

})(node ? exports : window);
