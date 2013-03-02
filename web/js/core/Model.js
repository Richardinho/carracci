define(["BaseType"],function (extend) {

    return extend.extend({

        // todo: in the model: we should make a distinction between those properties which are going
        // to change (and hence fire change events) and those which wont change.
        // the former define the state of the model
        // the latter define it's dependencies. e.g. helper objects necessary for the functionality.

        initialize : function (options) {
            this.internalObj = {};
            this._listeners = [];

        },

        foo : function () {
            alert("halelujah!")
        },

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