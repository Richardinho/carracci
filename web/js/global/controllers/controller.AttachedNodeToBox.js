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


        // this is actually the mediator pattern.
        initialize : function (options) {
            this.roleIds = {};

            if (!options || !options.box || !options.arrow || !options.proximalNode || !options.distalNode ) {

                throw {
                    name : "incorrectOptionsError",
                    message : "You must supply a box and arrow component on intialization"
                };
            }
            this.yOffset = 0;



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

        setYOffset : function () {
            this.yOffset = this.players['arrow'].get('yCood') - this.players['box'].get('yCood')  ;
        },

        getYOffset : function () {
            return this.yOffset;
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

            switch(role) {

                case "box" :
                    coordinator = new BoxCoordinator({ players : this.players, mainCoordinator : this });
                break;

                case "arrow" :
                    coordinator = new ArrowCoordinator({ players : this.players, mainCoordinator : this  });
                break;

                case "distalNode" :
                    coordinator = new DistalNodeCoordinator({ players : this.players, mainCoordinator : this });
                break;

                case "proximalNode" :
                    coordinator = new ProximalNodeCoordinator({ players : this.players, mainCoordinator : this });
                break;
            }

            this.roleIds[role] = coordinator.id;

            return coordinator;
        }
    });
});