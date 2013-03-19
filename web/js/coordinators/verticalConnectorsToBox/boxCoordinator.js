define(['BaseCoordinator'], function (BaseCoordinator) {

    return BaseCoordinator.extend({

        initialize : function (options) {
            BaseCoordinator.prototype.initialize.call(this, options);
            this.players = options.players;
        },

        setXCoods : function(x) {
            this.players["arrow"].updateX(x, true);

        },

        setYCoods : function (y) {

            var arrowYCood = y,
                arrowModel = this.players["arrow"],
                proximalNode = this.players["proximalNode"],
                box = this.players["box"],
                bottomEdge = y + box.getHeight();

            if(proximalNode.get('yCood') > bottomEdge) {
                arrowYCood = bottomEdge;
            }
            arrowModel.updateY(arrowYCood, false);
        }
    });
});