var node = !(typeof exports === 'undefined');
if (node) {
    var GameData = require('../../game/GameData').GameData;
    var State = require('../../game/AbstractBlock').State;
    var MapObject = require('../../game/MapObject').MapObject;
    var LayerType = require('../../game/types/LayerType').LayerType;
    var ObjectType = require('../../game/types/objectType').ObjectType;
    var RessourceType = require('../../game/types/ResourceType').RessourceType;
    var TechnologyType = require('../../game/types/TechnologyType').TechnologyType;
    var ItemType = require('../../game/types/ItemType').ItemType;
    var UserType = require('../../game/types/userType').UserType;
    var Spritesheet = require('../../game/Spritesheet').Spritesheet;
    var Layer = require('../../game/Layer').Layer;
    var User = require('../../game/User').User;

}

(function (exports) {

    function initGameInstances(gameData) {

        var galaxyMap = new Layer(gameData.layers,{
            _id: "galaxyMap01",
            parentObjId: null,
            width: 5000,              // pixelsize / 4
            height: 5000,             // pixelsize / 2
            mapTypeId: "galaxyMapType01",
            parentMapId: null,
            mapGeneratorParams: []

        });
        gameData.layers.add(galaxyMap);


        var solarMap = new Layer(gameData.layers,{
            _id: "solarMap01",
            parentObjId: "solarSystem01",
            width: 20000,              // pixelsize / 4
            height: 20000,             // pixelsize / 2
            mapTypeId: "solarMapType01",
            parentMapId: "galaxyMap01",
            mapGeneratorParams: [0.5,5500,40,6,13,5] // subLayerSeed,starTemperature,starSize,planetAmount,planetSizeMean,planetSizeStd
        });
        gameData.layers.add(solarMap);


        var moonMap = new Layer(gameData.layers,{
            _id: "moonMap01",
            parentObjId: "firstPlanet",
            width: 20000,              // pixelsize / 4
            height: 20000,             // pixelsize / 2
            mapTypeId: "moonMapType01",
            parentMapId: "solarMap01",
            mapGeneratorParams: [2,10000,14,2,50,20]  // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
        });
        gameData.layers.add(moonMap);


        var moonMap2 = new Layer(gameData.layers,{
            _id: "moonMap02",
            parentObjId: "secondPlanet",
            width: 20000,              // pixelsize / 4
            height: 20000,             // pixelsize / 2
            mapTypeId: "moonMapType01",
            parentMapId: "solarMap01",
            mapGeneratorParams: [1,10000,15,2,50,20] // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
        });
        gameData.layers.add(moonMap2);

        var cityMap = new Layer(gameData.layers,{
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
        cityMap.currentTime = Date.now();

        var cityMap2 = new Layer(gameData.layers,{
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
        cityMap2.currentTime = Date.now();

// Sublayer Map Objects
        var sun = new MapObject(solarMap.mapData.mapObjects,{
            _id: "sun01",
            objTypeId: "sunPlanet",
            sublayerId: null,
            mapId: solarMap._id(),
            userId: 0,
            x: 0,
            y: 0
        });
        solarMap.mapData.mapObjects.add(sun);

        var planet1 = new MapObject(solarMap.mapData.mapObjects,{
            _id: "firstPlanet",
            objTypeId: "earthPlanet",
            sublayerId: "moonMap01",
            mapId: solarMap._id(),
            userId: 0,
            x: 1500,
            y: 0
        });
        solarMap.mapData.mapObjects.add(planet1);

        var planet2 = new MapObject(solarMap.mapData.mapObjects,{
            _id: "secondPlanet",
            objTypeId: "marsPlanet",
            sublayerId: "moonMap02",
            mapId: solarMap._id(),
            userId: 0,
            x: -1500,
            y: 1500
        });
        solarMap.mapData.mapObjects.add(planet2);

        var city1 = new MapObject(moonMap.mapData.mapObjects,{
            _id: "firstCity",
            objTypeId: "dome",
            sublayerId: "cityMap01",
            mapId: moonMap._id(),
            userId: 0,
            x: 0,
            y: 0
        });
        moonMap.mapData.mapObjects.add(city1);

        moonMap.mapData.mapObjects.add(new MapObject(moonMap.mapData.mapObjects,{
            _id: "secondCity",
            objTypeId: "dome",
            sublayerId: "cityMap02",
            mapId: moonMap._id(),
            userId: 0,
            x: 300,
            y: 0
        }));



        var solarSystem1 = new MapObject(galaxyMap.mapData.mapObjects,{
            _id: "solarSystem01",
            objTypeId: "normalStar",
            sublayerId: "solarMap01",
            mapId: galaxyMap._id(),
            userId: 0,
            x: 200,
            y: 100
        });
        galaxyMap.mapData.mapObjects.add(solarSystem1);




        var crater01 = gameData.objectTypes.get("crater01");
        for (var i = 1; i < 200; i++) {
            moonMap.mapData.mapObjects.add(new MapObject(moonMap.mapData.mapObjects,{
                _id: "Moon1crater01inst" + i,
                mapId: moonMap._id(),
                x: Math.floor((Math.random() - 0.5) * (moonMap.width - crater01.initWidth / 2)),
                y: Math.floor((Math.random() - 0.5) * (moonMap.height - crater01.initWidth.initHeight / 2)),
                objTypeId: crater01._id,
                userId: 0
            }));
        }
        for (var i = 1; i < 200; i++) {
            moonMap2.mapData.mapObjects.add(new MapObject(moonMap2.mapData.mapObjects,{
                _id: "Moon2crater01inst" + i,
                mapId: moonMap2._id(),
                x: Math.floor((Math.random() - 0.5) * (moonMap2.width - crater01.initWidth / 2)),
                y: Math.floor((Math.random() - 0.5) * (moonMap2.height - crater01.initHeight / 2)),
                objTypeId: crater01._id,
                userId: 0
            }));
        }


// Now start adding example objects to our example cityMap01

        var rock01 = gameData.objectTypes.get("rock01");
        for (var i = 1; i < 100; i++) {
            cityMap.mapData.mapObjects.add(new MapObject(cityMap.mapData.mapObjects,{
                _id: "rock01inst" + i,
                mapId: cityMap._id(),
                x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock01.initWidth / 2)),
                y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock01.initHeight / 2)),
                objTypeId: rock01._id,
                userId: 0
            }));
        }

        var rock02 = gameData.objectTypes.get("rock02");
        for (var i = 1; i < 100; i++) {
            cityMap.mapData.mapObjects.add(new MapObject(cityMap.mapData.mapObjects,{
                _id: "rock02inst" + i,
                mapId: cityMap._id(),
                x: Math.floor((Math.random() - 0.5) * (cityMap.width - rock02.initWidth / 2)),
                y: Math.floor((Math.random() - 0.5) * (cityMap.height - rock02.initHeight / 2)),
                objTypeId: rock02._id,
                userId: 0
            }));
        }

        // Add Start Building
        cityMap.mapData.mapObjects.add(new MapObject(cityMap.mapData.mapObjects,{
            _id: "furnitureFactory01",
            mapId: cityMap._id(),
            x: 0,
            y: 0,
            objTypeId: "furnitureFactory",
            userId: 0,
            state: State.NORMAL
        }));


        // Add Start Building
        cityMap2.mapData.mapObjects.add(new MapObject(cityMap2.mapData.mapObjects,{
            _id: "furnitureFactory02",
            mapId: cityMap2._id(),
            x: 0,
            y: 0,
            objTypeId: "furnitureFactory",
            userId: 0,
            state: State.NORMAL
        }));

        // Add Start Building
        cityMap2.mapData.mapObjects.add(new MapObject(cityMap2.mapData.mapObjects,{
            _id: "furnitureFactory03",
            mapId: cityMap2._id(),
            x: 500,
            y: 500,
            objTypeId: "furnitureFactory",
            userId: 0,
            state: State.NORMAL
        }));

        var testPlaceObject = cityMap2.mapData.mapObjects.add(new MapObject(cityMap2.mapData.mapObjects,{
            _id: "testPlaceObject",
            mapId: cityMap2._id(),
            x: 500,
            y: 500,
            objTypeId: "subObject",
            userId: 0,
            state: State.HIDDEN,
            needsTobePlaced: true
        }));

        var testPlantation = cityMap2.mapData.mapObjects.add(new MapObject(cityMap2.mapData.mapObjects,{
            _id: "testPlantation",
            mapId: cityMap2._id(),
            x: 200,
            y: 0,
            objTypeId: "plantation2",
            userId: 0,
            state: State.NORMAL
        }));
        testPlantation.setPointers(); // this will call setPointer() on all mapObjects and items
        testPlantation.embedded(true);
        testPlantation.blocks.SoilPuller.resetSoilProduction();





    }

    exports.initGameInstances = initGameInstances;

})(node ? exports : window);