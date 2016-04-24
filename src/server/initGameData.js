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
    })
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
            "resources/objects/planetHub/Image0001.png"
        ],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 0, 250, 215, 0, 125, 80],
            [0, 0, 48, 48, 1, 0, 0],

            [0, 0, 192, 160, 2, 125, 80],
            [0, 0, 48, 48, 3, 0, 0],

            [0, 0, 200, 146, 4, 100, 70],
            [0, 0, 48, 48, 5, 0, 0],

            [0, 0, 95, 60, 6, 47, 29],
            [0, 0, 48, 48, 7, 0, 0],

            [0, 0, 516, 387, 8, 258, 193],
            [0, 0, 48, 48, 9, 0, 0],

            [0, 0, 300, 271, 10, 150, 120],
            [0, 0, 48, 48, 11, 0, 0],

            [0, 0, 150, 124, 12, 75, 50],
            [0, 0, 48, 48, 13, 0, 0],

            [0, 0, 150, 124, 14, 75, 50],
            [0, 0, 48, 48, 15, 0, 0],

            [0, 0, 100, 100, 16, 50, 40]
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



    var cityMapType = new LayerType(gameData,{
        _id: "cityMapType01",
        _name: "City",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/ground.png",
        _groundImageScaling: 1
    })
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
        _initWidth: 36,
        _initHeight: 36,
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
            UpgradeProduction: {},
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
            UpgradeProduction: {},
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
            TechProduction: {},
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

    var furnitureFactory = new ObjectType(gameData,{
        _id: "furnitureFactory",
        _blocks: {
            ResourceProduction: {},
            HubConnectivity: {},
            EnergyManager: {},
            UpgradeProduction: {
                numSlots: 10,
                itemTypeIds: ["engineerDept","solarPanel"]
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
        _spritesheetId: "objectsSprite",
        _spriteFrame: 10,
        _iconSpritesheetId: "objectsSprite",
        _iconSpriteFrame: 11,
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
            Connection: {}
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
            Connection: {}
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




    var carbon = new RessourceType(gameData,{
        //_type: "RessourceType",
        _id: "12345",
        _name: "carbon",
        //rendering
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4,
        _buildMenuTooltip:"carbon is great",
        _buildTime: 2000
    });
    gameData.ressourceTypes.add(carbon);
    var iron = new RessourceType(gameData,{
        //_type: "RessourceType",
        _id: "324234",
        _name: "iron",
        //rendering
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4,
        _buildMenuTooltip:"iron is great",
        _buildTime: 2000
    });
    gameData.ressourceTypes.add(iron);

    gameData.technologyTypes.add(new TechnologyType(gameData,{
        _id: "wormholeTech",
        _name: "Wormhole Technology",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4,
        _buildTime: 2000
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
                            AddToProp: {
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
                            AddToProp: {
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
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 0,
        _buildMenuTooltip: "this is awesome",
        _maxLevel: 5,
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
                            {
                                getObjInRange: 500
                            },
                            {
                                AddToProp: {
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
                            {
                                getObjInRange: 1000
                            },
                            {
                                AddToProp: {
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
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 1,
        _buildMenuTooltip: "this is even better",
        _maxLevel: 5,
        _buildTime: [10000,10000,10000,10000,10000]

    }));



// save build categories:
    gameData.layerTypes.get("cityMapType01")._buildCategories = [
        {name: 'Resources', objectTypeIds: ["Hub", "mineralStorage", "liquidStorage", "plantation1", "plantation2"]},
        {name: 'Production', objectTypeIds: ["Factory1", "furnitureFactory", "robotFactory1"]},
        {name: 'Military', objectTypeIds: ["ScienceCenter", "defenseTower"]}
    ];

    // save build categories:
    gameData.layerTypes.get("moonMapType01")._buildCategories = [
        {name: 'Habitat', objectTypeIds: ["dome", "spacecraftUnitObject01", "PlanetHub"]}
    ];

    var moonMap = new Layer(gameData,{
        _id: "moonMap01",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "moonMapType01",
        gameData: gameData
    });
    gameData.layers.add(moonMap);

    var cityMap = new Layer(gameData,{
        _id: "cityMap01",
        width: 10000,
        height: 10000,
        mapTypeId: "cityMapType01",
        parentMapId: "moonMap01",
        gameData: gameData
    });
    gameData.layers.add(cityMap);

    var cityMap2 = new Layer(gameData,{
        _id: "cityMap02",
        width: 10000,
        height: 10000,
        mapTypeId: "cityMapType01",
        parentMapId: "moonMap01",
        gameData: gameData
    });
    gameData.layers.add(cityMap2);

// Map Objects
    var city1 = new MapObject(gameData,{
        _id: "firstCity",
        objTypeId: "dome",
        mapId: moonMap._id,
        userId: 0,

        x: 0,
        y: 0,

        _blocks: {
            Sublayer: {
                subLayerMapId: "cityMap01"
            }
        }
    });
    //city1._blocks.Sublayer.subLayerMapId = "cityMap01";
    moonMap.mapData.mapObjects.add(city1);
    moonMap.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "secondCity",
        mapId: moonMap._id,
        x: 300,
        y: 0,
        objTypeId: "dome",
        userId: 0,
        _blocks: {
            Sublayer: {
                subLayerMapId: "cityMap02"
            }
        }
    }));


    for (var i = 1; i < 2000; i++) {
        moonMap.mapData.mapObjects.add(new MapObject(gameData,{
            _id: "crater01inst" + i,
            mapId: moonMap._id,
            x: Math.floor((Math.random() - 0.5) * (moonMap.width - crater01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (moonMap.height - crater01._initHeight / 2)),
            objTypeId: crater01._id,
            userId: 0
        }));
    }




// Now start adding example objects to our example cityMap01
    for (var i = 1; i < 500; i++) {
        cityMap.mapData.mapObjects.add(new MapObject(gameData,{
            _id: "rock01inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock01._initHeight / 2)),
            objTypeId: rock01._id,
            userId: 0
        }));
    }
    for (var i = 1; i < 500; i++) {
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





    /*gameData.users.add(new User(gameData, {
     _id: "testuser01",
     name: "testuser"
     }));*/


    var gameVars = {
        rootMapId: moonMap._id
    }

    exports.gameData = gameData;
    exports.gameVars = gameVars;

})(node ? exports : window);
