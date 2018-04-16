var node = !(typeof exports === 'undefined');
if (node) {
    var UserType = require('../../game/types/UserType').UserType;
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