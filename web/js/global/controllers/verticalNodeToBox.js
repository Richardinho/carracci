define(['BaseType',
        'ArrowVCoordinator',
        'BoxVCoordinator',
        'ProximalNodeVCoordinator',
        'DistalNodeVCoordinator'],function (BaseType,
                                           ArrowVCoordinator,
                                           BoxVCoordinator,
                                           ProximalNodeVCoordinator,
                                           DistalNodeVCoordinator ) {

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

            this.xOffset = 0;

            this.players = options;

            this._moveArrowOntoBox();

            for(var role in this.players) {

                this.players[role].addCoordinator(this._getCoordinator(role));
            }
        },

        destroy : function () {
            for(var role in this.players) {

                this.players[role].removeCoordinator(this._getCoordinatorId(role));
            }
        },

        _moveArrowOntoBox : function () {
            var x = this.players['box'].get('xCood'),
                y = this.players['box'].get('yCood');

            this.players['arrow'].update(x, y, true);
        },

        _getCoordinatorId : function (role) {
            return this.roleIds[role];
        },

        setXOffset : function () {
            this.xOffset = this.players['arrow'].get('xCood') - this.players['box'].get('xCood');
        },

        getXOffset : function () {
            return this.xOffset;
        },

        _getCoordinator : function (role) {
            var coordinator,
                that = this; // need to pass this context to the coordinators.

            switch(role) {

                case "box" :
                    coordinator = new BoxVCoordinator({ players : this.players, mainCoordinator : this });
                break;

                case "arrow" :
                    coordinator = new ArrowVCoordinator({ players : this.players, mainCoordinator : this  });
                break;

                case "distalNode" :
                    coordinator = new DistalNodeVCoordinator({ players : this.players, mainCoordinator : this  });
                break;

                case "proximalNode" :
                    coordinator = new ProximalNodeVCoordinator({ players : this.players, mainCoordinator : this  });
                break;
            }

            this.roleIds[role] = coordinator.id;

            return coordinator;
        }
    });
});