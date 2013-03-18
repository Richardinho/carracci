define(['BaseType',
        "svgUtilities",
        "NodeToBoxCoordinator",
        "VerticalNodeBoxCoordinator" ], function ( extend,
                                                   utils,
                                                   NodeBoxCoordinator,
                                                   VerticalNodeBoxCoordinator ) {


    var GlobalController =  extend.extend({


        initialize : function () {

        },

        arrowRequest : function (arrow) {
            this.arrow = arrow;
        },

        boxRequest : function(box) {
            var connectionManager;

            if(this.arrow !== undefined && !this.arrow.get("connectedToBox")) {

                this.arrow.set({ "connectedToBox": true });

                if(this._isVerticalArrow(this.arrow)) {

                    connectionManager = new VerticalNodeBoxCoordinator ({
                        "arrow" : this.arrow,
                        "box" : box,
                        "proximalNode": this.arrow.proximalNodeModel,
                        "distalNode" : this.arrow.distalNodeModel
                        });

                } else {

                    connectionManager = new NodeBoxCoordinator ({ "arrow" : this.arrow,
                                                                  "box" : box,
                                                                  "proximalNode": this.arrow.proximalNodeModel,
                                                                  "distalNode" : this.arrow.distalNodeModel });
                }



                this.arrow.attachmentCoordinator = connectionManager;
            }
        },

        _isVerticalArrow : function (arrowModel) {
            return ( arrowModel.name === "top" || arrowModel.name === "bottom" );
        }
    });
    return new GlobalController();
});
