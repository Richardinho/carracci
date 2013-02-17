Glenmorangie.namespace("Glenmorangie.Coordinator");

Glenmorangie.Coordinator.AttachedNodeToBox = Glenmorangie.utils.extend ({

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
        this.arrowYOffset = 25;
        this._moveArrowOntoBox();

        for(var role in this.players) {

            this.players[role].addFooValidator(this._getValidator(role));

        }





    },

    _getValidator : function (role) {
        var validator,
            that = this;
        //  these constraints are how the objects are allowed to be moved.
        //  No constraints are applied as to how a component can be moved by another component.
        switch(role) {

            case "box" :
                validator = {

                    context : that,
                    // there are no constraints on the box
                    validateX : function (x) {
                        return true;
                    },
                    validateY : function (y) {
                        return true;
                    },
                    setXCoods : function(x) {
                        var arrowXCood = x,
                            arrowModel = this.players["arrow"],
                            proximalNode = this.players["proximalNode"],
                            box = this.players["box"];
                            rightEdge = x + box.getWidth();

                        if(proximalNode.get('xCood') > rightEdge) {
                            arrowXCood = x + box.getWidth();
                        }
                        arrowModel.updateX(arrowXCood, false);
                    },
                    setYCoods : function (y) {
                        var arrowModel = this.players["arrow"];

                        arrowModel.updateY( y + this.arrowYOffset, true);
                    },

                    postProcess : function (x, y) {

                    }
                };
            break;

            case "arrow" :
                validator = {

                    context : that,
                    // the arrow is not allowed to be moved in the x axis.
                    validateX : function (x) {
                        return false;
                    },
                    //  the arrow is limited by in the y axis by the upper and lower y limits of the box.
                    validateY : function (y) {
                        var box = this.players["box"],
                            upperYLimit =  box.get('yCood'),
                            lowerYLimit = upperYLimit + box.get('height');
                        return (y > upperYLimit && y < lowerYLimit);
                    },
                    setXCoods : function(x) {

                    },
                    setYCoods : function (y) {

                    },

                    postProcess : function (x, y) {

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

                         var rightEdgexCood = this.players["box"].get('width') + this.players["box"].get('xCood');

                         if(x > rightEdgexCood) {
                             this.players["arrow"].set({ "xCood" : rightEdgexCood });
                         } else {
                             this.players["arrow"].set({"xCood" : this.players["box"].get('xCood') } );
                         }

                    },
                    setYCoods : function (y) {
                        //  do nothing
                    },

                    postProcess : function (x, y) {

                    }
                };
            break;

            case "proximalNode" :
                validator = {
                    context : that,
                    //  there are no constraints on the proximal node in the x axis.
                    validateX : function (x) {
                        return true;
                    },
                    // the proximal node has the same y axis constraints as the arrow
                    validateY : function (y) {
                        var box = this.players["box"],
                            upperYLimit =  box.get('yCood'),
                            lowerYLimit = upperYLimit + box.get('height');
                        return (y > upperYLimit && y < lowerYLimit);
                    },
                    setXCoods : function(x) {

                         var rightEdgexCood = this.players["box"].get('width') + this.players["box"].get('xCood');

                         if(x > rightEdgexCood) {
                             this.players["arrow"].set({ "xCood" : rightEdgexCood });
                         } else {
                             this.players["arrow"].set({"xCood" : this.players["box"].get('xCood') } );
                         }
                    },
                    setYCoods : function (y) {
                        //  do nothing
                    },

                    postProcess : function (x, y) {

                    }
                };
            break;

        }
        return validator;
    },

    _moveArrowOntoBox : function () {

        var x = this.players['box'].get('xCood');
        var y = this.players['box'].get('yCood') + this.arrowYOffset;
        console.log("move on to box", x, y)
        this.players['arrow'].update(x, y, true);
    }

});



