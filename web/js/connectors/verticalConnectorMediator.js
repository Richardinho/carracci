define(['BaseType'], function (BaseType) {


    return BaseType.extend ({
        /* this type mediates between the nodes of which a connector is comprised. For every movement
        on a node, it makes sure other nodes are appropriately updated. */

        initialize : function (options) {

            this.players = options;

            for(var role in this.players) {

                this.players[role].addCoordinator(this._getCoordinator(role));

            }

        },


        _getCoordinator : function (role) {

            var coordinator,
                that = this;

            switch(role) {

                case "topArrow" :
                    coordinator = {

                        players : that.players,

                        validateX : function (x) {
                            return true;
                        },
                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {
                            this.players["distalNode"].updateX(x, false)
                        },
                        setYCoods : function (y) {},

                        postProcess : function (x, y) {
                            if(this.players["distalNode"].get('yCood')  < y) {
                                this.players["topArrow"]._getArrowModel().setDirection("bottom");
                            } else {
                                this.players["topArrow"]._getArrowModel().setDirection("top");
                            }
                            this.players["topArrow"].updateArrow();
                        }
                    };
                break;

                case "proximalNode" :
                    coordinator = {

                        players : that.players,

                        validateX : function (x) {
                            return true
                        },

                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {
                            this.players["bottomArrow"].updateX(x, false)
                        },
                        setYCoods : function (y) {
                            this.players["distalNode"].updateY(y, false)
                        },

                        postProcess : function (x, y) {
                            /*if(this.players["leftArrow"].get('xCood')  < x) {
                                this.players["leftArrow"]._getArrowModel().setDirection("left");
                            } else {
                                this.players["leftArrow"]._getArrowModel().setDirection("right");
                            }
                            this.players["leftArrow"].updateArrow();

                            if(this.players["rightArrow"].get('xCood')  < x) {
                                this.players["rightArrow"]._getArrowModel().setDirection("left");
                            } else {
                                this.players["rightArrow"]._getArrowModel().setDirection("right");
                            }
                            this.players["rightArrow"].updateArrow();*/
                        }
                    };
                break;

                case "distalNode" :
                    // there are no constraints on how the distal node moves.
                    coordinator = {

                        players : that.players,
                        validateX : function (x) {
                            return true;
                        },
                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {
                            this.players["topArrow"].updateX(x, false);
                        },
                        setYCoods : function (y) {
                            this.players["proximalNode"].updateY(y, false)
                        },

                        postProcess : function (x, y) {
                            if(this.players["topArrow"].get('yCood')  < y) {
                                this.players["topArrow"]._getArrowModel().setDirection("top");
                            } else {
                                this.players["topArrow"]._getArrowModel().setDirection("bottom");
                            }
                            this.players["topArrow"].updateArrow();

                            if(this.players["bottomArrow"].get('yCood')  < y) {
                                this.players["bottomArrow"]._getArrowModel().setDirection("top");
                            } else {
                                this.players["bottomArrow"]._getArrowModel().setDirection("bottom");
                            }
                            this.players["bottomArrow"].updateArrow();
                        }
                    };
                break;

                case "bottomArrow" :
                    coordinator = {

                        players : that.players,

                        validateX : function (x) {
                            return true;
                        },
                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {
                            // false flag is to ensure that the proxmial node is only updated- it will not call back into the mediator.
                            this.players["proximalNode"].updateX(x, false)

                        },
                        setYCoods : function (y) { },

                        postProcess : function (x, y) {
                            if(this.players["proximalNode"].get('yCood')  < y) {
                                this.players["bottomArrow"]._getArrowModel().setDirection("bottom");
                            } else {
                                this.players["bottomArrow"]._getArrowModel().setDirection("top");
                            }
                            this.players["bottomArrow"].updateArrow();
                        }
                    };
                break;

            }
            return coordinator;
        }


    });
});



