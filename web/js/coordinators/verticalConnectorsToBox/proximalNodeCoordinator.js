define(['BaseCoordinator'], function (BaseCoordinator) {

    return BaseCoordinator.extend({

        initialize : function (options) {
            BaseCoordinator.prototype.initialize.call(this, options);
            this.players = options.players;
        },

        //  the arrow attached to the box should not move outside of the left and right
        //  boundaries of the box.
        validateX : function (x) {
            var box = this.players["box"],
                lowerXLimit = box.get('xCood'),
                upperXLimit = lowerXLimit + box.get('width');
            return (x >= lowerXLimit && x < upperXLimit);
        },

        //  the arrow should not move along the y axis whilst attached.
        validateY : function (y) {
            return true;
        },

        setYCoods : function (y) {

            var bottomEdge = this.players["box"].getHeight() + this.players["box"].get('yCood');

            if(y > bottomEdge) {
                this.players["arrow"].set({ "yCood" : bottomEdge });
            } else {
                this.players["arrow"].set({"yCood" : this.players["box"].get('yCood') } );
            }
        },

        setXCoods : function () {
            this.main.setXOffset();
        }


    });
});