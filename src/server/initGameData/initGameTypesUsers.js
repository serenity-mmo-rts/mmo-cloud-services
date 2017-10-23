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

    function initGameTypesUsers(gameData) {

        var user = gameData.userTypes.add(new UserType(gameData,{
            _id: "normalUser",
            blocks: {
                Skills: {},
                Technologies: {}
            }
        }));
    }

    exports.initGameTypesUsers = initGameTypesUsers;

})(node ? exports : window);