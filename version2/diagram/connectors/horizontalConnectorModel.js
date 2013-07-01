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

        getLeftArrow : function () {

            return this.model.children['nodes'].children['left'];
        },

        getProximalNode : function () {

            return this.model.children['nodes'].children['proximal'];
        },

        getDistalNode : function () {

            return this.model.children['nodes'].children['distal'];
        },

        getRightArrow : function () {

            return this.model.children['nodes'].children['right'];
        },

        alternateLineStyle : function () {

            this.setLineStyle(this.lineStyles[this.currentLineStyleIndex])

            this.currentLineStyleIndex = (this.currentLineStyleIndex + 1) % this.lineStyles.length;
        },

        setLineStyle : function (style) {
            console.log("set line style")
            this.model.children['lineStyle'].set(style);
        },

        getLineStyle : function () {
            return this.model.children['lineStyle'].value;
        }



    });
});

