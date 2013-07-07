define([
        "diagram/boxNodeMediator"
         ]
         ,function (
            BoxNodeMediator
        ) {


    return BoxNodeMediator.extend({

        initialize : function (options) {

            BoxNodeMediator.prototype.initialize.call(this, options);
        },

        getBoxTopLimit : function () {

            return this.typeController.getTopYLimit();
        },

        getBoxBottomLimit : function () {

            return this.typeController.getBottomYLimit();
        },

        getSecondBottomNodeCoods : function (x, y, currentX, currentY) {

            var leftX = this.typeController.getLeftXLimit();
            var rightX = this.typeController.getRightXLimit();

            if(x < leftX || x > rightX ) {

                x = currentX;
            }

            // note that the x cood is not under any constraint.
            return {

                x : x,
                y : y
            }

        },

        getSecondTopNodeCoods : function (x, y, currentX, currentY) {

            var leftX = this.typeController.getLeftXLimit();
            var rightX = this.typeController.getRightXLimit();

            if(x < leftX || x > rightX ) {

                x = currentX;
            }

            // note that the x cood is not under any constraint.
            return {

                x : x,
                y : y
            }
        },

        /* methods called from nodes mediator to determine position of nodes */

        getBottomNodeCoods : function (x, y, currentX, currentY) {

            var rightX = this.typeController.getRightXLimit();
            var leftX = this.typeController.getLeftXLimit();

            if(x < leftX || x > rightX ) {

                x = currentX;
            }

            return {
                x : x,
                y : currentY
            }
        },

        getTopNodeCoods : function (x, y, currentX, currentY) {
            var rightX = this.typeController.getRightXLimit();
            var leftX = this.typeController.getLeftXLimit();

            if(x < leftX || x > rightX ) {

                x = currentX;
            }

            return {
                x : x,
                y : currentY
            }
        },

        //  private methods
        _getNodeCoods : function(x, y, currentX, currentY) {

/*            var topY = this.typeController.getTopYLimit();
            var bottomY = this.typeController.getBottomYLimit();

            if(y < topY || y > bottomY ) {

                y = currentY;
            }

            return {

                x : currentX,
                y : y
            }*/

        },

        // inherited methods
        _moveNodeOnToBox : function () {

            var y = this.typeController.getTopYLimit();
            var rightLimit = this.typeController.getRightXLimit();
            var leftLimit = this.typeController.getLeftXLimit();

            var x = (rightLimit + leftLimit) /2;
            this.nodeMediator.update(this.nodeOrientation, x, y);
        }

    });

});
