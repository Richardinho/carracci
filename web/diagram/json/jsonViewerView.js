define([
    "BaseType",
    "text!diagram/json/jsonViewerTemplate.html"
    ], function (
        BaseType,
        template
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function () {

                    this.$el = $('#json-viewer');
                },

                template : _.template(template),

                show : function (stackingOrder, model) {

                    this.$el.html(this.template({ diagram : model}));

                    this.$el.css({ zIndex : stackingOrder });
                    this.$el.show();
                },

                hide : function () {

                    this.$el.hide();
                }
            });
        });
