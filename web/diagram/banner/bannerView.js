define([
    "BaseType",
    "utility/banner"

    ],

        function (
            BaseType,
            Banner
        ) {


    return BaseType.extend({


        initialize : function (options) {

            this.model = options.model;

            this.svgElement = new Banner({
                model : this.model
            });

        },

        render : function () {

            this.svgElement.redraw(this.model);
        }

    });
});

