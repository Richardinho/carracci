define([
    "utility/nodeWrapper"
    ],

    function (
        NodeWrapper
    ) {


    return NodeWrapper.extend({

        initialize : function (options) {

            NodeWrapper.prototype.initialize.call(this, options);

            this.model = options.model;

            this.lineStyles = [
                'dashed',
                'solid'
            ];

            this.currentLineStyleIndex = 0;

        },

        getLeftArrow : function () {

            return this.model['nodes']['left'];
        },

        getProximalNode : function () {

            return this.model['nodes']['proximal'];
        },

        getDistalNode : function () {

            return this.model['nodes']['distal'];
        },

        getRightArrow : function () {

            return this.model['nodes']['right'];
        },

        alternateLineStyle : function () {

            this.setLineStyle(this.lineStyles[this.currentLineStyleIndex])

            this.currentLineStyleIndex = (this.currentLineStyleIndex + 1) % this.lineStyles.length;
        },

        setLineStyle : function (style) {
            this.model['lineStyle'] = style;
        },

        getLineStyle : function () {
            return this.model['lineStyle'];
        }



    });
});

