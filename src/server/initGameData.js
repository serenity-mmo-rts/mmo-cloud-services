var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../game/GameData').GameData;
    var MapObject = require('../game/mapObjects/MapObject').MapObject;
    var MapType = require('../game/MapType').MapType;
    var ObjectType = require('../game/types/ObjectType').ObjectType;
    var RessourceType = require('../game/types/RessourceType').RessourceType;
    var TechnologyType = require('../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../game/types/ItemType').ItemType;
    var UnitType = require('../game/types/UnitType').UnitType;
    var UpgradeType = require('../game/types/UpgradeType').UpgradeType;
    var Spritesheet = require('../game/Spritesheet').Spritesheet;
    var MapData = require('../game/MapData').MapData;
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
        _initWidth: 10,
        _initHeight: 10,
        _allowOnMapTypeId: "moonMapType01",
        _name: "crater01",
        _spritesheetId: moonSprite._id,
        _spriteFrame: 0,
        _iconSpritesheetId: moonSprite._id,
        _iconSpriteFrame: 0

    })
    gameData.objectTypes.add(crater01);

    var rock01 = new ObjectType(gameData,{
        _id: "rock01",
        _initWidth: 12,
        _initHeight: 12,
        _allowOnMapTypeId: "cityMapType01",
        _name: "rock01",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 0,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0
    })
    gameData.objectTypes.add(rock01);

    var rock02 = new ObjectType(gameData,{
        _id: "rock02",
        _initWidth: 12,
        _initHeight: 12,
        _allowOnMapTypeId: "cityMapType01",
        _name: "rock2",
        _spritesheetId: "forestSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "forestSprite01",
        _iconSpriteFrame: 0
    });
    gameData.objectTypes.add(rock02);

    var bakehouse = new ObjectType(gameData,{
        _id: "bakehouse",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "bakehouse",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 0,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 6
    })
    gameData.objectTypes.add(bakehouse);

    var burgerhouse = new ObjectType(gameData,{
        _id: "burgerhouse",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "burgerhouse",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 1,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 7
    });
    gameData.objectTypes.add(burgerhouse);

    var butcher = new ObjectType(gameData,{
        _id: "butcher",
        _initWidth: 36,
        _initHeight: 36,
        _allowOnMapTypeId: "cityMapType01",
        _name: "butcher",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 2,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 8
    });
    gameData.objectTypes.add(butcher);

    var bank = new ObjectType(gameData,{
        _id: "bank",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "bank",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 4,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 9
    });
    gameData.objectTypes.add(bank);

    var factory = new ObjectType(gameData,{
        _id: "factory",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "factory",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 5,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 10
    });
    gameData.objectTypes.add(factory);

    var constructionSite = new ObjectType(gameData,{
        _id: "constructionSite",
        _initWidth: 48,
        _initHeight: 48,
        _allowOnMapTypeId: "cityMapType01",
        _name: "constructionSite",
        _spritesheetId: "cityBuildingsSprite01",
        _spriteFrame: 3,
        _iconSpritesheetId: "cityBuildingsSprite01",
        _iconSpriteFrame: 10
    });
    gameData.objectTypes.add(constructionSite);

    var dome = gameData.objectTypes.add(new ObjectType(gameData,{
        _id: "dome",
        _initWidth: 80,
        _initHeight: 80,
        _allowOnMapTypeId: "moonMapType01",
        _name: "dome",
        _spritesheetId: moonSprite._id,
        _spriteFrame: 1,
        _iconSpritesheetId: moonSprite._id,
        _iconSpriteFrame: 2
    }));

    var carbon = new RessourceType(gameData,{
        //_type: "RessourceType",
        _id: "12345",
        _name: "carbon",
        //rendering
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4,
        _buildMenuTooltip:"carbon is great"

    });
    gameData.ressourceTypes.add(carbon);

    gameData.technologyTypes.add(new TechnologyType(gameData,{
        _id: "wormholeTech",
        _name: "Wormhole Technology",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4

    }));

    gameData.unitTypes.add(new UnitType(gameData,{
        _id: "hackerUnit",
        _name: "Hacker",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame : 4

    }));

    gameData.itemTypes.add(new ItemType(gameData,{
        _id: "railgun",
        _name: "Railgun",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4

    }));

    gameData.upgradeTypes.add(new UpgradeType(gameData,{
        _id: "towerItem",
        _name: "Tower",
        _iconSpritesheetId: "ressourceSprite01",
        _iconSpriteFrame: 4

    }));


// save build categories:
    gameData.mapTypes.get("cityMapType01")._buildCategories = [
        {name: 'Resources', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "factory"]},
        {name: 'Production', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "bank", "factory"]},
        {name: 'Military', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "bank", "factory"]}
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
    cityMap.mapObjects.add(new MapObject(gameData,{
        _id: "factory01" + i,
        mapId: cityMap._id,
        x: 0,
        y: 0,
        objTypeId: factory._id,
        userId: 0
    }));

    var gameVars = {
        rootMapId: cityMap._id
    }

    exports.gameData = gameData;
    exports.gameVars = gameVars;

})(node ? exports : window);
