
define(['ClassBoxFactory',
        'verticalConnectorFactory',
        'connectorFactory',],function ( ClassBoxFactory,
                                        verticalConnectorFactory,
                                        horizontalConnectorFactory ) {

    return {

        createVerticalConnector : function () {

            verticalConnectorFactory({
                topNode : { x  : 25, y : 10 , arrows : ['diamond', 'implements', 'none'] },
                bottomNode : { x  : 225, y : 110 , arrows : ['diamond', 'implements', 'none']}
            });
        },

        createHorizontalConnector : function () {

            horizontalConnectorFactory({
                leftNode : { x  : 25, y : 10 , arrows : ['diamond', 'implements', 'none'] },
                rightNode : { x  : 225, y : 110 , arrows : ['diamond', 'implements', 'none'] }
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