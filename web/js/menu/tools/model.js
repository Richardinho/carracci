define(['Model'], function (Model) {

    return Model.extend({

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);

        },

        setVisible : function () {
            this.set({ "visible" : true });
        },

        setInvisible : function () {
            this.set({ "visible" : false });
        }


    });
});