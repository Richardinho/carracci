define([
        "core/BaseType"
        ],

        function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

            this.arrowHeadStyles = [
                "whiteArrow",
                "whiteDiamond",
                "blackDiamond",
                "blackConnectArrow",
                "none"
            ];
            this.currentArrowHeadIndex = 0;

        },

        getXCood : function () {

            return parseInt(this.model.children['xCood'].value, 10);

        },

        setXCood : function (x) {

            this.model.children['xCood'].set(x);
        },

        setYCood : function (y) {

            this.model.children['yCood'].set(y);
        },

        getYCood : function () {

            return parseInt(this.model.children['yCood'].value, 10);

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

        on : function (event, handler, context) {
            this.model.on(event, handler, context);

        },

        getStyle : function () {

            return this.model.children['arrow'].children['style'].value;
        },

        switchArrowHead : function () {

            var arrowHead = this.arrowHeadStyles[this.currentArrowHeadIndex];

            this.model.children['arrow'].children['style'].set(arrowHead, true);
            this.model.fire("switchArrowHead");

            this.currentArrowHeadIndex = (this.currentArrowHeadIndex + 1) % this.arrowHeadStyles.length;

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