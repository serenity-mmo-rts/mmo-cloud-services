var node = !(typeof exports === 'undefined');
if (node) {
    var initGameTypesUsers = require('./initGameTypesUsers').initGameTypesUsers;
    var initGameTypesLayers = require('./initGameTypesLayers').initGameTypesLayers;
    var initGameTypesMapObjects = require('./initGameTypesMapObjects').initGameTypesMapObjects;
    var initGameTypesResources = require('./initGameTypesResources').initGameTypesResources;
    var initGameTypesTechnologies = require('./initGameTypesTechnologies').initGameTypesTechnologies;
    var initGameTypesItems = require('./initGameTypesItems').initGameTypesItems;
}

(function (exports) {

    function initGameTypes(gameData) {

        initGameTypesUsers(gameData);

        initGameTypesLayers(gameData);

        initGameTypesMapObjects(gameData);

        initGameTypesResources(gameData);

        initGameTypesTechnologies(gameData);

        initGameTypesItems(gameData);

    }

    exports.initGameTypes = initGameTypes;

})(node ? exports : window);