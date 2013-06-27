
define(["core/BaseType"],function (BaseType) {

    return BaseType.extend({

        initialize : function (options) {
            this.internalObj = {};
            this._listeners = [];

            for (var prop in options) {
                this.internalObj[prop] = options[prop];
            }
        },

        get : function (property) {
            return this.internalObj[property];
        },

        setAttributes : function (attributes) {

            for(var attribute in attributes) {
                this.set(attribute, attributes[attribute]);
            }
        },

        set : function( attribute, value ) {

            this.internalObj[attribute] = value;
        },

        on : function (event, callback, cont) {
            var context = cont ? cont : this;
            this._listeners.push({ "event" : event, "callback" : callback, "context" : context });
        },

        fire : function (eventName, value) {

            for(var i = 0; i < this._listeners.length; i++) {
                var listener = this._listeners[i];
                if(listener.event === eventName) {
                    listener.callback.call(listener.context, value);
                }
            }
        }
    });
});