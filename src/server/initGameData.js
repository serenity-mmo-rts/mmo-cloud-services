var fs = require('fs');

eval(fs.readFileSync('../game/GameList.js') + '');
eval(fs.readFileSync('../game/GameData.js') + '');
eval(fs.readFileSync('../game/mapData.js') + '');
eval(fs.readFileSync('../game/MapType.js') + '');
eval(fs.readFileSync('../game/MapObject.js') + '');
eval(fs.readFileSync('../game/objectType.js') + '');
eval(fs.readFileSync('../game/Spritesheet.js') + '');
eval(fs.readFileSync('../game/User.js') + '');
eval(fs.readFileSync('../client/lib/QuadTree.js') + '');


var initGameData = new GameData();

initGameData.spritesheets.add(new Spritesheet({
    _id: 'forestSprite01',
    images: ["resources/forest.png"],
    frames: [
        // x, y, width, height, imageIndex, regX, regY
        [0,448,64,64,0,32,48],
        [64,448,64,64,0,32,48]
    ]
}));

initGameData.spritesheets.add(new Spritesheet({
    _id: 'cityBuildingsSprite01',
    images: ["resources/CityBuildings.png", "resources/CityBuildingsIcons.png"],
    frames: [
        // x, y, width, height, imageIndex, regX, regY

        //mapObjects
        [0,0,128,128,0,64,90],
        [128,0,128,128,0,60,90],
        [256,0,128,128,0,64,83],
        [0,128,192,192,0,96,146],
        [192,128,192,192,0,96,122],

        //icons:
        [0,0,32,32,1,0,0],
        [32,0,32,32,1,0,0],
        [64,0,32,32,1,0,0],
        [96,0,32,32,1,0,0],
        [128,0,32,32,1,0,0]
    ]
}));

initGameData.mapTypes.add(new MapType({
    _id: "cityMapType01",
    name: "City",
    scale: 1,
    ratioWidthHeight: 2,
    bgColor: 000000,
    groundImage: "resources/ground.png",
    groundImageScaling: 1
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "rock01",
    initWidth : 32,
    initHeight : 32,
    allowOnMapTypeId: "cityMapType01",
    name : "rock01",
    spritesheetId: "forestSprite01",
    spriteFrame: 0,
    spriteFrameIcon: 0
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "rock02",
    initWidth : 32,
    initHeight : 32,
    allowOnMapTypeId: "cityMapType01",
    name : "rock2",
    spritesheetId: "forestSprite01",
    spriteFrame: 1,
    spriteFrameIcon: 0
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "bakehouse",
    initWidth : 64,
    initHeight : 64,
    allowOnMapTypeId: "cityMapType01",
    name : "bakehouse",
    spritesheetId: "cityBuildingsSprite01",
    spriteFrame: 0,
    spriteFrameIcon: 5
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "burgerhouse",
    initWidth : 64,
    initHeight : 64,
    allowOnMapTypeId: "cityMapType01",
    name : "burgerhouse",
    spritesheetId: "cityBuildingsSprite01",
    spriteFrame: 1,
    spriteFrameIcon: 6
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "butcher",
    initWidth : 64,
    initHeight : 64,
    allowOnMapTypeId: "cityMapType01",
    name : "butcher",
    spritesheetId: "cityBuildingsSprite01",
    spriteFrame: 2,
    spriteFrameIcon: 7
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "bank",
    initWidth : 100,
    initHeight : 100,
    allowOnMapTypeId: "cityMapType01",
    name : "bank",
    spritesheetId: "cityBuildingsSprite01",
    spriteFrame: 3,
    spriteFrameIcon: 8
}));

initGameData.objectTypes.add(new ObjectType({
    _id: "factory",
    initWidth : 80,
    initHeight : 80,
    allowOnMapTypeId: "cityMapType01",
    name : "factory",
    spritesheetId: "cityBuildingsSprite01",
    spriteFrame: 4,
    spriteFrameIcon: 9
}));

// save build categories:
initGameData.mapTypes.hashList["cityMapType01"].buildCategories = [
    {name: 'Resources', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "factory"]},
    {name: 'Production', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "bank", "factory"]},
    {name: 'Military', objectTypeIds: ["bakehouse", "burgerhouse", "butcher", "bank", "factory"]}
];

initGameData.maps.add(new MapData({
    _id: "cityMap01",
    width: 1000,
    height: 1000,
    mapTypeId: "cityMapType01"
}));

// Now start adding example objects to our example cityMap01
var pointerToCityMap = initGameData.maps.hashList["cityMap01"];
var pointerToRock01 = initGameData.objectTypes.hashList["rock01"];
var pointerToRock02 = initGameData.objectTypes.hashList["rock02"];
var pointerToBakehouse = initGameData.objectTypes.hashList["Bakehouse"];
var pointerToBurgerhouse = initGameData.objectTypes.hashList["burgerhouse"];
var pointerToButcher = initGameData.objectTypes.hashList["butcher"];
var pointerToBank = initGameData.objectTypes.hashList["bank"];
var pointerToFactory = initGameData.objectTypes.hashList["factory"];
for(var i=1; i<50; i++) {
    pointerToCityMap.mapObjects.add(new MapObject({
        _id: "rock01inst"+i,
        mapId: pointerToCityMap._id,
        x: Math.floor((Math.random()-0.5) * (pointerToCityMap.width-pointerToRock01.initWidth/2)),
        y: Math.floor((Math.random()-0.5) * (pointerToCityMap.height-pointerToRock01.initHeight/2)),
        objTypeId: pointerToRock01._id,
        userId: 0
    }))
}
for(var i=1; i<50; i++) {
    pointerToCityMap.mapObjects.add(new MapObject({
        _id: "rock02inst"+i,
        mapId: pointerToCityMap._id,
        x: Math.floor((Math.random()-0.5) * (pointerToCityMap.width-pointerToRock02.initWidth/2)),
        y: Math.floor((Math.random()-0.5) * (pointerToCityMap.height-pointerToRock02.initHeight/2)),
        objTypeId: pointerToRock02._id,
        userId: 0
    }))
}
pointerToCityMap.mapObjects.add(new MapObject({
    _id: "factory01"+i,
    mapId: pointerToCityMap._id,
    x: 0,
    y: 0,
    objTypeId: pointerToFactory._id,
    userId: 0
}))

var gameVars = {
    rootMapId : "cityMap01"
}


exports.gameData = initGameData;
exports.gameVars = gameVars;
