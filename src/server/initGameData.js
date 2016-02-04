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

    var storageSprite = new Spritesheet(gameData,{
        _id: 'storageSprite',
        images: ["resources/objects/mineralStorage.png", "resources/objects/mineralStorageIcon.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 0, 192, 173, 0, 96, 61],
            [0, 0, 48, 48, 1, 0, 0]
        ]
    })
    gameData.spritesheets.add(storageSprite);

    var objectsSprite = new Spritesheet(gameData,{
        _id: 'objectsSprite',
        images: ["resources/objects/defenseTower.png", "resources/objects/defenseTowerIcon.png","resources/objects/furnitureFactory.png", "resources/objects/furnitureFactoryIcon.png","resources/objects/spacecraft.png", "resources/objects/spacecraftIcon.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY
            [0, 0, 250, 215, 0, 125, 80],
            [0, 0, 48, 48, 1, 0, 0],

            [0, 0, 192, 160, 2, 125, 80],
            [0, 0, 48, 48, 3, 0, 0],

            [0, 0, 200, 146, 4, 100, 70],
            [0, 0, 48, 48, 5, 0, 0]
        ]
    })
    gameData.spritesheets.add(objectsSprite);


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
            Environment: {

            }

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
            Environment: {

            }
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
            Environment: {

            }
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
            HubConnectivity: {
                _numPorts:  1
            },
            ResourceProduction: {
                _typeId: [],
                _perSec: []
            },
            EnergyManager: {
                _requiredPerSec:  0,
                _availablePerSec: 0
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["engineerDept","solarPanel"]
            },
            FeatureManager: {

            },
            WorkingPlace: {
                _requiredSkills:  null,
                _availableSkills: null,
                _hiredHumans: null
            },
            ProductivityCalculator: {

            },
            UserObject: {

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

    var hub = new ObjectType(gameData,{
        _id: "Hub",
        _blocks: {

            HubNode: {
                _maxRange: 1000,
                _connBuildTimePerDist: 1
            },
            HubConnectivity: {
                _numPorts:  5
            },
            EnergyManager: {
                _requiredPerSec:  0,
                _availablePerSec: 0
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: []
            },
            FeatureManager: {

            },
            WorkingPlace: {
                _requiredSkills:  null,
                _availableSkills: null,
                _hiredHumans: null
            },
            ProductivityCalculator: {

            },
            UserObject: {

            }
        },
        _className: "hub",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Small Hub",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 7,
        _buildTime: 12000
    });
    gameData.objectTypes.add(hub);

    var sciencecenter = new ObjectType(gameData,{
        _id: "ScienceCenter",
        _blocks: {
            TechProduction: {
                _techInResearchId: null
            },
            HubConnectivity: {
                _numPorts:  1
            },
            EnergyManager: {
                _requiredPerSec: 0,
                _availablePerSec: 0
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: []
            },
            FeatureManager: {

            },
            WorkingPlace: {
                _requiredSkills: null,
                _availableSkills: null,
                _hiredHumans: null
            },
            ProductivityCalculator: {

            },
            UserObject: {

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
            ResourceProduction: {
                _typeId: [],
                _perSec: []
            },
            HubConnectivity: {
                _numPorts:  1
            },
            EnergyManager: {
                _requiredPerSec:  0,
                _availablePerSec: 0
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["engineerDept","solarPanel"]
            },
            FeatureManager: {

            },
            WorkingPlace: {
                _requiredSkills:  null,
                _availableSkills: null,
                _hiredHumans: null
            },
            ProductivityCalculator: {

            },
            UserObject: {

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
            ResourceStorage: {

            },
            HubConnectivity: {
                _numPorts:  1
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["engineerDept","solarPanel"]
            },
            WorkingPlace: {
                _requiredSkills:  null,
                _availableSkills: null,
                _hiredHumans: null
            },
            ProductivityCalculator: {

            },
            UserObject: {

            }

        },
        _className: "storage",
        _initWidth: 100,
        _initHeight: 100,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Mineral Storage",
        _spritesheetId: "storageSprite",
        _spriteFrame: 0,
        _iconSpritesheetId: "storageSprite",
        _iconSpriteFrame: 1,
        _buildTime: 1000
    });
    gameData.objectTypes.add(mineralStorage);

    var defenseTower = new ObjectType(gameData,{
        _id: "defenseTower",
        _blocks: {
            Tower: {

            },
            HubConnectivity: {
                _numPorts:  1
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["solarPanel"]
            },
            UserObject: {

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

            Unit: {

            },
            HubConnectivity: {
                _numPorts:  1
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["solarPanel"]
            },
            UserObject: {

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
            Connection: {

            }
        },
        _className: "connection",
        _initWidth: 80,
        _initHeight: 80,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Connection",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0,
        _buildTime: 0
    }));

    var constructionSite = new ObjectType(gameData,{
        _id: "constructionSite",
        _blocks: {
            ConstructionSite: {

            },
            HubConnectivity: {
                _numPorts:  1
            },
            UserObject: {

            },
            UpgradeProduction: {
                _freeSlotsAvailable: 0,
                _itemIds: []
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
            Sublayer: {

            },
            HubNode: {
                _maxRange: 1000,
                _connBuildTimePerDist: 1
            },
            HubConnectivity: {
                _numPorts:  5
            },
            UserObject: {

            },
            UpgradeProduction: {
                _freeSlotsAvailable: 0,
                _itemIds: []
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
        _name: "Engineering DEpartment",
        _className: "ProductivityUpgrade",
        _blocks: {
            Feature: [
                [{getParentObj: {}},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.1", "1"]
                    }
                    }],
                [{getParentObj: {}},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }],
                [{getParentObj: {}},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }],
                [{getParentObj: {}},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }],
                [{getParentObj: {}},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }]
            ]
        },
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 0,
        _buildMenuTooltip: "this is awesome",
        _maxLevel: 5,
        _buildTime: [10000,20000,30000,40000,50000]

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "solarPanel",
        _name: "Solar Panels",
        _className: "ProductivityUpgrade",
        _blocks: {
            Feature: [
                [{getObjInRange: 100},
                {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.1", "1"]
                    }
                }],
                [{getObjInRange: 200},
                {AddToProp: {
                    vars: ["_maxHealthPoints", "_points"],
                    blocks: ["UserObject", "UserObject"],
                    operator: ["plus", "plus"],
                    values: ["0.2", "3"]
                }
                }],
                [{getObjInRange: 200},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }],
                [{getObjInRange: 200},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }],
                [{getObjInRange: 200},
                    {AddToProp: {
                        vars: ["_maxHealthPoints", "_points"],
                        blocks: ["UserObject", "UserObject"],
                        operator: ["plus", "plus"],
                        values: ["0.2", "3"]
                    }
                    }]
            ]
        },
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 0,
        _buildMenuTooltip: "this is even better",
        _maxLevel: 5,
        _buildTime: [10000,20000,30000,40000,50000]

    }));



// save build categories:
    gameData.layerTypes.get("cityMapType01")._buildCategories = [
        {name: 'Resources', objectTypeIds: ["Hub", "mineralStorage"]},
        {name: 'Production', objectTypeIds: ["Factory1", "furnitureFactory"]},
        {name: 'Military', objectTypeIds: ["ScienceCenter", "defenseTower"]}
    ];

    // save build categories:
    gameData.layerTypes.get("moonMapType01")._buildCategories = [
        {name: 'Habitat', objectTypeIds: ["dome", "spacecraftUnitObject01"]}
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
    moonMap.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "firstCity",
        mapId: moonMap._id,
        x: 0,
        y: 0,
        objTypeId: "dome",
        userId: 0,
        _blocks: {
            Sublayer: {
                _subLayerMapId: "cityMap01"
            }
        }
    }));
    moonMap.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "secondCity",
        mapId: moonMap._id,
        x: 300,
        y: 0,
        objTypeId: "dome",
        userId: 0,
        _blocks: {
            Sublayer: {
                _subLayerMapId: "cityMap02"
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
