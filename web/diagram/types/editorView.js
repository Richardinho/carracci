define([
    "BaseType",
    "text!diagram/types/template.html",
    "text!diagram/types/rowTemplate.html",
    "text!diagram/types/methodRowTemplate.html"
    ], function (
        BaseType,
        template,
        rowTemplate,
        methodRowTemplate
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function (options) {

                    this.$el = options.el;
                    this.$el.hide();

                },

                getArgsEl : function () {

                    return this.$el.find('[data-role=argsContainer]');
                },

                rowTemplate : _.template(rowTemplate),

                methodRowTemplate : _.template(methodRowTemplate),

                addRowToPropertyTable : function () {

                    $('[data-role=property-table] tbody',this.$el).append(this.rowTemplate());

                },

                addRowToMethodTable : function () {

                    $('[data-role=method-table] tbody',this.$el).append(this.methodRowTemplate());
                },

                template : _.template(template),

                hide : function () {

                    this.$el.css({ display : "none" });
                },

                render : function (zIndex ) {

                    this.$el.html(this.template(this.model.model));

                    this.$el.css({ display : "flex" , zIndex: zIndex });

                }
            });
        });
