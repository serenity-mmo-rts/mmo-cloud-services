var node = !(typeof exports === 'undefined');
if (node) {
    var State = require('../../game/AbstractBlock').State;
    var MapObject = require('../../game/MapObject').MapObject;
    var Layer = require('../../game/Layer').Layer;
    var User = require('../../game/User').User;

}

(function (exports) {

    function create_city(moonMap, cityId, cityType, cityX, cityY, gameData) {
        var city1 = new MapObject(moonMap.mapData.mapObjects, {
            _id: cityId,
            objTypeId: cityType,
            sublayerId: cityId + "Map",
            mapId: moonMap._id(),
            userId: 0,
            x: cityX,
            y: cityY
        });
        moonMap.mapData.mapObjects.add(city1);

        var cityMap = new Layer(gameData.layers, {
            _id: cityId + "Map",
            parentObjId: cityId,
            width: 10000,
            height: 10000,
            xPos: cityX,
            yPos: cityY,
            mapTypeId: "cityMapType01",
            parentMapId: "moonMap01",
            mapGeneratorParams: [170000001, 10000, 14, 0.3, 70, gameData.objectTypes.get(cityType).initHeight]
        });
        gameData.layers.add(cityMap); // subLayerSeed,roughness,citySize,waterLevel,avgTemperature
        cityMap.currentTime = Date.now();
        return cityMap;
    }

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
            mapGeneratorParams: [170000001,10000,14,0.3,70]  // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
        });
        gameData.layers.add(moonMap);


        var moonMap2 = new Layer(gameData.layers,{
            _id: "moonMap02",
            parentObjId: "secondPlanet",
            width: 20000,              // pixelsize / 4
            height: 20000,             // pixelsize / 2
            mapTypeId: "moonMapType01",
            parentMapId: "solarMap01",
            mapGeneratorParams: [1,10000,15,0.4,20] // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
        });
        gameData.layers.add(moonMap2);

        var moonMap3 = new Layer(gameData.layers,{
            _id: "moonMap03",
            parentObjId: "thirdPlanet",
            width: 20000,              // pixelsize / 4
            height: 20000,             // pixelsize / 2
            mapTypeId: "moonMapType01",
            parentMapId: "solarMap01",
            mapGeneratorParams: [1,10000,15,0.3,-20] // subLayerSeed,roughness,planetSize,waterLevel,avgTemperature
        });
        gameData.layers.add(moonMap3);




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
            objTypeId: "marsPlanet",
            sublayerId: "moonMap01",
            mapId: solarMap._id(),
            userId: 0,
            x: 700,
            y: 400
        });
        solarMap.mapData.mapObjects.add(planet1);

        var planet2 = new MapObject(solarMap.mapData.mapObjects,{
            _id: "secondPlanet",
            objTypeId: "earthPlanet",
            sublayerId: "moonMap02",
            mapId: solarMap._id(),
            userId: 0,
            x: -900,
            y: 1100
        });
        solarMap.mapData.mapObjects.add(planet2);

        var planet3 = new MapObject(solarMap.mapData.mapObjects,{
            _id: "thirdPlanet",
            objTypeId: "moonPlanet",
            sublayerId: "moonMap03",
            mapId: solarMap._id(),
            userId: 0,
            x: -1300,
            y: 400
        });
        solarMap.mapData.mapObjects.add(planet3);

        var cityX = -250;
        var cityY = -250;
        var cityType = "bigDome";
        var cityId = "firstCity";
        var cityMap = create_city(moonMap, cityId, cityType, cityX, cityY, gameData);

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



/*
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
*/

// Now start adding example objects to our example cityMap01
/*
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
*/
        /*
        // Add Start Building
        var startObject = cityMap.mapData.mapObjects.add(new MapObject(cityMap.mapData.mapObjects,{
            _id: "start_building",
            mapId: cityMap2._id(),
            x: 0,
            y: 0,
            objTypeId: "mineralStorage",
            userId: 0,
            state: State.NORMAL
        }));
*/

        /**
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

        /**
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
         **/

        galaxyMap.initialize();
        solarMap.initialize();
        moonMap.initialize();
        moonMap2.initialize();
        cityMap.initialize();
       // startObject.blocks.SoilPuller.resetSoilProduction();
        /*
        var startResources = ["granulateMaterial","biomass","carbonFiber"];
        var startAmount = [1000,1000,1000];
        for (var i = 0; i<startResources.length; i++){
            var resStorage = startObject.blocks.ResourceManager.resList.get(startResources[i]);
            resStorage.storedAmount(startAmount[i]);
        }
        */
    }

    exports.initGameInstances = initGameInstances;

})(node ? exports : window);