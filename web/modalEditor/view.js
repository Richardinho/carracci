define([
    "BaseType",
    'underscore',
    'modalEditor/view'
        ],

        function (
            BaseType,
             _ ,
             View
        ) {

        return BaseType.extend({

            initialize : function (options) {

                this.view = new View();
            },

            open : function () {

                this.view.show();
            }

        });
    });

