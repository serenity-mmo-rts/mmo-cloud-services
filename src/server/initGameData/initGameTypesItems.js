var node = !(typeof exports === 'undefined');
if (node) {
    var ItemType = require('../../game/types/ItemType').ItemType;
}

(function (exports) {

    function initGameTypesItems(gameData) {

        gameData.itemTypes.add(new ItemType(gameData,{
            _id: "engineerDept",
            name: "Engineering Department",
            className: "ProductivityUpgrade",
            blocks: {
                Feature: [
                    {
                        stack: [
                            {getParentObj: {}},
                            {
                                addToProp: {
                                    vars: ["maxHealthPoints", "points"],
                                    blocks: ["UserObject", "UserObject"],
                                    operator: ["plus", "times"],
                                    values: ["10", "2"]
                                }
                            }
                        ]
                    },
                    {
                        stack: [
                            {getParentObj: {}},
                            {
                                addToProp: {
                                    vars: ["maxHealthPoints", "points"],
                                    blocks: ["UserObject", "UserObject"],
                                    operator: ["plus", "times"],
                                    values: ["20", "3"]
                                }
                            }
                        ]
                    }
                ],
                FeatureManager: {

                },
                Movable: {
                    movementSpeed: 0.1,  // per sec
                    maxRange: 500
                }
            },
            allowOnMapTypeId: "moonMap01",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 1,
            buildMenuTooltip: "this is awesome",
            buildTime: [10000,10000,10000,10000,10000]

        }));

        gameData.itemTypes.add(new ItemType(gameData,{
            _id: "solarPanel",
            name: "Solar Panels",
            className: "ProductivityUpgrade",
            blocks: {
                Feature: [
                    {
                        stack:
                            [
                                {getObjInRange: 500},
                                {
                                    addToProp: {
                                        vars: ["maxHealthPoints", "points"],
                                        blocks: ["UserObject", "UserObject"],
                                        operator: ["plus", "times"],
                                        values: ["5", "1.5"]
                                    }
                                }
                            ]
                    },
                    {
                        stack:
                            [
                                {getObjInRange: 500},
                                {
                                    addToProp: {
                                        vars: ["maxHealthPoints", "points"],
                                        blocks: ["UserObject", "UserObject"],
                                        operator: ["plus", "times"],
                                        values: ["10", "2"]
                                    }
                                }
                            ]
                    }
                ],
                FeatureManager: {

                }
            },
            allowOnMapTypeId: "moonMap01",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 7,
            buildMenuTooltip: "this is even better",
            buildTime: [10000,10000,10000,10000,10000]

        }));



        gameData.itemTypes.add(new ItemType(gameData,{
            _id: "activationItem",
            name: "activationItem",
            className: "ProductivityUpgrade",
            blocks: {
                Feature: [
                    {
                        stack: [
                            {activatePerClick: {targetType: "self", range: Infinity}},
                            {getParentObj: {}},
                            {addToProp: {
                                vars: ["maxHealthPoints"],
                                blocks: ["UserObject"],
                                operator: ["plus"],
                                values: ["50"]
                            }
                            },
                            {wait: { waitingTime : 10000 }},
                            {clear: { effectIdx: 0}},
                            {deactivate:{}},
                            {wait: { waitingTime : 3000}},
                            {goToExecutionIndex: {index : 0}}
                        ]
                    },
                    {
                        stack: [
                            {getParentObj: {}},
                            {
                                addToProp: {
                                    vars: ["maxHealthPoints", "points"],
                                    blocks: ["UserObject", "UserObject"],
                                    operator: ["plus", "times"],
                                    values: ["20", "3"]
                                }
                            }
                        ]
                    }
                ],
                FeatureManager: {

                }
            },
            allowOnMapTypeId: "moonMap01",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 4,
            buildMenuTooltip: "this is awesome",
            buildTime: [10000,10000,10000,10000,10000]

        }));



        gameData.itemTypes.add(new ItemType(gameData,{
            _id: "activationResetItem",
            name: "activationResetItem",
            className: "ProductivityUpgrade",
            blocks: {
                Feature: [
                    {
                        stack: [
                            {activatePerClick: {targetType: "self", range: Infinity}},
                            {getParentObj: {}},
                            {addToProp: {
                                vars: ["maxHealthPoints"],
                                blocks: ["UserObject"],
                                operator: ["plus"],
                                values: ["50"]
                            }
                            },
                            {wait: { waitingTime : 10000 }},
                            {clear: { effectIdx: 0}},
                            {deactivate:{}},
                            {goToExecutionIndex: {index : 0}}
                        ]
                    },
                    {
                        stack: [
                            {getParentObj: {}},
                            {
                                addToProp: {
                                    vars: ["maxHealthPoints", "points"],
                                    blocks: ["UserObject", "UserObject"],
                                    operator: ["plus", "times"],
                                    values: ["20", "3"]
                                }
                            }
                        ]
                    }
                ],
                FeatureManager: {

                }
            },
            allowOnMapTypeId: "moonMap01",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 5,
            buildMenuTooltip: "this is awesome",
            buildTime: [10000,10000,10000,10000,10000]

        }));

        gameData.itemTypes.add(new ItemType(gameData,{
            _id: "targetSelectionItem",
            name: "targetSelectionItem",
            className: "ProductivityUpgrade",
            blocks: {
                Feature: [
                    {
                        stack: [
                            {activatePerClick: {targetType: "object", range: 500}},
                            {addToProp: {
                                vars: ["maxHealthPoints"],
                                blocks: ["UserObject"],
                                operator: ["plus"],
                                values: ["50"]
                            }
                            }
                        ]
                    }
                ],
                FeatureManager: {

                }
            },
            allowOnMapTypeId: "moonMap01",
            iconSpritesheetId: "itemSprite",
            iconSpriteFrame: 2,
            buildMenuTooltip: "this is awesome",
            buildTime: [10000,10000,10000,10000,10000]

        }));
    }

    exports.initGameTypesItems = initGameTypesItems;

})(node ? exports : window);