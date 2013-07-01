define(["core/BaseType",
         ],function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.leftArrowModel = options.leftArrowModel;
            this.proximalNodeModel = options.proximalNodeModel;
            this.distalNodeModel = options.distalNodeModel;
            this.rightArrowModel = options.rightArrowModel;

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

        _attachTypeBoxToRightNode : function (boxNodeMediator) {

            this.rightNodeAttached = true;
            this.rightNodeTypeBoxMediator = boxNodeMediator;

        },

        _attachTypeBoxToLeftNode : function (boxNodeMediator) {

            this.leftNodeAttached = true;
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
                x = this.leftArrowModel.children['xCood'].value + dx;
                y = this.leftArrowModel.children['yCood'].value + dy;


                //this.leftArrowModel.children['xCood'].set(x);
                var proximalNodeXCood = this.proximalNodeModel.children['xCood'].value;

                if( proximalNodeXCood > this.leftNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.leftArrowModel.children['xCood'].set(
                        this.leftNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                else if( proximalNodeXCood < this.leftNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.leftArrowModel.children['xCood'].set(
                        this.leftNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                } else {

                    this.leftArrowModel.children['xCood'].set(x);
                }

                this.leftArrowModel.children['yCood'].set(y);
                this.proximalNodeModel.children['yCood'].set(y);
                break;

            case "right" :

                x = this.rightArrowModel.children['xCood'].value + dx;
                y = this.rightArrowModel.children['yCood'].value + dy;

                var distalNodeXCood = this.distalNodeModel.children['xCood'].value;

                if( distalNodeXCood > this.rightNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.rightArrowModel.children['xCood'].set(
                        this.rightNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                else if( distalNodeXCood < this.rightNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.rightArrowModel.children['xCood'].set(
                        this.rightNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                } else {

                    this.rightArrowModel.children['xCood'].set(x);
                }
                this.rightArrowModel.children['yCood'].set(y);
                this.distalNodeModel.children['yCood'].set(y);

                break;
            }


        },

        // make request to join a node to a type box
        fireAttachRequest : function (orientation) {

            switch( orientation ) {
            // all do same thing. this is more of a semantic thing.
            case "left" :
                this.leftArrowModel.fire("attachRequest", this, orientation)
                break;
            case "proximal" :
                this.proximalNodeModel.fire("attachRequest", this, orientation);
                break;
            case "distal" :
                this.distalNodeModel.fire("attachRequest", this, orientation);
                break;
            case "right" :
                this.rightArrowModel.fire("attachRequest", this, orientation);
                break;
            }
        },

        // update from node controller
        updateLeftArrow : function (x, y) {

            if(this.leftNodeAttached) {
                var currentX = this.leftArrowModel.children['xCood'].value;
                var currentY = this.leftArrowModel.children['yCood'].value;

                var coods = this.leftNodeTypeBoxMediator.getLeftNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;

            }
            this.leftArrowModel.children['xCood'].set(x);
            this.leftArrowModel.children['yCood'].set(y);
            this.proximalNodeModel.children['yCood'].set(y);

        },

        updateProximalNode : function (x, y) {

            if(this.rightNodeAttached) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.rightNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.rightArrowModel.children['xCood'].set(
                        this.rightNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.rightNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.rightArrowModel.children['xCood'].set(
                        this.rightNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }
            }

            if(this.leftNodeAttached) {

                var currentX = this.proximalNodeModel.children['xCood'].value;
                var currentY = this.proximalNodeModel.children['yCood'].value;

                // ask mediator if we can move this node
                var coods = this.leftNodeTypeBoxMediator.getProximalNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.leftNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.leftArrowModel.children['xCood'].set(
                        this.leftNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.leftNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.leftArrowModel.children['xCood'].set(
                        this.leftNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }

            }
            this.proximalNodeModel.children['xCood'].set(x);
            this.proximalNodeModel.children['yCood'].set(y);
            this.leftArrowModel.children['yCood'].set(y);
            this.distalNodeModel.children['xCood'].set(x);

        },

        updateDistalNode : function (x, y) {

            if(this.rightNodeAttached) {
                var currentX = this.distalNodeModel.children['xCood'].value;
                var currentY = this.distalNodeModel.children['yCood'].value;

                // ask mediator if we can move this node
                var coods = this.rightNodeTypeBoxMediator.getDistalNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;


                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.rightNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.rightArrowModel.children['xCood'].set(
                        this.rightNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.rightNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.rightArrowModel.children['xCood'].set(
                        this.rightNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }

            }

            if(this.leftNodeAttached) {

                /*
                    move right arrow node onto right or left edge of box
                    if distal node extends too far in either direction.
                */
                if( x > this.leftNodeTypeBoxMediator.getBoxRightLimit()) {

                    this.leftArrowModel.children['xCood'].set(
                        this.leftNodeTypeBoxMediator.getBoxRightLimit()
                    );
                }
                if( x < this.leftNodeTypeBoxMediator.getBoxLeftLimit()) {

                    this.leftArrowModel.children['xCood'].set(
                        this.leftNodeTypeBoxMediator.getBoxLeftLimit()
                    );
                }

            }
            this.distalNodeModel.children['xCood'].set(x);
            this.distalNodeModel.children['yCood'].set(y);
            this.proximalNodeModel.children['xCood'].set(x);
            this.rightArrowModel.children['yCood'].set(y);

        },

        updateRightArrow : function (x, y) {

            if(this.rightNodeAttached) {
                /*
                    if we're currently attached to a type box,  check against
                    the mediator if the proposed coods are acceptable
                */
                var currentX = this.rightArrowModel.children['xCood'].value;
                var currentY = this.rightArrowModel.children['yCood'].value;

                var coods = this.rightNodeTypeBoxMediator.getRightNodeCoods(x, y, currentX, currentY);

                x = coods.x;
                y = coods.y;
            }
            this.rightArrowModel.children['xCood'].set(x);
            this.rightArrowModel.children['yCood'].set(y);
            this.distalNodeModel.children['yCood'].set(y);

        }




    });
});
