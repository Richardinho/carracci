Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.Element = Glenmorangie.Model.extend({


    initialize : function (options) {

        Glenmorangie.Model.prototype.initialize.call(this, options);
        this.validators = [];
        this.fooValidators = new Glenmorangie.Collection([]);
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

        if(valid) {

            if ( this.fooValidators.all(function(validator) {
                    // validateX has to be called in the context of the attachedNodeToBox controller type.
                    return validator.validateX.call( validator.context, x );
                })
            ) {
                this.set({ xCood : x });
                this.fooValidators.each(function(index,validator) {
                    validator.setXCoods.call(validator.context, x);
                });
            }

            if ( this.fooValidators.all(function(validator) {
                    var result = validator.validateY.call( validator.context, y);
                    return result;
                })
            ) {
                this.set({ yCood : y });
                this.fooValidators.each(function(index,validator) {
                    validator.setYCoods.call(validator.context, y);
                });
            }
            this.fooValidators.each(function(index,validator) {
                    validator.postProcess.call(validator.context, x, y);
            });


        } else {
            this.set({ xCood : x });
            this.set({ yCood : y });
        }
    },

    addFooValidator : function (validator) {
        this.fooValidators.add(validator);
    }

});
