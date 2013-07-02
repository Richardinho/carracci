define([
        "core/BaseType"
         ]
         ,function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {


            this.nodeMediator = options.nodeMediator;
            this.typeController = options.typeController;
            this.nodeOrientation = options.nodeOrientation;

            // it's very important that this method goes before the following ones.
            this._moveNodeOnToBox();

            this.typeController.addAttachedNodeMediator(this)
            this.nodeMediator.addBoxNodeMediator(this, this.nodeOrientation);

        },

        destroy : function () {
            this.typeController.unAttachNodeMediator(this);

        },

        /*
            move node in response to type box moving. call from type box controller.
        */
        moveNode : function (diffX, diffY) {

            this.nodeMediator.updateUsingDifference(this.nodeOrientation, diffX, diffY);
        },

        /* methods called from nodes mediator to determine position of nodes */

        getRightNodeCoods : function (x, y, currentX, currentY) {
            return this._getNodeCoods(x, y, currentX, currentY);
        },

        getLeftNodeCoods : function (x, y, currentX, currentY) {
            return this._getNodeCoods(x, y, currentX, currentY);
        },

        getProximalNodeCoods : function (x, y, currentX, currentY) {
            var topY = this.typeController.getTopYLimit();
            var bottomY = this.typeController.getBottomYLimit();

            if(y < topY || y > bottomY ) {

                y = currentY;
            }

            // note that the x cood is not under any constraint.
            return {

                x : x,
                y : y
            }
        },

        getDistalNodeCoods : function (x, y, currentX, currentY) {
            var topY = this.typeController.getTopYLimit();
            var bottomY = this.typeController.getBottomYLimit();

            if(y < topY || y > bottomY ) {

                y = currentY;
            }

            // note that the x cood is not under any constraint.
            return {

                x : x,
                y : y
            }
        },

        getBoxRightLimit : function () {

            return this.typeController.getRightXLimit();
        },

        getBoxLeftLimit : function () {

            return this.typeController.getLeftXLimit();
        },

        //  private methods
        _getNodeCoods : function(x, y, currentX, currentY) {

            var topY = this.typeController.getTopYLimit();
            var bottomY = this.typeController.getBottomYLimit();

            if(y < topY || y > bottomY ) {

                y = currentY;
            }

            return {

                x : currentX,
                y : y
            }

        },

        _moveNodeOnToBox : function () {
            var x = this.typeController.getLeftXLimit();
            var topY = this.typeController.getTopYLimit();
            var bottomY = this.typeController.getBottomYLimit();

            var y = (topY + bottomY) /2;
            debugger;
            this.nodeMediator.update(this.nodeOrientation, x, y);
        }




    });

});
