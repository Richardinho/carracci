define(['BaseType'], function (BaseType) {

    return BaseType.extend({

        initialize : function (options) {
            this.context = options.context;
        },

        validateX : function (x) {
            return true;
        },
        validateY : function (y) {
            return true;
        },
        setXCoods : function(x) {},

        setYCoods : function (y) {},

        postProcess : function (x, y) {}
    });

});