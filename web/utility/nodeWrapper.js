define([
    "BaseType"

    ],

        function (
            BaseType
        ) {


    return BaseType.extend({


        initialize : function (options) {

            this.model = options.model;

        },

        on : function (event, handler, context) {

            this.model.on(event, handler, context);
        },

        off : function (event, handler) {

           this.model.off(event, handler);

        },

        broadcast : function () {

            this.model.broadcast.apply(this.model, arguments);
        },

        fire : function (event) {

            this.model.fire.apply(this.model, arguments);

        },

        get : function(propertyName) {

            return this.model.children[propertyName].value;
        },

        getName : function () {

            return this.model.name;
        }



    });
});

