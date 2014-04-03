define(["BaseType"],

        function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.listeners = {};


        }

       /* getFlavor : function () {

            return this.model.children['flavor'].value;
        },

        getXCood : function () {

            return this.model.children['xCood'].value;
        },

        getYCood : function () {

            return this.model.children['yCood'].value;
        },

        getMethods : function () {

            var meths = this.model.unwrap().methods;
            return meths;
        },

        getProperties : function () {

            return this.model.unwrap().properties;
        }*/


    });
});

