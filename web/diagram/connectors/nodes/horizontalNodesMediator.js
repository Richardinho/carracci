define(["BaseType",
        "diagram/connectors/nodes/nodeModel"
         ],function (
            BaseType,
            NodeModel
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.leftArrowModel = options.leftArrowModel;
            this.proximalNodeModel = options.proximalNodeModel;
            this.distalNodeModel =  options.distalNodeModel;
            this.rightArrowModel = options.rightArrowModel;
            this.connectorModel = options.connectorModel;

        },

        addBoxNodeMediator : function (boxNodeMediator, orientation) {

            if(orientation === "left") {
                this._attachTypeBoxToLeftNode(boxNodeMediator);
            } else if(orientation === "right") {
                this._attachTypeBoxToRightNode(boxNodeMediator);
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

            if(orientation === "left") {

                this.leftArrowModel.setAttached(false);
                this.leftArrowModel.model.children['attachedBox'].set(null);
                this.leftNodeTypeBoxMediator.destroy();
                this.leftNodeTypeBoxMediator = null;

            } else {

                this.rightArrowModel.setAttached(false);
                this.rightArrowModel.model.children['attachedBox'].set(null)
                this.rightNodeTypeBoxMediator.destroy();
                this.rightNodeTypeBoxMediator = null;
            }

        },

        destroy : function () {

            this.detachAll();
            this.leftArrowModel.destroy();
            this.proximalNodeModel.destroy();
            this.distalNodeModel.destroy();
            this.rightArrowModel.destroy();
        },

        detachAll : function () {

            if(this.leftNodeTypeBoxMediator) {
                this.removeBoxNodeMediator("left");
            }
            if(this.rightNodeTypeBoxMediator) {
                this.removeBoxNodeMediator("right");
            }
        },

        _attachTypeBoxToRightNode : function (boxNodeMediator) {

            this.rightArrowModel.setAttached(true);
            var box = boxNodeMediator.typeController.model.model.name;
            this.rightArrowModel.model.children['attachedBox'].set(box)

            this.rightNodeTypeBoxMediator = boxNodeMediator;

        },

        _attachTypeBoxToLeftNode : function (boxNodeMediator) {

            this.leftArrowModel.setAttached(true);
            var box = boxNodeMediator.typeController.model.model.name;
            this.leftArrowModel.model.children['attachedBox'].set(box);
            this.leftNodeTypeBoxMediator = boxNodeMediator;
        },

        /*  update a node model using coordinates */
        update : function (node, x, y, overRideConstraints) {
            switch(node) {

            case "left" :
                this.updateLeftArrow(x, y, overRideConstraints);
                break;
            case "proximal" :
                this.updateProximalNode(x, y);
                break;
            case "distal" :
                this.updateDistalNode(x,y);
                break;
            case "right" :
                this.updateRightArrow(x,y, overRideConstraints);
                break;
            }
        },

        /* update a node model when you have the difference in x and y */
        updateUsingDifference : function (orientation, dx, dy) {

            var x, y;
            switch(orientation) {

            case "left" :
                x = this.leftArrowModel.getXCood() + dx;
                y = this.leftArrowModel.getYCood() + dy;

                var proximalNodeXCood = this.proximalNodeModel.getXCood();

                this.leftArrowModel.setXCood(
                    this.leftNodeTypeBoxMediator.calculateNodeXCood(proximalNodeXCood)
                );
                this._setLeftArrowDirection();
                this.leftArrowModel.setYCood(y);
                this.proximalNodeModel.setYCood(y);
                break;

            case "right" :

                x = this.rightArrowModel.getXCood() + dx;
                y = this.rightArrowModel.getYCood() + dy;

                var distalNodeXCood = this.distalNodeModel.getXCood();

                this.rightArrowModel.setXCood(
                    this.rightNodeTypeBoxMediator.calculateNodeXCood(distalNodeXCood)
                )

                this.setRightArrowDirection();

                this.rightArrowModel.setYCood(y);
                this.distalNodeModel.setYCood(y);

                break;
            }
        },

        // make request to join a node to a type box
        fireAttachRequest : function (orientation) {
            this.connectorModel.fire("attachRequest", this, orientation)
        },

        // update from node controller
        updateLeftArrow : function (x, y, overRideConstraints) {

            if(this._leftArrowAttached()) {
                var currentX = this.leftArrowModel.getXCood();
                var currentY = this.leftArrowModel.getYCood();
                if(!overRideConstraints) {
                    var coods = this.leftNodeTypeBoxMediator
                        .getLeftNodeCoods(x, y, currentX, currentY);

                    x = coods.x;
                    y = coods.y;

                }

            }
            this.leftArrowModel.setXCood(x);
            this.leftArrowModel.setYCood(y);
            this.proximalNodeModel.setYCood(y);
            this._setLeftArrowDirection();

        },

        updateProximalNode : function (x, y) {

            if(this._rightArrowAttached()) {

                /*
                    align right node according to the position of the proximal node
                    in relation to the type box.
                */

                this.rightArrowModel.setXCood(
                    this.rightNodeTypeBoxMediator.calculateNodeXCood(x)
                )
            }

            if(this._leftArrowAttached() ) {

                var currentX = this.proximalNodeModel.getXCood();
                var currentY = this.proximalNodeModel.getYCood();

                // ask mediator if we can move this node
                var coods = this.leftNodeTypeBoxMediator.getProximalNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;


                this.leftArrowModel.setXCood(
                    this.leftNodeTypeBoxMediator.calculateNodeXCood(x)
                );
            }

            this.setRightArrowDirection();
            this._setLeftArrowDirection();
            this.proximalNodeModel.setXCood(x);
            this.proximalNodeModel.setYCood(y);
            this.leftArrowModel.setYCood(y);
            this.distalNodeModel.setXCood(x);
        },

        updateDistalNode : function (x, y) {

            if(this._rightArrowAttached()) {
                var currentX = this.distalNodeModel.getXCood();
                var currentY = this.distalNodeModel.getYCood();

                // ask mediator if we can move this node
                var coods = this.rightNodeTypeBoxMediator.getDistalNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;


                /*
                    align right node according to the position of the distal node
                    in relation to the type box.
                */

                this.rightArrowModel.setXCood(
                    this.rightNodeTypeBoxMediator.calculateNodeXCood(x)
                )
            }

            if(this._leftArrowAttached() ) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */

                this.leftArrowModel.setXCood(
                    this.leftNodeTypeBoxMediator.calculateNodeXCood(x)
                );
            }

            this.setRightArrowDirection();
            this._setLeftArrowDirection();

            this.distalNodeModel.setXCood(x);
            this.distalNodeModel.setYCood(y);
            this.proximalNodeModel.setXCood(x);

            this.rightArrowModel.setYCood(y);
        },

        updateRightArrow : function (x, y, overRideConstraints) {

            if(this._rightArrowAttached()) {
                /*
                    if we're currently attached to a type box,  check against
                    the mediator if the proposed coods are acceptable
                */
                if(!overRideConstraints) {
                    var currentX = this.rightArrowModel.getXCood();
                    var currentY = this.rightArrowModel.getYCood();

                    var coods = this.rightNodeTypeBoxMediator
                        .getRightNodeCoods(x, y, currentX, currentY);

                    x = coods.x;
                    y = coods.y;
                }
            }


            this.rightArrowModel.setXCood(x);
            this.rightArrowModel.setYCood(y);
            this.distalNodeModel.setYCood(y);

            this.setRightArrowDirection();

        },

        setRightArrowDirection : function () {

            if(this.rightArrowModel.getXCood() <
                this.proximalNodeModel.getXCood()) {

                this.rightArrowModel.setArrowDirection("left");

            } else {
                this.rightArrowModel.setArrowDirection("right");
            }
            this.rightArrowModel.broadcast("change")

        },

        _setLeftArrowDirection : function () {

            if(this.leftArrowModel.getXCood() <
                this.proximalNodeModel.getXCood()) {

                this.leftArrowModel.setArrowDirection("left");

            } else {
                this.leftArrowModel.setArrowDirection("right");
            }
            this.leftArrowModel.broadcast("change")

        },

        _rightArrowAttached : function () {

            return this.rightArrowModel.isAttached();
        },

        _leftArrowAttached : function () {

            return this.leftArrowModel.isAttached();
        }




    });
});
