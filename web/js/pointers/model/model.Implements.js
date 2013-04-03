define(['ModelDiamond'], function (ModelDiamond) {

    return ModelDiamond.extend({


        initialize : function (options) {

            ModelDiamond.prototype.initialize.call(this, options);
        },

        getColor : function () {
            return "white";
        }

    });
});