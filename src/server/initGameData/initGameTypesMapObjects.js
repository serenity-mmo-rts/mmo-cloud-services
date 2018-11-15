var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../../game/GameData').GameData;
    var State = require('../../game/AbstractBlock').State;
    var MapObject = require('../../game/MapObject').MapObject;
    var LayerType = require('../../game/types/LayerType').LayerType;
    var ObjectType = require('../../game/types/ObjectType').ObjectType;
    var RessourceType = require('../../game/types/ResourceType').RessourceType;
    var TechnologyType = require('../../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../../game/types/ItemType').ItemType;
    var UserType = require('../../game/types/UserType').UserType;
    var Spritesheet = require('../../game/Spritesheet').Spritesheet;
    var Layer = require('../../game/Layer').Layer;
    var User = require('../../game/User').User;

}

(function (exports) {

    function initGameTypesMapObjects(gameData) {


        var redDwarf = new ObjectType(gameData, {
            _id: "redDwarf",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 5,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 5,
            buildTime: 0,
            StarSizesMean: 2,
            StarSizesStd: 0.5,
            StarHeatMean: 2,
            StarHeatStd: 0.5,
            PlanetAmountMean: 8,
            PlanetAmountStd: 4,
            PlanetSizesMean: 14, // in 2 pow n
            PlanetSizesStd: 3
        });
        gameData.objectTypes.add(redDwarf);


        var normalStar = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "normalStar",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 6,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 6,
            buildTime: 0,
            StarSizesMean: 5,
            StarSizesStd: 1,
            StarHeatMean: 5,
            StarHeatStd: 1,
            PlanetAmountMean: 7,
            PlanetAmountStd: 5,
            PlanetSizesMean: 15, // in 2 pow n
            PlanetSizesStd: 4
        }));

        var doubleSystem = new ObjectType(gameData, {
            _id: "doubleSystem",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 7,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 7,
            buildTime: 0,
            StarSizesMean: 4,
            StarSizesStd: 1,
            StarHeatMean: 4,
            StarHeatStd: 1,
            PlanetAmountMean: 6,
            PlanetAmountStd: 5,
            PlanetSizesMean: 14, // in 2 pow n
            PlanetSizesStd: 2
        });
        gameData.objectTypes.add(doubleSystem);


        var neutronStar = new ObjectType(gameData, {
            _id: "neutronStar",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 8,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 8,
            buildTime: 0,
            StarSizesMean: 0.5,
            StarSizesStd: 0.1,
            StarHeatMean: 0.5,
            StarHeatStd: 0.1,
            PlanetAmountMean: 3,
            PlanetAmountStd: 2,
            PlanetSizesMean: 13, // in 2 pow n
            PlanetSizesStd: 5
        });
        gameData.objectTypes.add(neutronStar);

        var blackHole = new ObjectType(gameData, {
            _id: "blackHole",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 9,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 9,
            buildTime: 0,
            StarSizesMean: 0.25,
            StarSizesStd: 10,
            StarHeatMean: 0.25,
            StarHeatStd: 10,
            PlanetAmountMean: 1,
            PlanetAmountStd: 1,
            PlanetSizesMean: 13, // in 2 pow n
            PlanetSizesStd: 5
        });
        gameData.objectTypes.add(blackHole);

        var crater01 = new ObjectType(gameData, {
            _id: "crater01",
            blocks: {
                Environment: {}
            },
            className: "environment",
            initWidth: 10,
            initHeight: 10,
            allowOnMapTypeId: "moonMapType01",
            name: "crater01",
            spritesheetId: 'moonSprite01',
            spriteFrame: 0,
            iconSpritesheetId: 'moonSprite01',
            iconSpriteFrame: 0,
            buildTime: 0
        });
        gameData.objectTypes.add(crater01);

        var rock01 = new ObjectType(gameData, {
            _id: "rock01",
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

        var rock02 = new ObjectType(gameData, {
            _id: "rock02",
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

        var factory = new ObjectType(gameData, {
            _id: "Factory1",
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
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 20000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]

        });
        gameData.objectTypes.add(factory);

        var robotFactory = new ObjectType(gameData, {
            _id: "robotFactory1",
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
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 2000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(robotFactory);

        var researchFacility = new ObjectType(gameData, {
            _id: "researchFacility1",
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
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 2000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(researchFacility);

        var hub = new ObjectType(gameData, {
            _id: "Hub",
            blocks: {
                HubNode: {
                    canBuildConnectionTypeId: "connection",
                    maxRange: 1000,
                    connBuildTimePerDist: 1
                },
                HubConnectivity: {
                    numPorts: 5
                },
                EnergyManager: {
                    requiredPerSec: 0
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
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 4000
         //   requiredResourceIds:["granulateMaterial"],
         //   requiredResourceAmount: [500]
        });
        gameData.objectTypes.add(hub);

        var planethub = new ObjectType(gameData, {
            _id: "PlanetHub",
            blocks: {
                HubNode: {
                    canBuildConnectionTypeId: "planetConnection",
                    maxRange: 1000,
                    connBuildTimePerDist: 1
                },
                HubConnectivity: {
                    numPorts: 20
                },
                EnergyManager: {
                    requiredPerSec: 0
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
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 12000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(planethub);

        var sciencecenter = new ObjectType(gameData, {
            _id: "ScienceCenter",
            blocks: {
                TechProduction: {
                    producableTechnologies: ["wormholeTech"]
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
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 10000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(sciencecenter);

        var reactor = new ObjectType(gameData, {
            _id: "reactor",
            blocks: {
                TechProduction: {
                    producableTechnologies: ["wormholeTech"]
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
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["granulateMaterial","carbonFiber"],
                    ressourceCapacity: [0, 0]
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
            buildTime: 3000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(reactor);

        var furnitureFactory = new ObjectType(gameData, {
            _id: "furnitureFactory",
            blocks: {
                ResourceProduction: {},
                HubConnectivity: {},
                EnergyManager: {},
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["engineerDept", "solarPanel", "activationItem", "targetSelectionItem", "activationResetItem"]
                },
                FeatureManager: {},
                WorkingPlace: {
                    requiredSkills: 0
                },
                ProductivityCalculator: {},
                UserObject: {
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            buildTime: 1000,
            requiredResourceIds:["oxygen"],
            requiredResourceAmount: [30]
        });
        gameData.objectTypes.add(furnitureFactory);

        var mineralStorage = new ObjectType(gameData, {
            _id: "mineralStorage",
            blocks: {
                ResourceManager: {
                    ressourceTypeIds: ["granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
                },
                FeatureManager: {},
                HubNode: {
                    canBuildConnectionTypeId: "connection",
                    maxRange: 1000,
                    connBuildTimePerDist: 1
                },
                HubConnectivity: {
                    numPorts: 1
                },
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["engineerDept", "solarPanel"]
                },
                WorkingPlace: {
                    requiredSkills: 0
                },
                ProductivityCalculator: {},
                UserObject: {
                    maxHealthPoints: 10,
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
            buildTime: 10000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(mineralStorage);

        var liquidStorage = new ObjectType(gameData, {
            _id: "liquidStorage",
            blocks: {
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen"],
                    ressourceCapacity: [1000,1000]
                },
                FeatureManager: {},
                HubConnectivity: {
                    numPorts: 1
                },
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["engineerDept", "solarPanel"]
                },
                WorkingPlace: {
                    requiredSkills: 0
                },
                ProductivityCalculator: {},
                UserObject: {
                    maxHealthPoints: 10,
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
            buildTime: 40000
        });
        gameData.objectTypes.add(liquidStorage);

        var miningPlant = new ObjectType(gameData, {
            _id: "miningPlant",
            blocks: {
                ResourceManager: {
                    ressourceTypeIds: ["granulateMaterial","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [0, 0, 0, 0, 0, 0, 0]
                },
                FeatureManager: {},
                HubConnectivity: {
                    numPorts: 1
                },
                SoilPuller: {
                    ressourceTypeIds: ["iron","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceMaxInPerHour: [10000, 1000, 100, 10, 10, 10, 10]
                },
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["engineerDept", "solarPanel"]
                },
                WorkingPlace: {
                    requiredSkills: 0
                },
                ProductivityCalculator: {},
                UserObject: {
                    maxHealthPoints: 10,
                    points: 5
                }
            },
            className: "miningPlant",
            initWidth: 160,
            initHeight: 160,
            allowOnMapTypeId: "cityMapType01",
            name: "mining Plant",
            spritesheetId: "miningSprite",
            spriteFrame: 0,
            iconSpritesheetId: "miningSprite",
            iconSpriteFrame: 0,
            buildTime: 10000
        });
        gameData.objectTypes.add(miningPlant);

        var plantation1 = new ObjectType(gameData, {
            _id: "plantation1",
            blocks: {
                ResourceManager: {
                    ressourceTypeIds: ["oxygen"],
                    ressourceCapacity: [0]
                },
                FeatureManager: {},
                HubConnectivity: {
                    numPorts: 1
                },
                SoilPuller: {
                    ressourceTypeIds: ["oxygen"],
                    ressourceMaxInPerHour: [7200] // two per second
                },
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["engineerDept", "solarPanel"]
                },
                WorkingPlace: {
                    requiredSkills: 0
                },
                ProductivityCalculator: {},
                UserObject: {
                    maxHealthPoints: 10,
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
            buildTime: 10000
        });
        gameData.objectTypes.add(plantation1);

        var plantation2 = new ObjectType(gameData, {
            _id: "plantation2",
            blocks: {
                ResourceManager: {
                    ressourceTypeIds: ["oxygen","biomass","carbonFiber"],
                    ressourceCapacity: [30, 30, 100]
                },
                FeatureManager: {},
                SoilPuller: {
                    ressourceTypeIds: ["oxygen","biomass","carbonFiber"],
                    ressourceMaxInPerHour: [3600, 3600, 3600] // one per second
                },
                HubConnectivity: {
                    numPorts: 1
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
                    maxHealthPoints: 10,
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
            buildTime: 10000
        });
        gameData.objectTypes.add(plantation2);

        var defenseTower = new ObjectType(gameData, {
            _id: "defenseTower",
            blocks: {
                Tower: {},
                FeatureManager: {},
                HubConnectivity: {},
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["solarPanel"]
                },
                UserObject: {
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["granulateMaterial","carbonFiber"],
                    ressourceCapacity: [0, 0]
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
            buildTime: 5000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(defenseTower);

        var subObject = new ObjectType(gameData, {
            _id: "subObject",
            blocks: {
                Unit: {
                    itemTypeId: "unitItem1",
                    deployTime: 3000
                },
                FeatureManager: {},
                HubConnectivity: {},
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: []
                },
                UserObject: {
                    maxHealthPoints: 20,
                    points: 15
                },
                ResourceManager: {
                    ressourceTypeIds: ["granulateMaterial","carbonFiber"],
                    ressourceCapacity: [0, 0]
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
            buildTime: 5000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(subObject);

        gameData.itemTypes.add(new ItemType(gameData, {
            _id: "unitItem1",
            name: "excavator",
            className: "unitItem",
            blocks: {
                SubObject: {
                    mapObjTypeId: "subObject"
                },
                Movable: {
                    movementSpeed: 0.1,  // per sec
                    maxRange: 500,
                    movingUpTime: 3000,
                    movingDownTime: 5000
                },
                FeatureManager: {}
            },
            allowOnMapTypeId: "moonMap01",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 3,
            buildMenuTooltip: "this is awesome",
            transitionTime: [10000, 10000]

        }));


        var spacecraftUnitObject = new ObjectType(gameData, {
            _id: "spacecraftUnitObject01",
            blocks: {
                Unit: {},
                FeatureManager: {},
                HubConnectivity: {
                    numPorts: 1
                },
                UpgradeProduction: {
                    numSlots: 10,
                    itemTypeIds: ["solarPanel"]
                },
                UserObject: {
                    maxHealthPoints: 10,
                    points: 5
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000]
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
            buildTime: 5000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [500,300]
        });
        gameData.objectTypes.add(spacecraftUnitObject);

        var connection = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "connection",
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

        var planetConnection = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "planetConnection",
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

        var constructionSite = new ObjectType(gameData, {
            _id: "constructionSite",
            blocks: {
                ConstructionSite: {},
                HubConnectivity: {},
                UserObject: {
                    maxHealthPoints: 0,
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

        var dome = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "dome",
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
                },
                ResourceManager: {
                    ressourceTypeIds: ["hydrogen","oxygen","granulateMaterial","biomass","carbonFiber","silicon","copper","iron","titanium","iridium","palladium"],
                    ressourceCapacity: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000]
                }
            },
            className: "sublayer",
            initWidth: 80,
            initHeight: 80,
            allowOnMapTypeId: "moonMapType01",
            name: "City Dome",
            spritesheetId: 'moonSprite01',
            spriteFrame: 1,
            iconSpritesheetId: 'moonSprite01',
            iconSpriteFrame: 2,
            buildTime: 20000,
            requiredResourceIds:["granulateMaterial","carbonFiber"],
            requiredResourceAmount: [5000,3000]
        }));


        var sunPlanet = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "sunPlanet",
            blocks: {
                Environment: {}
            },
            className: "center",
            initWidth: 255,
            initHeight: 255,
            allowOnMapTypeId: "solarMapType01",
            name: "Sun",
            spritesheetId: 'planetSprite',
            spriteFrame: 4,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 4,
            buildTime: 20000
        }));

        var earthPlanet = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "earthPlanet",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 0,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 0,
            buildTime: 20000
        }));


        var marsPlanet = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "marsPlanet",
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
            spritesheetId: 'planetSprite',
            spriteFrame: 1,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 1,
            buildTime: 15000
        }));


        var moonPlanet = gameData.objectTypes.add(new ObjectType(gameData, {
            _id: "moonPlanet",
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
            name: "Moon",
            spritesheetId: 'planetSprite',
            spriteFrame: 2,
            iconSpritesheetId: 'planetSprite',
            iconSpriteFrame: 2,
            buildTime: 15000
        }));

    }

    exports.initGameTypesMapObjects = initGameTypesMapObjects;

})(node ? exports : window);