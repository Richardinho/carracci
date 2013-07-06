define(["core/BaseType",
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
        update : function (node, x, y) {
            switch(node) {

            case "left" :
                this.updateLeftArrow(x, y);
                break;
            case "proximal" :
                this.updateProximalNode(x, y);
                break;
            case "distal" :
                this.updateDistalNode(x,y);
                break;
            case "right" :
                this.updateRightArrow(x,y);
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


                //this.leftArrowModel.children['xCood'].set(x);
                var proximalNodeXCood = this.proximalNodeModel.getXCood();

                if( proximalNodeXCood > this.leftNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.leftArrowModel.setXCood(
                        this.leftNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                else if( proximalNodeXCood < this.leftNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.leftArrowModel.setXCood(
                        this.leftNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                } else {

                    this.leftArrowModel.setXCood(x);

                }
                this._setLeftArrowDirection();
                this.leftArrowModel.setYCood(y);
                this.proximalNodeModel.setYCood(y);
                break;

            case "right" :

                x = this.rightArrowModel.getXCood() + dx;
                y = this.rightArrowModel.getYCood() + dy;

                var distalNodeXCood = this.distalNodeModel.getXCood();

                if( distalNodeXCood > this.rightNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.rightArrowModel.setXCood(
                        this.rightNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                else if( distalNodeXCood < this.rightNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.rightArrowModel.setXCood(
                        this.rightNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                } else {

                    this.rightArrowModel.setXCood(x);
                }
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
        updateLeftArrow : function (x, y) {

            if(this._leftArrowAttached()) {
                var currentX = this.leftArrowModel.getXCood();
                var currentY = this.leftArrowModel.getYCood();

                var coods = this.leftNodeTypeBoxMediator.getLeftNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;

            }
            this.leftArrowModel.setXCood(x);
            this.leftArrowModel.setYCood(y);
            this.proximalNodeModel.setYCood(y);
            this._setLeftArrowDirection();

        },

        updateProximalNode : function (x, y) {

            if(this._rightArrowAttached()) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.rightNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.rightArrowModel.setXCood(
                        this.rightNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.rightNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.rightArrowModel.setXCood(
                        this.rightNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }
            }

            if(this._leftArrowAttached() ) {

                var currentX = this.proximalNodeModel.getXCood();
                var currentY = this.proximalNodeModel.getYCood();

                // ask mediator if we can move this node
                var coods = this.leftNodeTypeBoxMediator.getProximalNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.leftNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.leftArrowModel.setXCood(
                        this.leftNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.leftNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.leftArrowModel.setXCood(
                        this.leftNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }
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
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.rightNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.rightArrowModel.setXCood(
                        this.rightNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.rightNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.rightArrowModel.setXCood(
                        this.rightNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }
            }

            if(this._leftArrowAttached() ) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.leftNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.leftArrowModel.setXCood(
                        this.leftNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.leftNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.leftArrowModel.setXCood(
                        this.leftNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }
            }

            this.setRightArrowDirection();
            this._setLeftArrowDirection();

            this.distalNodeModel.setXCood(x);
            this.distalNodeModel.setYCood(y);
            this.proximalNodeModel.setXCood(x);

            this.rightArrowModel.setYCood(y);
        },

        updateRightArrow : function (x, y) {

            if(this._rightArrowAttached()) {
                /*
                    if we're currently attached to a type box,  check against
                    the mediator if the proposed coods are acceptable
                */
                var currentX = this.rightArrowModel.getXCood();
                var currentY = this.rightArrowModel.getYCood();

                var coods = this.rightNodeTypeBoxMediator.getRightNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;
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
