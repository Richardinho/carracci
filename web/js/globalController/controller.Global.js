Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.Global = Glenmorangie.utils.extend ({


    initialize : function () {

    },

    onClick : function (player) {



    },

    arrowRequest : function (arrow) {
        this.arrow = arrow;
    },

    boxRequest : function(box) {

        if(this.arrow !== null) {
            var arrow = this.arrow;
            var connectionManager = new Glenmorangie.Coordinator.AttachedNodeToBox({ "arrow" : arrow,
                                                                                    "box" : box,
                                                                                    "proximalNode": arrow.proximalNodeModel, "distalNode" : arrow.distalNodeModel });


        }
    }

});