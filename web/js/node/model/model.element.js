//  ModelElement

define(['Model', 'Collection'], function (Model, Collection) {

    return Model.extend({


        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.validators = [];
            this.fooValidators = new Collection([]);
            this.id = options.id;
            this.updateCoordinates(options.x, options.y);
        },

        updateX : function (x, validate) {
            this.update(x, this.get('yCood'), validate);
        },

        updateY : function (y, validate) {
            this.update(this.get('xCood'), y, validate);
        },

        updateCoordinates : function (x, y, validate) {

        // What I need to do to fix the 'Parents problem' is:
        // Each component should be validated first- that is; can it move?
        // if it can then we proceed to call all 'listeners' and move them accordingly.
        // if not, then we don't, because our component wont be moving.
        // However: what if x validates, but y doesn't? We may need to do this on
        // a per coordinate basis.
        // What about validating other components?
        // Validators should involve all constraints on this components. These constraints
        // may also apply to other components.
        // Once we finish validating, we should guarantee that the movement of any other component
        // is going to break any of this component's validation rules.

            var valid = (validate !== undefined) ? validate : true;
            // flag to show that we wish to validate. Only set when this is the component which is setting itself.
            if (valid) {

                //  determine whether the proposed x value is permitted.
                //  iterate through all validators
                var xisValid = this.fooValidators.all(function(validator) {
                    return validator.validateX.call( validator.context, x );
                });
                //  if not permitted, reset x to current value
                if (! xisValid ) {
                    x = this.get('xCood');
                }
                // do same with y coordinate
                var yisValid = this.fooValidators.all(function(validator) {
                    return validator.validateY.call( validator.context, y);
                });

                if(! yisValid ) {
                    y = this.get('yCood');
                }

                // set new y cood
                this.set({ yCood : y });

                // set y value on all associated components
                this.fooValidators.each(function(index,validator) {
                    validator.setYCoods.call(validator.context, y);
                });

                //  do same with x
                this.set({ xCood : x });

                this.fooValidators.each(function(index,validator) {
                    validator.setXCoods.call(validator.context, x);
                });

            //  else we are just updating the component. This should only be from other components.
            } else {
                this.set({ yCood : y });
                this.set({ xCood : x });
            }

            //  not sure about this:
            //  this calls post processing for all components
            //  might be better to have a single post processing method that is only called by the
            //  component which is being changed (i.e. once, not for every component)
            this.fooValidators.each(function(index,validator) {
                validator.postProcess.call(validator.context, x, y);
            });
        },

        addValidator : function (validator) {
            this.fooValidators.add(validator);
        }

    });
});