var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../game/GameData').GameData;
    var MapObject = require('../game/mapObjects/MapObject').MapObject;
    var createMapObject = require('../game/mapObjects/createMapObject').createMapObject;
    var MapType = require('../game/MapType').MapType;
    var ObjectType = require('../game/types/ObjectType').ObjectType;
    var RessourceType = require('../game/types/RessourceType').RessourceType;
    var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../game/types/ItemType').ItemType;
    var FeatureType = require('../game/types/FeatureType').FeatureType;
    var ModelSublayer = require('../game/mapObjects/ModelSublayer').ModelSublayer;
    var ModelFactory = require('../game/mapObjects/ModelFactory').ModelFactory;
    var Spritesheet = require('../game/Spritesheet').Spritesheet;
    var MapData = require('../game/MapData').MapData;
    var User = require('../game/User').User;
    var AdditiveFeature = require('../game/features/AdditiveFeature').AdditiveFeature;
    var MultiplierFeature = require('../game/features/MultiplierFeature').MultiplierFeature;
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



    var cityMapType = new MapType(gameData,{
        _id: "cityMapType01",
        _name: "City",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/ground.png",
        _groundImageScaling: 1
    })
    gameData.mapTypes.add(cityMapType);

    var moonMapType = new MapType(gameData,{
        _id: "moonMapType01",
        _name: "Moon",
        _scale: 1,
        _ratioWidthHeight: 2,
        _bgColor: 000000,
        _groundImage: "resources/moonGround.png",
        _groundImageScaling: 1
    })
    gameData.mapTypes.add(moonMapType);

    var crater01 = new ObjectType(gameData,{
        _id: "crater01",
        _className: "MapObject",
        _initWidth: 10,
        _initHeight: 10,
        _allowOnMapTypeId: "moonMapType01",
        _name: "crater01",
        _spritesheetId: moonSprite._id,
        _spriteFrame: 0,
        _iconSpritesheetId: moonSprite._id,
        _iconSpriteFrame: 0,
        _buildTime: 0,
        _initProperties: {
            _points:  0,
            _maxHealthPoints: 0,
            _itemIds: []
        }
    })
    gameData.objectTypes.add(crater01);

    var rock01 = new ObjectType(gameData,{
        _id: "rock01",
        _className: "MapObject",
        _initWidth: 12,
        _initHeight: 12,
        _allowOnMapTypeId: "cityMapType01",
        _name: "rock01",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 0,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0,
        _buildTime: 0,
        _initProperties: {
            _points:  0,
            _maxHealthPoints: 0,
            _itemIds: []
        }

    })
    gameData.objectTypes.add(rock01);

    var rock02 = new ObjectType(gameData,{
        _id: "rock02",
        _className: "MapObject",
        _initWidth: 12,
        _initHeight: 12,
        _allowOnMapTypeId: "cityMapType01",
        _name: "rock2",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0,
        _buildTime: 0,
        _initProperties: {
            _points:  0,
            _maxHealthPoints: 0,
            _itemIds: []
        }
    });
    gameData.objectTypes.add(rock02);

    var factory = new ObjectType(gameData,{
        _id: "Factory1",
        _className: "Factory",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Mining Factory",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 0,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 6,
        _buildTime: 20000,
        _initProperties: {
            _points:  5,
            _maxHealthPoints: 100,
            _itemIds: ["LaserTrooper"]
        }
    })
    gameData.objectTypes.add(factory);

    var hub = new ObjectType(gameData,{
        _id: "Hub",
        _className: "Hub",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Small Hub",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 7,
        _buildTime: 120000,
        _initProperties: {
            _points:  5,
            _maxHealthPoints: 100,
            _itemIds: ["LaserTrooper"]
        }
    });
    gameData.objectTypes.add(hub);

    var sciencecenter = new ObjectType(gameData,{
        _id: "ScienceCenter",
        _className: "ScienceCenter",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Military Research Facility",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 2,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 8,
        _buildTime: 10000,
        _initProperties: {
            _points:  5,
            _maxHealthPoints: 100,
            _itemIds: ["LaserTrooper"]
        }
    });
    gameData.objectTypes.add(sciencecenter);

    var factory2 = new ObjectType(gameData,{
        _id: "Factory2",
        _className: "Factory",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Furniture Factory",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 4,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 9,
        _buildTime: 1000,
        _initProperties: {
            _points:  5,
            _maxHealthPoints: 100,
            _itemIds: ["LaserTrooper"]
        }
    });
    gameData.objectTypes.add(factory2);

    var unitfactory = new ObjectType(gameData,{
        _id: "UnitFactory",
        _className: "UnitFactory",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "Unit Factory",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 5,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 10,
        _buildTime: 2000,
        _initProperties: {
            _points:  5,
            _maxHealthPoints: 100,
            _itemIds: ["LaserTrooper"]
        }
    });
    gameData.objectTypes.add(unitfactory);

    var constructionSite = new ObjectType(gameData,{
        _id: "constructionSite",
        _className: "constructionSite",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "constructionSite",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 3,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 10,
        _buildTime: 0,
        _initProperties: {
            _points:  5,
            _maxHealthPoints: 100,
            _itemIds: ["LaserTrooper"]
        }
    });
    gameData.objectTypes.add(constructionSite);

    var dome = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "dome",
        _className: "Sublayer",
        _initWidth: 80,
        _initHeight: 80,
        _allowOnMapTypeId: "moonMapType01",
        _name: "City Dome",
        _spritesheetId: moonSprite._id,
        _spriteFrame: 1,
        _iconSpritesheetId: moonSprite._id,
        _iconSpriteFrame: 2,
        _buildTime: 2000,

        _initProperties: {
          _points:  5,
          _maxHealthPoints: 100,
          _itemIds: ["LaserTrooper"]
        }


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

    gameData.technologyTypes.add(new TechnologyType(gameData,{
        _id: "wormholeTech",
        _name: "Wormhole Technology",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4,
        _buildTime: 2000
    }));



    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "LaserTrooper",
        _name: "LaserTrooper",
        _className: "FootUnit",
        _allowOnMapTypeId: "moonMap01",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4,
        _buildMenuTooltip: "this is awesome",
        _canMove: true,
        _canFight: true,
        _maxLevel: 5,
        _initProperties: {
                            _requiredItemIds: [null,null,null,null,null], // most specific requirements go here
                            _requiredTechnologies: [null,null,null,null,null],
                            _requiredRessources: [null,null,null,null,null],
                            _requiredMapObjectLvl: [1,1,2,2,2], // might not be so important
                            _points: [1,2,5,8,12],
                            _buildTime: [20000,5000,20000,80000,200000],
                            _maxHealthPoints: [10,20,40,70,100],
                            _maxArmor: [5,8,15,25,40],
                            _attackPoints: [2,5,9,14,20],
                            _defensePoints: [4,7,15,25,40],
                            _attackSpeed: [10,15,20,25,30],
                            _runningSpeed: [5,5,5,5,5],
                            _range: [10,10,10,10,10]
        },
        _featureTypeIds: [["FeatureId","FeatureId2"],["FeatureId","FeatureId2"],["FeatureId","FeatureId2"],["FeatureId","FeatureId2"],["FeatureId","FeatureId2"]]

    }));


    gameData.featureTypes.add(new FeatureType(gameData,{
        _id: "FeatureId",
        _name: "Dummy Add Feature ",
        _appliedOn: "Object",
        _infinite: true,
        _canBeActivated: false,
        _canBeDepleted: false,
        _canSelect: false,
        _canRecharge: false,
        _NumberOfSelections : 1,
        _range: 0, // 0 = effect only in current map object or on current current map
        _objectSelectionRadius: 0, // 0 = cannot select objects between objects
        _activationTime: 0, // 0 = infinite (activated directly)
        _effects: [new AdditiveFeature(gameData,{_key: "_productionSpeed",_value: 0.1,_modus: 1}),new AdditiveFeature(gameData,{_key: "_productionSpeed",_value: 0.1,_modus: 1})]
    }));

    gameData.featureTypes.add(new FeatureType(gameData,{
        _id: "FeatureId2",
        _name: "Dummy Multi Feature ",
        _appliedOn: "Object", // Object, Item, Coordinate, User
        _infinite: true,
        _canBeActivated: false,
        _canBeDepleted: false,
        _canSelect: false,
        _canRecharge: false,
        __NumberOfSelections : 1,
        _range: 0, // 0 = effect only in current map object or on current current map
        _objectSelectionRadius: 0, // 0 = cannot select objects between objects
        _activationTime: 0, // 0 = infinite (activated directly)
        _effects: [new MultiplierFeature(gameData,{_key: "_productionSpeed",_value: 1.5,_modus: 1}),new MultiplierFeature(gameData,{_key: "_productionSpeed",_value: 1.5,_modus: 1})]

    }));

// save build categories:
    gameData.mapTypes.get("cityMapType01")._buildCategories = [
        {name: 'Resources', objectTypeIds: ["UnitFactory", "Hub", "ScienceCenter", "Factory1","Factory2"]},
        {name: 'Production', objectTypeIds: ["UnitFactory", "Hub", "ScienceCenter", "Factory1","Factory2"]},
        {name: 'Military', objectTypeIds: ["UnitFactory", "Hub", "ScienceCenter", "Factory1","Factory2"]}
    ];

    // save build categories:
    gameData.mapTypes.get("moonMapType01")._buildCategories = [
        {name: 'Habitat', objectTypeIds: ["dome"]}
    ];

    var moonMap = new MapData(gameData,{
        _id: "moonMap01",
        width: 20000,              // pixelsize / 4
        height: 20000,             // pixelsize / 2
        mapTypeId: "moonMapType01",
        gameData: gameData
    });
    gameData.maps.add(moonMap);

    var cityMap = new MapData(gameData,{
        _id: "cityMap01",
        width: 10000,
        height: 10000,
        mapTypeId: "cityMapType01",
        parentMapId: "moonMap01",
        gameData: gameData
    });
    gameData.maps.add(cityMap);


    for (var i = 1; i < 2000; i++) {
        moonMap.mapObjects.add(new MapObject(gameData,{
            _id: "crater01inst" + i,
            mapId: moonMap._id,
            x: Math.floor((Math.random() - 0.5) * (moonMap.width - crater01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (moonMap.height - crater01._initHeight / 2)),
            objTypeId: crater01._id,
            userId: 0
        }));
    }

    moonMap.mapObjects.add(new ModelSublayer(gameData,{
        _id: "firstCity",
        mapId: moonMap._id,
        x: 0,
        y: 0,
        objTypeId: "dome",
        userId: 0,
        sublayerMapId: "cityMap01"
    }));

// Now start adding example objects to our example cityMap01
    for (var i = 1; i < 500; i++) {
        cityMap.mapObjects.add(new MapObject(gameData,{
            _id: "rock01inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock01._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock01._initHeight / 2)),
            objTypeId: rock01._id,
            userId: 0
        }));
    }
    for (var i = 1; i < 500; i++) {
        cityMap.mapObjects.add(new MapObject(gameData,{
            _id: "rock02inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock02._initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock02._initHeight / 2)),
            objTypeId: rock02._id,
            userId: 0
        }));
    }
    // Add Start Building
    cityMap.mapObjects.add(new ModelFactory(gameData,{
        _id: "factory01",
        mapId: cityMap._id,
        x: 0,
        y: 0,
        objTypeId: factory._id,
        userId: 0
    }));

    var gameVars = {
        rootMapId: moonMap._id
    }

    exports.gameData = gameData;
    exports.gameVars = gameVars;

})(node ? exports : window);
