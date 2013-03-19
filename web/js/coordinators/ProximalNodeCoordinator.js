define(['BaseCoordinator'], function (BaseCoordinator) {

    return BaseCoordinator.extend({

        initialize : function (options) {
            BaseCoordinator.prototype.initialize.call(this, options);
            this.players = options.players;
        },

        // the proximal node has the same y axis constraints as the arrow
        validateY : function (y) {

            var box = this.players["box"],
                lowerYLimit =  box.get('yCood'),
                upperYLimit = lowerYLimit + box.get('height');
            return (y < upperYLimit && y > lowerYLimit);
        },
        setXCoods : function(x) {

            var rightEdgexCood = this.players["box"].get('width') + this.players["box"].get('xCood');

            if(x > rightEdgexCood) {
                this.players["arrow"].set({ "xCood" : rightEdgexCood });
            } else {
                this.players["arrow"].set({"xCood" : this.players["box"].get('xCood') } );
            }
        }
    });
});