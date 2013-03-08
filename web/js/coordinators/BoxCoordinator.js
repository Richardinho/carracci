define(['BaseCoordinator'], function (BaseCoordinator) {

    return BaseCoordinator.extend({

        initialize : function (options) {
            BaseCoordinator.prototype.initialize.call(this, options);
            this.players = options.players;
        },



        setXCoods : function(x) {

            var arrowXCood = x,
                arrowModel = this.players["arrow"],
                proximalNode = this.players["proximalNode"],
                box = this.players["box"];
            rightEdge = x + box.getWidth();

            if(proximalNode.get('xCood') > rightEdge) {
                arrowXCood = x + box.getWidth();
            }
            //  has to be false. If we validate the arrow model's x cood it will fail on
            // the rule we have given it
            arrowModel.updateX(arrowXCood, false);
        },

        //  here we do want the arrow to validate y coods, because we want it to call other components.
        setYCoods : function (y) {
            var arrowModel = this.players["arrow"];
            arrowModel.updateY( y + 20, true);
        }
    });
});