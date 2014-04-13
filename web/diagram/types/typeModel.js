define(["utility/nodeWrapper"],

        function (
            NodeWrapper
        ) {
    /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

    return NodeWrapper.extend({

        initialize : function (options) {

            NodeWrapper.prototype.initialize.call(this, options);

            this.diagramModel = options.diagramModel;

            this.on("change", this.changeHandler, this);
          //  this.on("create", this.changeHandler, this);
           // this.on("deleteProperty", this.changeHandler, this);
          //  this.on("deleteMethod", this.changeHandler, this);
          //  this.on("deleteArgs", this.changeHandler, this);
        },

        changeHandler : function () {
            this.fire("update");
        },

        getName : function () {
            return this.model.name;
        },

        toJSON : function () {

            return this.model.unwrap();

        },

        save : function (json) {

            this.model.reset(json);

        },

        fireReceiveClickEvent : function (controller) {

            this.fire("receiveRequest", controller)
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

            return this.get("height");
        },

        getWidth : function () {

            return this.get('width');
        },

        getFlavor : function () {

            return this.get('flavor');
        },

        getXCood : function () {

            return this.get('xCood');
        },

        getYCood : function () {

            return this.get('yCood');
        },

        getTypeName : function () {

            //return this.get('name');
            return this.get('name');

        },

        getMethods : function () {

            return this.model.unwrap().methods;
        },

        getProperties : function () {

            return this.model.unwrap().properties;
        }


    });
});

