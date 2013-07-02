define([
        "core/BaseType"
        ],

        function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;


        },

        getXCood : function () {

            return this.model.children['xCood'].value;

        },

        setXCood : function (x) {
            this.model.children['xCood'].set(x);
        },

        setYCood : function (y) {
            this.model.children['yCood'].set(y);
        },

        getYCood : function () {

            return this.model.children['yCood'].value;

        },
        fire : function (event, context, orientation) {

            this.model.fire("attachRequest", context, orientation);
        },

        onXCood : function (event, handler, context) {

            this.model.children['xCood'].on(event, handler, context);
        },

        onYCood : function (event, handler, context) {

            this.model.children['yCood'].on(event, handler, context);
        },

        getStyle : function () {

            return this.model.children['arrow'].children['style'].value;
        },

        getDirection : function () {
            return this.model.children['arrow'].children['direction'].value;
        },

        setArrowDirection : function (direction){
            this.model.children['arrow'].children['direction'].set(direction);
        },

        isAttached : function () {

            return this.model.children['attached'].value;
        },

        setAttached : function (value) {
            this.model.children['attached'].set(value);
        },

        isArrowNode : function () {
            if(this.model.children['arrow']) {

                return true;
            } else {
                return false;
            }
        },

        broadcast : function (event) {

            this.model.broadcast(event)
        }


    });

});