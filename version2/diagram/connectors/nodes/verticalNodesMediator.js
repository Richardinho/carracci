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
        update : function (node, x, y) {
            switch(node) {

            case "top" :
                this.updateTopArrow(x, y);
                break;
            case "secondTop" :
                this.updateSecondTopNode(x, y);
                break;
            case "secondBottom" :
                this.updateSecondBottomNode(x,y);
                break;
            case "bottom" :
                this.updateBottomArrow(x,y);
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


                //this.leftArrowModel.children['xCood'].set(x);
                var secondTopNodeYCood = this.secondTopNodeModel.getYCood();
                // if second type node is below type box bottom edge
                if( secondTopNodeYCood > this.topNodeTypeBoxMediator.getBoxBottomLimit()) {
                    //set top node to bottom edge
                    this.topArrowModel.setYCood(
                        this.topNodeTypeBoxMediator.getBoxBottomLimit()
                    );
                }

                // if second top node is above the top edge of the type box
                else if( secondTopNodeYCood < this.topNodeTypeBoxMediator.getBoxTopLimit()) {
                    // set the top node to be at the top edge of the type box
                    this.topArrowModel.setYCood(
                        this.topNodeTypeBoxMediator.getBoxTopLimit()
                    );
                } else {

                    this.topArrowModel.setYCood(y);

                }
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


                // if the second bottom node has gone beyond the bottom edge of the type box
                // we want to move the bottom node onto the bottom edge of the type box.
                if( secondBottomNodeYCood > this.bottomNodeTypeBoxMediator.getBoxBottomLimit()) {
                    this.bottomArrowModel.setYCood(
                        this.bottomNodeTypeBoxMediator.getBoxBottomLimit()
                    );
                }
                // otherwise we want to move the bottom node onto the top edge of the type box.
                else if( secondBottomNodeYCood < this.bottomNodeTypeBoxMediator.getBoxTopLimit()) {
                    this.bottomArrowModel.setYCood(
                        this.bottomNodeTypeBoxMediator.getBoxTopLimit()
                    );
                } else {

                    this.bottomArrowModel.setYCood(y);
                }
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
        updateTopArrow : function (x, y) {

            if(this._topArrowAttached()) {
                var currentX = this.topArrowModel.getXCood();
                var currentY = this.topArrowModel.getYCood();


                var coods = this.topNodeTypeBoxMediator.getTopNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;

            }
            this.topArrowModel.setXCood(x);
            this.topArrowModel.setYCood(y);
            this.secondTopNodeModel.setXCood(x);
            this._setTopArrowDirection();

        },

        updateSecondTopNode : function (x, y) {

            if(this._bottomArrowAttached()) {


                if( y > this.bottomNodeTypeBoxMediator.getBoxBottomLimit()) {

                    this.bottomArrowModel.setYCood(
                        this.bottomNodeTypeBoxMediator.getBoxBottomLimit()
                    );
                }
                if( y < this.bottomNodeTypeBoxMediator.getBoxTopLimit()) {

                    this.bottomArrowModel.setYCood(
                        this.bottomNodeTypeBoxMediator.getBoxTopLimit()
                    );
                }
            }

            if(this._topArrowAttached() ) {

                var currentX = this.secondTopNodeModel.getXCood();
                var currentY = this.secondTopNodeModel.getYCood();

                // ask mediator if we can move this node
                var coods = this.topNodeTypeBoxMediator.getSecondTopNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;


                if( y > this.topNodeTypeBoxMediator.getBoxBottomLimit()) {

                    this.topArrowModel.setYCood(
                        this.topNodeTypeBoxMediator.getBoxBottomLimit()
                    );
                }
                if( y < this.topNodeTypeBoxMediator.getBoxTopLimit()) {

                    this.topArrowModel.setYCood(
                        this.topNodeTypeBoxMediator.getBoxTopLimit()
                    );
                }

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


                if( y > this.bottomNodeTypeBoxMediator.getBoxBottomLimit()) {

                    this.bottomArrowModel.setYCood(
                        this.bottomNodeTypeBoxMediator.getBoxBottomLimit()
                    );
                }
                if( y < this.bottomNodeTypeBoxMediator.getBoxTopLimit()) {

                    this.bottomArrowModel.setYCood(
                        this.bottomNodeTypeBoxMediator.getBoxTopLimit()
                    );
                }
            }

            if(this._topArrowAttached() ) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( y > this.topNodeTypeBoxMediator.getBoxBottomLimit()) {

                    this.topArrowModel.setYCood(
                        this.topNodeTypeBoxMediator.getBoxBottomLimit()
                    );
                }
                if( y < this.topNodeTypeBoxMediator.getBoxTopLimit()) {

                    this.topArrowModel.setYCood(
                        this.topNodeTypeBoxMediator.getBoxTopLimit()
                    );
                }

            }

            this._setTopArrowDirection();
            this._setBottomArrowDirection();

            this.secondBottomNodeModel.setXCood(x);
            this.secondBottomNodeModel.setYCood(y);
            this.secondTopNodeModel.setYCood(y);

            this.bottomArrowModel.setXCood(x);



        },

        updateBottomArrow : function (x, y) {

            if(this._bottomArrowAttached()) {

                /*
                    if we're currently attached to a type box, check against
                    the mediator if the proposed coods are acceptable
                */

                var currentX = this.bottomArrowModel.getXCood();
                var currentY = this.bottomArrowModel.getYCood();

                var coods = this.bottomNodeTypeBoxMediator.getBottomNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;
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
