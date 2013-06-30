define(["core/BaseType"],

        function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

        },

        getLeftArrow : function () {

            return this.model.children['nodes'].children['left'];
        },

        getProximalNode : function () {

            return this.model.children['nodes'].children['proximal'];
        }



    });
});

