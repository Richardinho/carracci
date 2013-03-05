define(['BaseType',
        "svgUtilities",
        "NodeToBoxCoordinator" ], function (extend, utils, NodeBoxCoordinator ) {


    var GlobalController =  extend.extend({


        initialize : function () {

        },

        arrowRequest : function (arrow) {
            this.arrow = arrow;
        },

        boxRequest : function(box) {

            if(this.arrow !== undefined) {

                this.arrow.set({ "connectedToBox": true });
                var connectionManager = new NodeBoxCoordinator ({ "arrow" : this.arrow,
                                                                  "box" : box,
                                                                  "proximalNode": this.arrow.proximalNodeModel,
                                                                  "distalNode" : this.arrow.distalNodeModel });


            }
        }

    });

    return new GlobalController();
});
