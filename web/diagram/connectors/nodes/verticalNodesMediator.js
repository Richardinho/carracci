define(["core/BaseType",
        "diagram/connectors/nodes/nodeModel"
         ],function (
            BaseType,
            NodeModel
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.topArrowModel = options.topArrowModel;
            this.secondTopNodeModel = options.secondTopNodeModel;
            this.secondBottomNodeModel= options.secondBottomNodeModel;
            this.bottomArrowModel = options.bottomArrowModel;
            this.connectorModel = options.connectorModel;

        },

        addBoxNodeMediator : function (boxNodeMediator, orientation) {

            if(orientation === "top") {
                this._attachTypeBoxToTopNode(boxNodeMediator);
            } else if(orientation === "bottom") {
                this._attachTypeBoxToBottomNode(boxNodeMediator);
            } else {
                throw {
                    name : "IncorrectNodeMediatorAttachmentError"
                }
            }
        },

        changeLineStyle : function () {
            this.connectorModel.alternateLineStyle();
        },
        // called from node controller
        removeBoxNodeMediator : function (orientation) {

            if(orientation === "top") {


                this.topArrowModel.setAttached(false);
                this.topArrowModel.model.children['attachedBox'].set(null);
                this.topNodeTypeBoxMediator.destroy();
                this.topNodeTypeBoxMediator = null;

            } else {

                this.bottomArrowModel.setAttached(false);
                this.bottomArrowModel.model.children['attachedBox'].set(null)
                this.bottomNodeTypeBoxMediator.destroy();
                this.bottomNodeTypeBoxMediator = null;
            }

        },

        destroy : function () {
            this.detachAll();
            this.topArrowModel.destroy();
            this.secondTopNodeModel.destroy();
            this.secondBottomNodeModel.destroy();
            this.bottomArrowModel.destroy();
        },

        detachAll : function () {

            if(this.topNodeTypeBoxMediator) {
                this.removeBoxNodeMediator("top");
            }
            if(this.bottomNodeTypeBoxMediator) {
                this.removeBoxNodeMediator("bottom");
            }
        },

        _attachTypeBoxToBottomNode : function (boxNodeMediator) {

            this.bottomArrowModel.setAttached(true);
            var box = boxNodeMediator.typeController.model.model.name;
            this.bottomArrowModel.model.children['attachedBox'].set(box)

            this.bottomNodeTypeBoxMediator = boxNodeMediator;

        },

        _attachTypeBoxToTopNode : function (boxNodeMediator) {

            this.topArrowModel.setAttached(true);
            var box = boxNodeMediator.typeController.model.model.name;
            this.topArrowModel.model.children['attachedBox'].set(box)
            this.topNodeTypeBoxMediator = boxNodeMediator;
        },

        /*  update a node model using coordinates */
        update : function (node, x, y, overRideConstraints) {

            switch(node) {

            case "top" :
                this.updateTopArrow(x, y, overRideConstraints);
                break;
            case "secondTop" :
                this.updateSecondTopNode(x, y);
                break;
            case "secondBottom" :
                this.updateSecondBottomNode(x,y);
                break;
            case "bottom" :
                this.updateBottomArrow(x,y, overRideConstraints);
                break;
            }
        },

        /* update a node model when you have the difference in x and y */
        updateUsingDifference : function (orientation, dx, dy) {

            var x, y;
            switch(orientation) {

            case "top" :
                x = this.topArrowModel.getXCood() + dx;
                y = this.topArrowModel.getYCood() + dy;


                var secondTopNodeYCood = this.secondTopNodeModel.getYCood();

                this.topArrowModel.setYCood(
                    this.topNodeTypeBoxMediator.calculateNodeYCood(secondTopNodeYCood)
                );
                this._setTopArrowDirection();
                this.topArrowModel.setXCood(x);
                this.secondTopNodeModel.setXCood(x);
                break;

            case "bottom" :

                //  get the current coods of this node
                x = this.bottomArrowModel.getXCood() + dx;
                y = this.bottomArrowModel.getYCood() + dy;


                // get y cood of second bottom node to compare against
                var secondBottomNodeYCood = this.secondBottomNodeModel.getYCood();

                this.bottomArrowModel.setYCood(
                    this.bottomNodeTypeBoxMediator.calculateNodeYCood(secondBottomNodeYCood)
                );

                this._setBottomArrowDirection();
                this.bottomArrowModel.setXCood(x);
                this.secondBottomNodeModel.setXCood(x);



                break;
            }

        },

        // make request to join a node to a type box
        fireAttachRequest : function (orientation) {
            this.connectorModel.fire("attachRequest", this, orientation)
        },

        // update from node controller
        updateTopArrow : function (x, y, overRideConstraints) {

            if(this._topArrowAttached()) {
                var currentX = this.topArrowModel.getXCood();
                var currentY = this.topArrowModel.getYCood();

                if(!overRideConstraints) {
                    var coods = this.topNodeTypeBoxMediator
                        .getTopNodeCoods(x, y, currentX, currentY);


                    x = coods.x;
                    y = coods.y;
                }

            }
            this.topArrowModel.setXCood(x);
            this.topArrowModel.setYCood(y);
            this.secondTopNodeModel.setXCood(x);
            this._setTopArrowDirection();

        },

        updateSecondTopNode : function (x, y) {

            if(this._bottomArrowAttached()) {

                this.bottomArrowModel.setYCood(
                    this.bottomNodeTypeBoxMediator.calculateNodeYCood(y)
                );
            }

            if(this._topArrowAttached() ) {

                var currentX = this.secondTopNodeModel.getXCood();
                var currentY = this.secondTopNodeModel.getYCood();

                // ask mediator if we can move this node
                var coods = this.topNodeTypeBoxMediator.getSecondTopNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;


                this.topArrowModel.setYCood(
                    this.topNodeTypeBoxMediator.calculateNodeYCood(y)
                );

            }

            this._setBottomArrowDirection();
            this._setTopArrowDirection();
            this.secondTopNodeModel.setXCood(x);
            this.secondTopNodeModel.setYCood(y);
            this.topArrowModel.setXCood(x);

            this.secondBottomNodeModel.setYCood(y);



        },

        updateSecondBottomNode : function (x, y) {

            if(this._bottomArrowAttached()) {
                var currentX = this.secondBottomNodeModel.getXCood();
                var currentY = this.secondBottomNodeModel.getYCood();

                // ask mediator if we can move this node
                var coods = this.bottomNodeTypeBoxMediator.getSecondBottomNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;


                this.bottomArrowModel.setYCood(
                    this.bottomNodeTypeBoxMediator.calculateNodeYCood(y)
                );
            }

            if(this._topArrowAttached() ) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */

                this.topArrowModel.setYCood(
                    this.topNodeTypeBoxMediator.calculateNodeYCood(y)
                );

            }

            this._setTopArrowDirection();
            this._setBottomArrowDirection();

            this.secondBottomNodeModel.setXCood(x);
            this.secondBottomNodeModel.setYCood(y);
            this.secondTopNodeModel.setYCood(y);

            this.bottomArrowModel.setXCood(x);



        },

        updateBottomArrow : function (x, y, overRideConstraints) {
            if(this._bottomArrowAttached()) {

                /*
                    if we're currently attached to a type box, check against
                    the mediator if the proposed coods are acceptable
                */
                if(!overRideConstraints) {
                    var currentX = this.bottomArrowModel.getXCood();
                    var currentY = this.bottomArrowModel.getYCood();

                    var coods = this.bottomNodeTypeBoxMediator
                        .getBottomNodeCoods(x, y, currentX, currentY);



                    x = coods.x;
                    y = coods.y;
                }


            }


            this.bottomArrowModel.setXCood(x);
            this.bottomArrowModel.setYCood(y);
            this.secondBottomNodeModel.setXCood(x);

            this._setBottomArrowDirection();

        },

        _setBottomArrowDirection : function () {

            if(this.bottomArrowModel.getYCood() <
                this.secondBottomNodeModel.getYCood()) {

                this.bottomArrowModel.setArrowDirection("top");

            } else {
                this.bottomArrowModel.setArrowDirection("bottom");
            }
            this.bottomArrowModel.broadcast("change")

        },

        _setTopArrowDirection : function () {

            if(this.topArrowModel.getYCood() <
                this.secondTopNodeModel.getYCood()) {

                this.topArrowModel.setArrowDirection("top");

            } else {
                this.topArrowModel.setArrowDirection("bottom");
            }
            this.topArrowModel.broadcast("change")

        },

        _topArrowAttached : function () {

            return this.topArrowModel.isAttached();
        },

        _bottomArrowAttached : function () {

            return this.bottomArrowModel.isAttached();
        }




    });
});
