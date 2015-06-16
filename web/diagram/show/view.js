define([
    "BaseType",
    "text!diagram/show/template.html"

    ],

    function (
        BaseType,
        template
    ) {

        return BaseType.extend({

            initialize : function (options) {

                this.$el = options.el;
                console.log("show view");
                this.show();
            },

            template : _.template(template),


            hide : function () {

                this.$el.css({ display : "none" });
            },

            show : function () {

                this.$el.html(this.template());

                this.$el.css({ display : "flex" });

            }


        });
    });

