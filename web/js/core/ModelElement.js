//  ModelElement

define(['Model', 'Collection'], function (Model, Collection) {

    return Model.extend({


        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.coordinators = new Collection([]);
            this.name = options.name;

            this.set({ yCood : options.y });
            this.set({ xCood : options.x });
        },

        updateX : function (x, validate) {
            this.update(x, this.get('yCood'), validate);
        },

        updateY : function (y, validate) {
            this.update(this.get('xCood'), y, validate);
        },

        // this is overriden in subclasses to give them a chance to handle the update call.
        // subclasses should first call this parent method before doing anything else.

        update : function (x, y, validate) {

            var valid = (validate !== undefined) ? validate : true;
            // flag to show that we wish to validate. Only set when this is the component which is setting itself.
            if (valid) {
                //  determine whether the proposed x value is permitted.
                //  iterate through all validators
                var xisValid = this.coordinators.all(function(coordinator) {
                    return coordinator.validateX.call( coordinator, x );
                });
                //  if not permitted, reset x to current value
                if (! xisValid ) {
                    x = this.get('xCood');
                }
                // do same with y coordinate
                var yisValid = this.coordinators.all(function(coordinator) {
                    return coordinator.validateY.call( coordinator, y);
                });

                if(! yisValid ) {
                    y = this.get('yCood');
                }

                // set new y cood
                this.set({ yCood : y });


                //  do same with x
                this.set({ xCood : x });

                this.updateAssociatedComponents();

            //  else we are just updating the component. This should only be from other components.
            } else {
                this.set({ yCood : y });
                this.set({ xCood : x });
            }

            //  not sure about this:
            //  this calls post processing for all components
            //  might be better to have a single post processing method that is only called by the
            //  component which is being changed (i.e. once, not for every component)
            this.coordinators.each(function(index,coordinator) {
                coordinator.postProcess.call(coordinator, x, y);
            });
        },

        updateAssociatedComponents : function () {
            // set y value on all associated components
            this.coordinators.each(function(index,coordinator) {
                coordinator.setYCoods.call(coordinator, this.get('yCood'));
            }, this);

            this.coordinators.each(function(index,coordinator) {
                coordinator.setXCoods.call(coordinator, this.get('xCood'));
            }, this);
        },

        addCoordinator : function (coordinator) {
            this.coordinators.add(coordinator);
        },

        removeCoordinator: function (id) {
            this.coordinators.deleteModel(id);
        },

        getTypePrefix : function () {
            return ModelElement;
        }

    });
});