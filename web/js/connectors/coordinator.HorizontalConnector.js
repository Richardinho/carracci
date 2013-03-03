define(['BaseType'], function (extend) {


    return extend.extend ({

        // role playing game pattern.
        // components register to participate as 'players' in a game
        // they take turns to 'play' in a game.
        // the 'rules' regulate their behaviour according to what role they are playing
        // some central figure (games master) governs the whole process.
        // the game is of a temporary nature and must have a clearly delineated beginning and an end


        //  this controller should define constraints for the components as to how they move.
        //  it should also define how components move in response to the movements of other components.

        //  When a player wishes to move, the games master determines if they are allowed to move or not.
        //  If they do move, the games master then moves other players in response.
        initialize : function (options) {

            this.players = options;

            for(var role in this.players) {

                this.players[role].addValidator(this._getValidator(role));

            }

        },

        _getValidator : function (role) {
            var validator,
                that = this;
            //  these constraints are how the objects are allowed to be moved.
            //  No constraints are applied as to how a component can be moved by another component.
            switch(role) {

                case "leftArrow" :
                    validator = {

                        context : that,

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
                    validator = {

                        context : that,
                        // the arrow is not allowed to be moved in the x axis.
                        validateX : function (x) {
                            return true
                        },
                        //  the arrow is limited by in the y axis by the upper and lower y limits of the box.
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
                    // there are no constraints on how the distal node moves.
                    validator = {
                        context : that,
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
                    validator = {
                        context : that,
                        //  there are no constraints on the proximal node in the x axis.
                        validateX : function (x) {
                            return true;
                        },
                        // the proximal node has the same y axis constraints as the arrow
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
            return validator;
        }


    });
});



