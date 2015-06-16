define([
        "BaseType"
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
            if(!options.dontMove) {
               this._moveNodeOnToBox();
            }

            this.typeController.addAttachedNodeMediator(this)
            this.nodeMediator.addBoxNodeMediator(this, this.nodeOrientation);

            this.typeController.model.on("changeHeight", this.repositionNode, this);
            this.typeController.model.on("changeWidth", this.repositionNode, this);

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
        /*
            This is called whenever the box resizes
        */
        repositionNode : function () {
          // put node in middle point of edge.
            this._moveNodeOnToBox();

        },

        destroyFromType : function () {
            this.nodeMediator.removeBoxNodeMediator(this.nodeOrientation)
        }

    });

});
