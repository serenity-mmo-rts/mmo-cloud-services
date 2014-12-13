var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../game/GameData').GameData;
    var MapObject = require('../game/MapObject').MapObject;
    var MapType = require('../game/MapType').MapType;
    var ObjectType = require('../game/ObjectType').ObjectType;
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

    var citySprite = new Spritesheet(gameData,{
        _id: 'cityBuildingsSprite01',
        images: ["resources/CityBuildings.png", "resources/CityBuildingsIcons.png"],
        frames: [
            // x, y, width, height, imageIndex, regX, regY

            //mapObjects
            [0, 0, 128, 128, 0, 64, 90],
            [128, 0, 128, 128, 0, 60, 90],
            [256, 0, 128, 128, 0, 64, 83],
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

    var cityMapType = new MapType(gameData,{
        _id: "cityMapType01",
        name: "City",
        scale: 1,
        ratioWidthHeight: 2,
        bgColor: 000000,
        groundImage: "resources/ground.png",
        groundImageScaling: 1
    })
    gameData.mapTypes.add(cityMapType);

    var rock01 = new ObjectType(gameData,{
        _id: "rock01",
        initWidth: 32,
        initHeight: 32,
        allowOnMapTypeId: "cityMapType01",
        name: "rock01",
        spritesheetId: "forestSprite01",
        spriteFrame: 0,
        spriteFrameIcon: 0
    })
    gameData.objectTypes.add(rock01);

    var rock02 = new ObjectType(gameData,{
        _id: "rock02",
        initWidth: 32,
        initHeight: 32,
        allowOnMapTypeId: "cityMapType01",
        name: "rock2",
        spritesheetId: "forestSprite01",
        spriteFrame: 1,
        spriteFrameIcon: 0
    });
    gameData.objectTypes.add(rock02);

    var bakehouse = new ObjectType(gameData,{
        _id: "bakehouse",
        initWidth: 64,
        initHeight: 64,
        allowOnMapTypeId: "cityMapType01",
        name: "bakehouse",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 0,
        spriteFrameIcon: 5
    })
    gameData.objectTypes.add(bakehouse);

    var burgerhouse = new ObjectType(gameData,{
        _id: "burgerhouse",
        initWidth: 64,
        initHeight: 64,
        allowOnMapTypeId: "cityMapType01",
        name: "burgerhouse",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 1,
        spriteFrameIcon: 6
    });
    gameData.objectTypes.add(burgerhouse);

    var butcher = new ObjectType(gameData,{
        _id: "butcher",
        initWidth: 64,
        initHeight: 64,
        allowOnMapTypeId: "cityMapType01",
        name: "butcher",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 2,
        spriteFrameIcon: 7
    });
    gameData.objectTypes.add(butcher);

    var bank = new ObjectType(gameData,{
        _id: "bank",
        initWidth: 100,
        initHeight: 100,
        allowOnMapTypeId: "cityMapType01",
        name: "bank",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 3,
        spriteFrameIcon: 8
    });
    gameData.objectTypes.add(bank);

    var factory = new ObjectType(gameData,{
        _id: "factory",
        initWidth: 80,
        initHeight: 80,
        allowOnMapTypeId: "cityMapType01",
        name: "factory",
        spritesheetId: "cityBuildingsSprite01",
        spriteFrame: 4,
        spriteFrameIcon: 9
    });
    gameData.objectTypes.add(factory);

// save build categories:
    gameData.mapTypes.get("cityMapType01").buildCategories = [
        {name: 'Resources', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "factory"]},
        {name: 'Production', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "bank", "factory"]},
        {name: 'Military', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "bank", "factory"]}
    ];

    var cityMap = new MapData(gameData,{
        _id: "cityMap01",
        width: 1000,
        height: 1000,
        mapTypeId: "cityMapType01",
        gameData: gameData
    });
    gameData.maps.add(cityMap);

// Now start adding example objects to our example cityMap01
    for (var i = 1; i < 50; i++) {
        cityMap.mapObjects.add(new MapObject(gameData,{
            _id: "rock01inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock01.initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock01.initHeight / 2)),
            objTypeId: rock01._id,
            userId: 0
        }));
    }
    for (var i = 1; i < 50; i++) {
        cityMap.mapObjects.add(new MapObject(gameData,{
            _id: "rock02inst" + i,
            mapId: cityMap._id,
            x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock02.initWidth / 2)),
            y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock02.initHeight / 2)),
            objTypeId: rock02._id,
            userId: 0
        }));
    }
    cityMap.mapObjects.add(new MapObject(gameData,{
        _id: "factory01" + i,
        mapId: cityMap._id,
        x: 0,
        y: 0,
        objTypeId: factory._id,
        userId: 0
    }));

    var gameVars = {
        rootMapId: "cityMap01"
    }

    exports.gameData = gameData;
    exports.gameVars = gameVars;

})(node ? exports : window);