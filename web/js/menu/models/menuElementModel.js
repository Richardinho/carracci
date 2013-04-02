define(['Model'], function (Model) {

    return Model.extend({

        initialize : function (options) {
            Model.prototype.initialize.call(this, options);
            this.items = options.items;
            this.name = options.name;
            this.set({"state": "closed"});
            this.index = options.index;
        },

        close : function () {
            this.set({ state : "closed" });
            this._fire("hide");
        },

        open : function () {
            this.set({ state : "open" });
            this._fire("open");
        },

        getState : function () {
            return this.get("state");
        }

    });

});