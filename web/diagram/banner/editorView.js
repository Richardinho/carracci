define([
    "BaseType",
    "text!diagram/banner/editortemplate.html"
    ], function (
        BaseType,
        template
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function (options) {

                    this.$el = options.el;
                    this.$el.hide();

                    this.model = options.model;
                    this.model.on("selected", this.show, this);

                },

                template : _.template(template),

                show : function () {

                    this.render();
                },

                hide : function () {

                    this.$el.css({ display : "none" });
                },

                render : function (diagram) {

                    this.$el.html(this.template({

                        title : this.model.getTitleText(),
                        author : this.model.getAuthor(),
                        description : this.model.getDescription(),
                        created : this.model.getCreated()

                    }));

                    this.$el.css({ display : "flex" });

                }
            });
        });