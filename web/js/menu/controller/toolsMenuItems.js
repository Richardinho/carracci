
define(['ClassBoxFactory',
        'verticalConnectorFactory',
        'connectorFactory',],function ( ClassBoxFactory,
                                        verticalConnectorFactory,
                                        horizontalConnectorFactory ) {

    return {

        createVerticalConnector : function () {

            verticalConnectorFactory({
                topNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                bottomNode : { x  : 225, y : 110 , arrows : ['diamond']}
            });
        },

        createHorizontalConnector : function () {

            horizontalConnectorFactory({
                leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                rightNode : { x  : 225, y : 110 , arrows : ['diamond'] }
            });
        },

        createUmlClass : function () {

            ClassBoxFactory({

                name : "List",

                id : "blahClass",

                x : 0,

                y : 0,

                properties :  [
                    { name : "foo", visibility : "+", type : "String" },
                    { name : "bar", visibility : "#", type : "int" }
                ]
            });
        }
    }
});