var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../game/GameData').GameData;
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
        _buildingBlocks: {
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
        _buildingBlocks: {
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
        _buildingBlocks: {
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
        _buildingBlocks: {
            ResourcePuller: {
                _typeId:  [],
                _perSec:  []
            },
            ResourcePusher: {
                _typeId:  [],
                _perSec:  []
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
        _buildingBlocks: {

            HubNode: {
                _freeConnections:  0,
                _connectedObjectIds: null
            },
            EnergyManager: {
                _requiredPerSec:  0,
                _availablePerSec: 0
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["warehouseSpace"]
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
        _buildTime: 120000
    });
    gameData.objectTypes.add(hub);

    var sciencecenter = new ObjectType(gameData,{
        _id: "ScienceCenter",
        _buildingBlocks: {
            TechProduction: {
                _techInResearchId: null
            },
            EnergyManager: {
                _requiredPerSec: 0,
                _availablePerSec: 0
            },
            UpgradeProduction: {
                _freeSlotsAvailable: 10,
                _itemIds: ["telescope"]
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

    var factory2 = new ObjectType(gameData,{
        _id: "Factory2",
        _buildingBlocks: {
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
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 4,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 9,
        _buildTime: 1000
    });
    gameData.objectTypes.add(factory2);

    var constructionSite = new ObjectType(gameData,{
        _id: "constructionSite",
        _buildingBlocks: {
            ConstructionSite: {

            },
            UserObject: {

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
        _buildingBlocks: {
            Sublayer: {

            },
            UserObject: {

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
        _buildTime: 2000,
        _initProperties: {}
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
        _id: "healthUpgrade",
        _name: "healthUpgrade",
        _className: "ProductivityUpgrade",
        _buildingBlocks: {
            Feature: {
                command: [["getParentObj, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,0.1},{UserObject,plus,1}}"],
                         ["getParentObj, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,0.2},{UserObject,plus,2}}"],
                         ["getParentObj, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,0.3},{UserObject,plus,3}}"],
                         ["getParentObj, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,1},{UserObject,plus,5}}"],
                         ["getParentObj, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,2},{UserObject,plus,10}}"]]
            }
        },
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 0,
        _buildMenuTooltip: "this is awesome",
        _maxLevel: 5,
        _buildTime: [1000,2000,3000,4000,5000]

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "healthRangeUpgrade",
        _name: "healthRangeUpgrade",
        _className: "ProductivityUpgrade",
        _buildingBlocks: {
            Feature: {
                command: [["getObjInRange {100}, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,0.1},{UserObject,plus,3}}"],
                    ["getObjInRange {150}, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,0.2},{UserObject,plus,5}}"],
                    ["getObjInRange {200}, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,0.4},{UserObject,plus,10}}"],
                    ["getObjInRange {300}, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,1},{UserObject,plus,20}}"],
                    ["getObjInRange {500}, AddToProp, {_maxHealthPoints,_points} {{UserObject,plus,2},{UserObject,plus,50}}"]]
            }
        },
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 0,
        _buildMenuTooltip: "this is even better",
        _maxLevel: 5,
        _buildTime: [1000,2000,3000,4000,5000]

    }));


// save build categories:
    gameData.layerTypes.get("cityMapType01")._buildCategories = [
        {name: 'Resources', objectTypeIds: ["UnitFactory", "Hub", "ScienceCenter", "Factory1","Factory2"]},
        {name: 'Production', objectTypeIds: ["UnitFactory", "Hub", "ScienceCenter", "Factory1","Factory2"]},
        {name: 'Military', objectTypeIds: ["UnitFactory", "Hub", "ScienceCenter", "Factory1","Factory2"]}
    ];

    // save build categories:
    gameData.layerTypes.get("moonMapType01")._buildCategories = [
        {name: 'Habitat', objectTypeIds: ["dome"]}
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

// Map Objects
    moonMap.mapData.mapObjects.add(new MapObject(gameData,{
        _id: "firstCity",
        mapId: moonMap._id,
        x: 0,
        y: 0,
        objTypeId: "dome",
        userId: 0,
        sublayerMapId: "cityMap01"
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
        _id: "factory01",
        mapId: cityMap._id,
        x: 0,
        y: 0,
        objTypeId: "Factory2",
        userId: 0
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
