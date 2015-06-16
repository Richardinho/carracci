define([
    "BaseType",
    "text!diagram/connectors/template.html"
    ], function (
        BaseType,
        template
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function (options) {

                    this.$el = options.el;
                    this.$el.hide();

                },

                hide : function () {

                    this.$el.css({ display : "none" });
                },

                template : _.template(template),

                render : function ( zIndex ) {

                    this.$el.html(this.template());

                    this.$el.css({ display : "block" , zIndex: zIndex });

                }
            });
        });