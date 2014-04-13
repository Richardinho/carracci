define([
    "BaseType",
    "text!diagram/types/argsTemplate.html",
    "text!diagram/types/argsRowTemplate.html"
    ],

    function (
        BaseType,
        template,
        rowTemplate
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.$el = options.el;
            this.$el.hide();

        },

        template : _.template(template),

        show : function (stackingOrder, argsArray) {

            this.$el.html(this.template({ args : argsArray }))
            this.$el.css({ zIndex : stackingOrder });
            this.$el.show();

        },

        getRows : function () {

            return this.$el.find('tbody tr');
        },

        rowTemplate : _.template(rowTemplate),

        hide : function () {

            this.$el.hide();
        },

        addRowToTable : function () {

            $('tbody', this.$el).append(this.rowTemplate());

        }
    });
});

