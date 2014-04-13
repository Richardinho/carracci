define(["BaseType"],

        function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

            this.centerNode = {

                x : 0,
                y : 0
            };

            this.listeners = {};


        },

        setCenterNode : function (x, y) {

            this.centerNode = {

                x : x,
                y : y
            }
        }




    });
});

