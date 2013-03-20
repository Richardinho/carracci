define(['BaseCoordinator'], function (BaseCoordinator) {

    return BaseCoordinator.extend({

        initialize : function (options) {
            BaseCoordinator.prototype.initialize.call(this, options);
            this.players = options.players;
        },

        validateX : function (x) {
            return false;
        },

        //  the arrow is limited in the y axis by the upper and lower y limits of the box.
        validateY : function (y) {
            var box = this.players["box"],
                upperYLimit =  box.get('yCood'),
                lowerYLimit = upperYLimit + box.get('height');
            return (y > upperYLimit && y < lowerYLimit);
        },
        setYCoods : function () {
            this.main.setYOffset();
        }
    });
});