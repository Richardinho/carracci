define(['BaseType',
        'ArrowCoordinator',
        'BoxCoordinator',
        'ProximalNodeCoordinator',
        'DistalNodeCoordinator'],function (BaseType,
                                           ArrowCoordinator,
                                           BoxCoordinator,
                                           ProximalNodeCoordinator,
                                           DistalNodeCoordinator ) {

    return BaseType.extend ({

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
            this.roleIds = {};

            if (!options || !options.box || !options.arrow || !options.proximalNode || !options.distalNode ) {

                throw {
                    name : "incorrectOptionsError",
                    message : "You must supply a box and arrow component on intialization"
                };
            }

            this.players = options;

            this._moveArrowOntoBox();

            for(var role in this.players) {

                this.players[role].addValidator(this._getCoordinator(role));
            }
        },

        destroy : function () {
            for(var role in this.players) {

                this.players[role].removeValidator(this._getCoordinatorId(role));
            }
        },

        _moveArrowOntoBox : function () {
            var x = this.players['box'].get('xCood'),
                y = this.players['box'].get('yCood'),
                height = this.players['box'].get('height'),
                newArrowYPosition = y + (height/ 2);
            this.players['arrow'].update(x, newArrowYPosition, true);
        },

        _getCoordinatorId : function (role) {
            return this.roleIds[role];
        },

        _getCoordinator : function (role) {
            var coordinator,
                that = this; // need to pass this context to the coordinators.

            debugger;
            switch(role) {

                case "box" :
                    coordinator = new BoxCoordinator({ players : this.players, context : this });
                break;

                case "arrow" :
                    coordinator = new ArrowCoordinator({ players : this.players, context : this  });
                break;

                case "distalNode" :
                    coordinator = new DistalNodeCoordinator({ players : this.players, context : this  });
                break;

                case "proximalNode" :
                    coordinator = new ProximalNodeCoordinator({ players : this.players, context : this  });
                break;
            }

            this.roleIds[role] = coordinator.id;

            return coordinator;
        }
    });
});