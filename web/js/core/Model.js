//  Model

define(["BaseType"],function (extend) {

    return extend.extend({


        initialize : function (options) {
            this.internalObj = {};
            this._listeners = [];
        },
        // todo: turn get and set into private (or protected) methods.
        get : function (property) {
            return this.internalObj[property];
        },

        set : function () {

            var attributes = arguments[0],
                options = arguments[1],
                silent = options && options.silent ? options.silent : false;

            for(var attribute in attributes) {
                this._setAttribute(attribute, attributes[attribute], silent);
            }
        },

        _setAttribute : function(attribute, value, silent) {
        //  toDo: remove the automatic firing of events.
        //  it's simply far too clunky
        // this model should be simple.
        // it should be the job of sub types to have custom
        // set methods which express the nature of the mutation occurred
        // and fire off appropriate events
        // only the model types should use get and set which should become private.
            var oldValue = this.get(attribute);
            this.internalObj[attribute] = value;
            if(!silent && oldValue !== value) {
                this._fire("change:" + attribute, value);
                this._fire("change", value);
            }

        },

        on : function (event, callback, cont) {
            var context = cont ? cont : this;
            this._listeners.push({ "event" : event, "callback" : callback, "context" : context });
        },
        // todo : turn into public method
        _fire : function (eventName, value) {

            for(var i = 0; i < this._listeners.length; i++) {
                var listener = this._listeners[i];
                if(listener.event === eventName) {
                    listener.callback.call(listener.context, value);
                }
            }
        },

        //  this should convert the model to a json object
        //  we might also create a factory method which will generate a Model object from  a json object.
        toJSON : function() {
            return this.internalObj;
        }

    });

});