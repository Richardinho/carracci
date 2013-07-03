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
        }

    });

});
