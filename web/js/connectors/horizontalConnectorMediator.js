define(['BaseType'], function (extend) {


    return extend.extend ({

        initialize : function (options) {

            this.players = options;

            for(var role in this.players) {

                this.players[role].addCoordinator(this._getCoordinator(role));
            }
        },

        _getCoordinator : function (role) {

            var coordinator,
                that = this;
            //  these constraints are how the objects are allowed to be moved.
            //  No constraints are applied as to how a component can be moved by another component.
            switch(role) {

                case "leftArrow" :

                    coordinator = {

                        players : that.players,

                        validateX : function (x) {
                            return true;
                        },
                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {

                        },
                        setYCoods : function (y) {
                            this.players["proximalNode"].updateY(y, false)
                        },

                        postProcess : function (x, y) {
                            if(this.players["proximalNode"].get('xCood')  > x) {
                                this.players["leftArrow"]._getArrowModel().setDirection("left");
                            } else {
                                this.players["leftArrow"]._getArrowModel().setDirection("right");
                            }
                            this.players["leftArrow"].updateArrow();
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
                            this.players["distalNode"].updateX(x, false)
                        },
                        setYCoods : function (y) {
                            this.players["leftArrow"].updateY(y, false)
                        },

                        postProcess : function (x, y) {
                            if(this.players["leftArrow"].get('xCood')  < x) {
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
                            this.players["rightArrow"].updateArrow();
                        }
                    };
                break;

                case "distalNode" :

                    coordinator = {

                        players : that.players,
                        validateX : function (x) {
                            return true;
                        },
                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {
                            this.players["proximalNode"].updateX(x, false);
                        },
                        setYCoods : function (y) {
                            this.players["rightArrow"].updateY(y, false)
                        },

                        postProcess : function (x, y) {
                            if(this.players["leftArrow"].get('xCood')  < x) {
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
                            this.players["rightArrow"].updateArrow();
                        }
                    };
                break;

                case "rightArrow" :
                    coordinator = {

                        players : that.players,

                        validateX : function (x) {
                            return true;
                        },

                        validateY : function (y) {
                            return true;
                        },
                        setXCoods : function(x) {

                        },
                        setYCoods : function (y) {
                            this.players["distalNode"].updateY(y, false)
                        },

                        postProcess : function (x, y) {
                            if(this.players["distalNode"].get('xCood')  > x) {
                                this.players["rightArrow"]._getArrowModel().setDirection("left");
                            } else {
                                this.players["rightArrow"]._getArrowModel().setDirection("right");
                            }
                            this.players["rightArrow"].updateArrow();
                        }
                    };
                break;

            }
            return coordinator;
        }
    });
});



