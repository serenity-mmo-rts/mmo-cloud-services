var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../game/GameData').GameData;
    var mapObjectStates = require('../game/MapObject').mapObjectStates;
    var MapObject = require('../game/MapObject').MapObject;
    var LayerType = require('../game/types/LayerType').LayerType;
    var ObjectType = require('../game/types/ObjectType').ObjectType;
    var RessourceType = require('../game/types/ResourceType').RessourceType;
    var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../game/types/ItemType').ItemType;
    var Spritesheet = require('../game/Spritesheet').Spritesheet;
    var Layer = require('../game/Layer').Layer;
    var User = require('../game/User').User;

}

(function (exports) {
    var gameData = new GameData();

    var forestSprite = new Spritesheet(gameData,{
        _id: 'forestSprite01',
        images: ["resources/forest.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 448, 64, 64, 0, 32, 48],
            [64, 448, 64, 64, 0, 32, 48]
        ]
    });
    gameData.spritesheets.add(forestSprite);

    var moonSprite = new Spritesheet(gameData,{
        _id: 'moonSprite01',
        images: ["resources/objects/crater.png","resources/objects/dome.png","resources/objects/domeIcon.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 0, 242, 122, 0, 121, 61],
            [0, 0, 164, 79, 1, 82, 45],
            [0, 0, 32, 15, 2, 0, 0]
        ]
    })
    gameData.spritesheets.add(moonSprite);

    var citySprite = new Spritesheet(gameData,{
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
            [0, 0, 32, 32, 1, 0,0],
            [32, 0, 32, 32, 1, 0,0],
            [64, 0, 32, 32, 1, 0,0],
            [96, 0, 32, 32, 1,  0,0],
            [128, 0, 32, 32, 1, 0,0]
        ]
    });
    gameData.spritesheets.add(citySprite);

    var objectsSprite = new Spritesheet(gameData,{
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
    })
    gameData.spritesheets.add(objectsSprite);

    var planetConnectionSprite = new Spritesheet(gameData,{
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
    })
    gameData.spritesheets.add(planetConnectionSprite);

    var robotFactorySprite = new Spritesheet(gameData,{
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
    })
    gameData.spritesheets.add(robotFactorySprite);

    var researchFacilitySprite = new Spritesheet(gameData,{
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
                frames: [0,1,2,3,4,4,4,3,2,1,0,0],
                next: "working",
                speed: 0.05
            }
        }
    })
    gameData.spritesheets.add(researchFacilitySprite);

    var mineralStorageSprite = new Spritesheet(gameData,{
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
                frames: [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1,0],
                next: "working",
                speed: 0.05
            }
        }
    })
    gameData.spritesheets.add(mineralStorageSprite);


    var ressourceSprite = new Spritesheet(gameData,{
        _id: 'ressourceSprite01',
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
        _id: 'itemSprite',
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

    var cityMapType = new LayerType(gameData,{
        _id: "cityMapType01",
        _name: "City",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/ground.png",
        _groundImageScaling: 1
    });
    gameData.layerTypes.add(cityMapType);

    var moonMapType = new LayerType(gameData,{
        _id: "moonMapType01",
        _name: "Moon",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/moonGround.png",
        _groundImageScaling: 1
    })
    gameData.layerTypes.add(moonMapType);

    var solarMapType = new LayerType(gameData,{
        _id: "solarMapType01",
        _name: "Solar",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/background/starBackground.jpg",
        _groundImageScaling: 0.1,
        _groundDragScaling: 0.1
    });
    gameData.layerTypes.add(solarMapType);


    var galaxyMapType = new LayerType(gameData,{
        _id: "galaxyMapType01",
        _name: "Galaxy",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/background/starBackgroundBlack.jpg",
        _groundImageScaling: 1,
        _groundDragScaling: 0.1
    });
    gameData.layerTypes.add(galaxyMapType);


    var redDwarf = new ObjectType(gameData, {
        _id: "redDwarf",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 32,
        _initHeight: 32,
        _allowOnMapTypeId: "galaxyMapType01",
        _name: "redDwarf",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 5,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 5,
        _buildTime: 0,
        _StarSizesMean : 2,
        _StarSizesStd :0.5,
        _StarHeatMean : 2,
        _StarHeatStd : 0.5,
        _PlanetAmountMean : 8,
        _PlanetAmountStd : 4,
        _PlanetSizesMean : 14, // in 2 pow n
        _PlanetSizesStd : 3
    });
    gameData.objectTypes.add(redDwarf);


    var normalStar = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "normalStar",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 32,
        _initHeight: 32,
        _allowOnMapTypeId: "galaxyMapType01",
        _name: "normalStar",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 6,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 6,
        _buildTime: 0,
        _StarSizesMean : 5,
        _StarSizesStd :1,
        _StarHeatMean : 5,
        _StarHeatStd : 1,
        _PlanetAmountMean : 7,
        _PlanetAmountStd : 5,
        _PlanetSizesMean : 15, // in 2 pow n
        _PlanetSizesStd : 4
    }));

    var doubleSystem = new ObjectType(gameData, {
        _id: "doubleSystem",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 32,
        _initHeight: 32,
        _allowOnMapTypeId: "galaxyMapType01",
        _name: "doubleSystem",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 7,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 7,
        _buildTime: 0,
        _StarSizesMean : 4,
        _StarSizesStd :1,
        _StarHeatMean : 4,
        _StarHeatStd : 1,
        _PlanetAmountMean : 6,
        _PlanetAmountStd : 5,
        _PlanetSizesMean : 14, // in 2 pow n
        _PlanetSizesStd : 2
    });
    gameData.objectTypes.add(doubleSystem);


    var neutronStar = new ObjectType(gameData, {
        _id: "neutronStar",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 16,
        _initHeight: 16,
        _allowOnMapTypeId: "galaxyMapType01",
        _name: "neutronStar",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 8,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 8,
        _buildTime: 0,
        _StarSizesMean : 0.5,
        _StarSizesStd :0.1,
        _StarHeatMean : 0.5,
        _StarHeatStd : 0.1,
        _PlanetAmountMean : 3,
        _PlanetAmountStd : 2,
        _PlanetSizesMean : 13, // in 2 pow n
        _PlanetSizesStd : 5
    });
    gameData.objectTypes.add(neutronStar);

    var blackHole = new ObjectType(gameData, {
        _id: "blackHole",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 16,
        _initHeight: 16,
        _allowOnMapTypeId: "galaxyMapType01",
        _name: "blackHole",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 9,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 9,
        _buildTime: 0,
        _StarSizesMean : 0.25,
        _StarSizesStd : 10,
        _StarHeatMean : 0.25,
        _StarHeatStd : 10,
        _PlanetAmountMean : 1,
        _PlanetAmountStd : 1,
        _PlanetSizesMean : 13, // in 2 pow n
        _PlanetSizesStd : 5
    })
    gameData.objectTypes.add(blackHole);

    var crater01 = new ObjectType(gameData, {
        _id: "crater01",
        _blocks: {
            Environment: {}
        },
        _className: "environment",
        _initWidth: 10,
        _initHeight: 10,
        _allowOnMapTypeId: "moonMapType01",
        _name: "crater01",
        _spritesheetId: moonSprite._id,
        _spriteFrame: 0,
        _iconSpritesheetId: moonSprite._id,
        _iconSpriteFrame: 0,
        _buildTime: 0
    })
    gameData.objectTypes.add(crater01);

    var rock01 = new ObjectType(gameData,{
        _id: "rock01",
        _blocks: {
            Environment: {}
        },
        _className: "environment",
        _initWidth: 12,
        _initHeight: 12,
        _allowOnMapTypeId: "cityMapType01",
        _name: "rock01",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 0,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0,
        _buildTime: 0
    })
    gameData.objectTypes.add(rock01);

    var rock02 = new ObjectType(gameData,{
        _id: "rock02",
        _blocks: {
            Environment: {}
        },
        _className: "environment",
        _initWidth: 12,
        _initHeight: 12,
        _allowOnMapTypeId: "cityMapType01",
        _name: "rock2",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0,
        _buildTime: 0
    });
    gameData.objectTypes.add(rock02);

    var factory = new ObjectType(gameData,{
        _id: "Factory1",
        _blocks: {
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


        _className: "factory",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Mining Factory",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 0,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 6,
        _buildTime: 20000
    })
    gameData.objectTypes.add(factory);

    var robotFactory = new ObjectType(gameData,{
        _id: "robotFactory1",
        _blocks: {
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


        _className: "factory",
        _initWidth: 85,
        _initHeight: 85,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Robot Factory",
        _spritesheetId: "robotFactorySprite",
        _spriteFrame: 0,
        _spriteAnimation: "working",
        _iconSpritesheetId: "robotFactorySprite",
        _iconSpriteFrame: 0,
        _buildTime: 2000
    })
    gameData.objectTypes.add(robotFactory);

    var researchFacility = new ObjectType(gameData,{
        _id: "researchFacility1",
        _blocks: {
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


        _className: "factory",
        _initWidth: 40,
        _initHeight: 60,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Research Facility",
        _spritesheetId: "researchFacilitySprite",
        _spriteFrame: 0,
        _spriteAnimation: "working",
        _iconSpritesheetId: "researchFacilitySprite",
        _iconSpriteFrame: 0,
        _buildTime: 2000
    })
    gameData.objectTypes.add(researchFacility);

    var hub = new ObjectType(gameData,{
        _id: "Hub",
        _blocks: {
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
        _className: "hub",
        _initWidth: 35,
        _initHeight: 35,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Small Hub",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 6,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 7,
        _buildTime: 12000
    });
    gameData.objectTypes.add(hub);

    var planethub = new ObjectType(gameData,{
        _id: "PlanetHub",
        _blocks: {
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
        _className: "hub",
        _initWidth: 35,
        _initHeight: 35,
        _allowOnMapTypeId: "moonMapType01",
        _name: "Small Planet Hub",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 16,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 16,
        _buildTime: 12000
    });
    gameData.objectTypes.add(planethub);

    var sciencecenter = new ObjectType(gameData,{
        _id: "ScienceCenter",
        _blocks: {
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
        _className: "scienceCenter",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Military Research Facility",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 2,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 8,
        _buildTime: 10000
    });
    gameData.objectTypes.add(sciencecenter);

    var reactor = new ObjectType(gameData,{
        _id: "reactor",
        _blocks: {
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
        _className: "reactor",
        _initWidth: 45,
        _initHeight: 45,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Reactor",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 17,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 17,
        _buildTime: 3000
    });
    gameData.objectTypes.add(reactor);

    var furnitureFactory = new ObjectType(gameData,{
        _id: "furnitureFactory",
        _blocks: {
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
        _className: "factory",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Furniture Factory",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 2,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 3,
        _buildTime: 1000
    });
    gameData.objectTypes.add(furnitureFactory);

    var mineralStorage = new ObjectType(gameData,{
        _id: "mineralStorage",
        _blocks: {
            ResourceStorage: {},
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
        _className: "storage",
        _initWidth: 95,
        _initHeight: 95,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Mineral Storage",
        _spritesheetId: "mineralStorageSprite",
        _spriteFrame: 0,
        _spriteAnimation: "working",
        _iconSpritesheetId: "mineralStorageSprite",
        _iconSpriteFrame: 0,
        _buildTime: 1000
    });
    gameData.objectTypes.add(mineralStorage);

    var liquidStorage = new ObjectType(gameData,{
        _id: "liquidStorage",
        _blocks: {
            ResourceStorage: {},
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
        _className: "storage",
        _initWidth: 150,
        _initHeight: 150,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Liquid Storage",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 8,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 9,
        _buildTime: 1000
    });
    gameData.objectTypes.add(liquidStorage);

    var plantation1 = new ObjectType(gameData,{
        _id: "plantation1",
        _blocks: {
            ResourceStorage: {},
            FeatureManager: {},
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
        _className: "plantation",
        _initWidth: 40,
        _initHeight: 40,
        _allowOnMapTypeId: "cityMapType01",
        _name: "tree plantation",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 12,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 13,
        _buildTime: 1000
    });
    gameData.objectTypes.add(plantation1);

    var plantation2 = new ObjectType(gameData,{
        _id: "plantation2",
        _blocks: {
            ResourceStorage: {},
            FeatureManager: {},
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
        _className: "plantation",
        _initWidth: 40,
        _initHeight: 40,
        _allowOnMapTypeId: "cityMapType01",
        _name: "tree plantation 2",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 14,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 15,
        _buildTime: 1000
    });
    gameData.objectTypes.add(plantation2);

    var defenseTower = new ObjectType(gameData,{
        _id: "defenseTower",
        _blocks: {
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
        _className: "tower",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Defense Tower",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 0,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 1,
        _buildTime: 5000
    });
    gameData.objectTypes.add(defenseTower);

    var subObject = new ObjectType(gameData,{
        _id: "subObject",
        _blocks: {
            Unit: {
                itemTypeId:"unitItem",
                deployTime: 20000
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
        _className: "subObject",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Attack Unit",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 0,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 1,
        _buildTime: 5000
    });
    gameData.objectTypes.add(subObject);

    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "excavator",
        _name: "excavator",
        _className: "unitItem",
        _blocks: {
            SubObject: {
                mapObjTypeId: "subObject"
            },
            Movable: {},
            FeatureManager: {}
        },
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "itemSprite",
        _iconSpriteFrame: 3,
        _buildMenuTooltip: "this is awesome",
        _transitionTime: [10000,10000]

    }));


    var spacecraftUnitObject = new ObjectType(gameData,{
        _id: "spacecraftUnitObject01",
        _blocks: {
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
        _className: "spacecraft",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "moonMapType01",
        _name: "spacecraft",
        _spritesheetId: "objectsSprite",
        _spriteFrame: 4,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 5,
        _buildTime: 5000
    });
    gameData.objectTypes.add(spacecraftUnitObject);

    var connection = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "connection",
        _blocks: {
            Connection: {},
            UpgradeProduction: {}
        },
        _className: "connection",
        _initWidth: 150,
        _initHeight: 10,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Connection",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0,
        _buildTime: 2000
    }));

    var planetConnection = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "planetConnection",
        _blocks: {
            Connection: {},
            UpgradeProduction: {}
        },
        _className: "connection",
        _initWidth: 150,
        _initHeight: 10,
        _allowOnMapTypeId: "moonMapType01",
        _name: "Planet Hub Connection",
        _spritesheetId: "planetConnectionSprite",
        _spriteFrame: [0, 1, 2, 3, 4, 5, 6],
        _iconSpritesheetId: "planetConnectionSprite",
        _iconSpriteFrame: 0,
        _buildTime: 2000
    }));

    var constructionSite = new ObjectType(gameData,{
        _id: "constructionSite",
        _blocks: {
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
        _className: "constructionSite",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "constructionSite",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 3,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 10,
        _buildTime: 0
    });
    gameData.objectTypes.add(constructionSite);

    var dome = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "dome",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 80,
        _initHeight: 80,
        _allowOnMapTypeId: "moonMapType01",
        _name: "City Dome",
        _spritesheetId: moonSprite._id,
        _spriteFrame: 1,
        _iconSpritesheetId: moonSprite._id,
        _iconSpriteFrame: 2,
        _buildTime: 2000
    }));


    var sunPlanet = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "sunPlanet",
        _blocks: {
            Environment: {}
        },
        _className: "center",
        _initWidth: 255,
        _initHeight: 255,
        _allowOnMapTypeId: "solarMapType01",
        _name: "Sun",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 4,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 4,
        _buildTime: 20000
    }));

    var earthPlanet = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "earthPlanet",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 255,
        _initHeight: 255,
        _allowOnMapTypeId: "solarMapType01",
        _name: "Earth",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 0,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 0,
        _buildTime: 20000
    }));


    var marsPlanet = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "marsPlanet",
        _blocks: {
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
        _className: "sublayer",
        _initWidth: 255,
        _initHeight: 255,
        _allowOnMapTypeId: "solarMapType01",
        _name: "Mars",
        _spritesheetId: planetSprite._id,
        _spriteFrame: 1,
        _iconSpritesheetId: planetSprite._id,
        _iconSpriteFrame: 1,
        _buildTime: 15000
    }));

    var carbon = new RessourceType(gameData,{
        _id: "carbon",
        _name: "carbon",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 0,
        _buildMenuTooltip:"carbon is great",
        _buildTime: 2000
    });
    gameData.ressourceTypes.add(carbon);
    var iron = new RessourceType(gameData,{
        _id: "iron",
        _name: "iron",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 3,
        _buildMenuTooltip:"iron is great",
        _buildTime: 2000
    });
    gameData.ressourceTypes.add(iron);
    var oxygen = new RessourceType(gameData,{
        _id: "oxygen",
        _name: "oxygen",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 1,
        _buildMenuTooltip:"oxygen is great",
        _buildTime: 2000
    });
    gameData.ressourceTypes.add(oxygen);

    gameData.technologyTypes.add(new TechnologyType(gameData,{
        _id: "wormholeTech",
        _name: "Wormhole Technology",
        _iconSpritesheetId: "itemSprite",
        _iconSpriteFrame: 0,
        _buildTime: 5000,
        _initWidth: 96,
        _initHeight: 96,

        _allowOnMapTypeId: "moonMap01",
        _allowOnObjTypeId: "ScienceCenter",
        _requiredTechnologies: [],
        _requiredItemIds: [],
        _requiredItemLevels: [],
        _requiredSkillIds: [],
        _requiredSkillPoints: [],
        _requiredResourceIds: [],
        _requiredResourceAmounts: [],
        _techPoints: 50
    }));




    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "engineerDept",
        _name: "Engineering Department",
        _className: "ProductivityUpgrade",
        _blocks: {
            Feature: [
                {
                    _stack: [
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
                    _stack: [
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
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "itemSprite",
        _iconSpriteFrame: 1,
        _buildMenuTooltip: "this is awesome",
        _buildTime: [10000,10000,10000,10000,10000]

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "solarPanel",
        _name: "Solar Panels",
        _className: "ProductivityUpgrade",
        _blocks: {
            Feature: [
                {
                    _stack:
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
                    _stack:
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
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "itemSprite",
        _iconSpriteFrame: 7,
        _buildMenuTooltip: "this is even better",
        _buildTime: [10000,10000,10000,10000,10000]

    }));



    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "activationItem",
        _name: "activationItem",
        _className: "ProductivityUpgrade",
        _blocks: {
            Feature: [
                {
                    _stack: [
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
                    _stack: [
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
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "itemSprite",
        _iconSpriteFrame: 4,
        _buildMenuTooltip: "this is awesome",
        _buildTime: [10000,10000,10000,10000,10000]

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "targetSelectionItem",
        _name: "targetSelectionItem",
        _className: "ProductivityUpgrade",
        _blocks: {
            Feature: [
                {
                    _stack: [
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
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "itemSprite",
        _iconSpriteFrame: 2,
        _buildMenuTooltip: "this is awesome",
        _buildTime: [10000,10000,10000,10000,10000]

    }));

// save build categories:
    gameData.layerTypes.get("cityMapType01")._buildCategories = [
        {name: 'Resources', objectTypeIds: ["Hub", "reactor", "mineralStorage", "liquidStorage", "plantation1", "plantation2"]},
        {name: 'Production', objectTypeIds: ["Factory1", "furnitureFactory", "robotFactory1"]},
        {name: 'Military', objectTypeIds: ["ScienceCenter", "researchFacility1", "defenseTower", "subObject"]}
    ];

    // save build categories:
    gameData.layerTypes.get("moonMapType01")._buildCategories = [
        {name: 'Habitat', objectTypeIds: ["dome", "spacecraftUnitObject01", "PlanetHub"]}
    ];

    // create instances from here

    var galaxyMap = new Layer(gameData,{
        _id: "galaxyMap01",
        parentObjId: null,
        width: 5000,              // pixelsize / 4
        height: 5000,             // pixelsize / 2
        mapTypeId: "galaxyMapType01",
        parentMapId: null,
        mapGeneratorParams: []

    });
    gameData.layers.add(galaxyMap);


    var solarMap = new Layer(gameData,{
        _id: "solarMap01",
        parentObjId: "solarSystem01",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "solarMapType01",
        parentMapId: "galaxyMap01",
        mapGeneratorParams: [0.5,5500,40,6,13,5] // subLayerSeed,starTemperature,starSize,planetAmount,planetSizeMean,planetSizeStd
});
    gameData.layers.add(solarMap);


    var moonMap = new Layer(gameData,{
        _id: "moonMap01",
        parentObjId: "firstPlanet",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "moonMapType01",
        parentMapId: "solarMap01",
        mapGeneratorParams: [2,10000,14,2,50,20]  // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
    });
    gameData.layers.add(moonMap);


    var moonMap2 = new Layer(gameData,{
        _id: "moonMap02",
        parentObjId: "secondPlanet",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "moonMapType01",
        parentMapId: "solarMap01",
        mapGeneratorParams: [1,10000,15,2,50,20] // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
    });
    gameData.layers.add(moonMap2);

    var cityMap = new Layer(gameData,{
        _id: "cityMap01",
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
        _id: "cityMap02",
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
        _id: "sun01",
        objTypeId: "sunPlanet",
        sublayerId: null,
        mapId: solarMap._id,
        userId: 0,
        x: 0,
        y: 0
    });
    solarMap.mapData.mapObjects.add(sun);

    var planet1 = new MapObject(gameData,{
        _id: "firstPlanet",
        objTypeId: "earthPlanet",
        sublayerId: "moonMap01",
        mapId: solarMap._id,
        userId: 0,
        x: 1500,
        y: 0
    });
    solarMap.mapData.mapObjects.add(planet1);

    var planet2 = new MapObject(gameData,{
        _id: "secondPlanet",
        objTypeId: "marsPlanet",
        sublayerId: "moonMap02",
        mapId: solarMap._id,
        userId: 0,
        x: -1500,
        y: 1500
    });
    solarMap.mapData.mapObjects.add(planet2);

    var city1 = new MapObject(gameData,{
        _id: "firstCity",
        objTypeId: "dome",
        sublayerId: "cityMap01",
        mapId: moonMap._id,
        userId: 0,
        x: 0,
        y: 0
    });
    moonMap.mapData.mapObjects.add(city1);

    moonMap.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "secondCity",
        objTypeId: "dome",
        sublayerId: "cityMap02",
        mapId: moonMap._id,
        userId: 0,
        x: 300,
        y: 0
    }));



    var solarSystem1 = new MapObject(gameData,{
        _id: "solarSystem01",
        objTypeId: "normalStar",
        sublayerId: "solarMap01",
        mapId: galaxyMap._id,
        userId: 0,
        x: 200,
        y: 100
    });
    galaxyMap.mapData.mapObjects.add(solarSystem1);




    for (var i = 1; i < 2000; i++) {
        moonMap.mapData.mapObjects.add(new MapObject(gameData,{
            _id: "Moon1crater01inst" + i,
            mapId: moonMap._id,
            x: Math.floor((Math.random() - 0.5) * (moonMap.width - crater01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (moonMap.height - crater01._initHeight / 2)),
            objTypeId: crater01._id,
            userId: 0
        }));
    }


    for (var i = 1; i < 2000; i++) {
        moonMap2.mapData.mapObjects.add(new MapObject(gameData,{
            _id: "Moon2crater01inst" + i,
            mapId: moonMap2._id,
            x: Math.floor((Math.random() - 0.5) * (moonMap2.width - crater01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (moonMap2.height - crater01._initHeight / 2)),
            objTypeId: crater01._id,
            userId: 0
        }));
    }


// Now start adding example objects to our example cityMap01
    for (var i = 1; i < 1000; i++) {
        cityMap.mapData.mapObjects.add(new MapObject(gameData,{
            _id: "rock01inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock01._initHeight / 2)),
            objTypeId: rock01._id,
            userId: 0
        }));
    }
    for (var i = 1; i < 1000; i++) {
        cityMap.mapData.mapObjects.add(new MapObject(gameData,{
            _id: "rock02inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock02._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock02._initHeight / 2)),
            objTypeId: rock02._id,
            userId: 0
        }));
    }

    // Add Start Building
    cityMap.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "furnitureFactory01",
        mapId: cityMap._id,
        x: 0,
        y: 0,
        objTypeId: "furnitureFactory",
        userId: 0,
        state: mapObjectStates.FINISHED
    }));


    // Add Start Building
    cityMap2.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "furnitureFactory02",
        mapId: cityMap2._id,
        x: 0,
        y: 0,
        objTypeId: "furnitureFactory",
        userId: 0,
        state: mapObjectStates.FINISHED
    }));

    // Add Start Building
    cityMap2.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "furnitureFactory03",
        mapId: cityMap2._id,
        x: 500,
        y: 500,
        objTypeId: "furnitureFactory",
        userId: 0,
        state: mapObjectStates.FINISHED
    }));





    /*gameData.users.add(new User(gameData, {
     _id: "testuser01",
     name: "testuser"
     }));*/


    var gameVars = {
        rootMapId: cityMap2._id
        //rootMapId: galaxyMap._id

    }

    exports.gameData = gameData;
    exports.gameVars = gameVars;

})(node ? exports : window);
