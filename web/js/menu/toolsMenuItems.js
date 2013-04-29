
define(['ClassBoxFactory',
        'verticalConnectorFactory',
        'horizontalConnectorFactory',
        'canvg','jQuery'],function ( ClassBoxFactory,
                            verticalConnectorFactory,
                            horizontalConnectorFactory,
                            canvg, $) {

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
        },

        exportToPNG : function () {

            var canvas = document.createElement('canvas');
            canvas.width = 1000;
            canvas.height = 800;
            var svg = $('<div>').append($('svg').clone()).html();

            canvg(canvas,svg );

            var dataURL = canvas.toDataURL()

            window.open(dataURL,'mywindow')
        }
    }
});