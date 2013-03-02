define(['BaseType', "svgUtilities"], function (extend, utils) {


    var blah =  extend.extend({


        initialize : function () {

        },

        onClick : function (player) {
            utils.createRectangle(20, 20, 300, 200);
            console.log("onClick from global controller")

        },

        arrowRequest : function (arrow) {
            this.arrow = arrow;
        },

        boxRequest : function(box) {

            if(this.arrow !== null) {
                var arrow = this.arrow;
               /* var connectionManager = new Glenmorangie.Coordinator.AttachedNodeToBox({ "arrow" : arrow,
                                                                                        "box" : box,
                                                                                        "proximalNode": arrow.proximalNodeModel,
                                                                                        "distalNode" : arrow.distalNodeModel });*/


            }
        }

    });

    return new blah();
});
