define(["core/BaseType"],

        function (
            BaseType
        ) {
    /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

    return BaseType.extend({

        initialize : function (options) {
            this.model = options.model;
            this.listeners = {};

            this.model.on("change", this.changeHandler, this);
            this.model.on("create", this.changeHandler, this);
        },

        on : function (event, handler, context) {

            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push([handler, context]);
        },

        changeHandler : function () {
            this.fire("update");
        },

        fire : function (event) {

            var listeners = this.listeners[event];

            if (listeners) {
                //  get rest of arguments
                var args =  Array.prototype.slice.call(arguments, 1);
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i][0].apply(listeners[i][1], args);
                }
            }
        },

        getName : function () {
            debugger;
            return this.model.name;
        },

        setCoods : function (x, y) {
            this.model.children['xCood'].set(x);
            this.model.children['yCood'].set(y);
            this.fire("move");
        },

        getFlavor : function () {

            return this.model.children['flavor'].value;
        },

        getXCood : function () {

            return this.model.children['xCood'].value;
        },

        getYCood : function () {

            return this.model.children['yCood'].value;
        },

        getMethods : function () {

            var meths = this.model.unwrap().methods;
            return meths;
        },

        getProperties : function () {

            return this.model.unwrap().properties;
        }


    });
});

