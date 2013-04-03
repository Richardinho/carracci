
define(['ClassBoxFactory',
        'verticalConnectorFactory',
        'horizontalConnectorFactory',],function ( ClassBoxFactory,
                                        verticalConnectorFactory,
                                        horizontalConnectorFactory ) {

    var vertConnectorFactory = new verticalConnectorFactory();
    var horConnectorFactory = new horizontalConnectorFactory();

    return {

        createVerticalConnector : function () {

            vertConnectorFactory.createConnector({
                topNode : { x  : 25, y : 10 , arrows : ['diamond', 'implements', 'none'] },
                bottomNode : { x  : 225, y : 110 , arrows : ['diamond', 'implements', 'none']}
            });
        },

        createHorizontalConnector : function () {

            horConnectorFactory.createConnector({
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