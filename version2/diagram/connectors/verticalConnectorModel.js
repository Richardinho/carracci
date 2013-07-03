define(["core/BaseType"],

        function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.lineStyles = [
                'dashed',
                'solid'
            ];

            this.currentLineStyleIndex = 0;

        },

        fire : function (event, handler, context) {

            this.model.fire(event, handler, context);

        },

        getTopArrow : function () {

            return this.model.children['nodes'].children['top'];
        },

        getSecondTopNode : function () {

            return this.model.children['nodes'].children['secondTop'];
        },

        getSecondBottomNode : function () {

            return this.model.children['nodes'].children['secondBottom'];
        },

        getBottomArrow : function () {

            return this.model.children['nodes'].children['bottom'];
        },

        alternateLineStyle : function () {

            this.setLineStyle(this.lineStyles[this.currentLineStyleIndex])

            this.currentLineStyleIndex = (this.currentLineStyleIndex + 1) % this.lineStyles.length;
        },

        setLineStyle : function (style) {
            this.model.children['lineStyle'].set(style);
        },

        getLineStyle : function () {
            return this.model.children['lineStyle'].value;
        }



    });
});

