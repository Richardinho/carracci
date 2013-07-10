define(["BaseType"],

        function (
            BaseType
        ) {
    /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

    return BaseType.extend({

        initialize : function (options) {
            this.diagramModel = options.diagramModel;
            this.model = options.model;
            this.listeners = {};

            this.model.on("change", this.changeHandler, this);
            this.model.on("create", this.changeHandler, this);
            this.model.on("deleteProperty", this.changeHandler, this);
            this.model.on("deleteMethod", this.changeHandler, this);
            this.model.on("deleteArgs", this.changeHandler, this);
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
            return this.model.name;
        },

        fireReceiveClickEvent : function (controller) {

            this.model.fire("receiveRequest", controller)
        },

        setCoods : function (x, y) {
            this.model.children['xCood'].set(x);
            this.model.children['yCood'].set(y);
            this.fire("move");
        },

        /*
            setting width and height are special cases where the view rendering results in the
            model being changed. This is because we can't know the width of the type box
            until we've rendered it.

            Trying to fire event on root model which mediators will be able to listen to
            and update accordingly
        */
        setWidth : function (width) {

            var previousWidth = this.model.children['width'].value;
            this.model.children['width'].set(width, true);

            if(previousWidth !== width) {

                this.fire("changeWidth");
            }
        },

        setHeight : function (height) {

            var previousHeight = this.model.children['height'].value;

            this.model.children['height'].set(height, true);

            if(previousHeight !== height) {

                this.fire("changeHeight");
            }
        },

        getHeight : function () {

            return this.model.children['height'].value;
        },

        getWidth : function () {

            return this.model.children['width'].value;
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

