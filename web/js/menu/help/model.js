define(['Model'], function (Model) {

    return Model.extend({

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);

            this.set({ "helpData" : options.data });
            this.set({ "currentPage" : 0 })
        },

        setVisible : function () {
            this.set({ "visible" : true });
        },

        isVisible : function () {
            return this.get("visible");
        },

        setPage : function (pageNumber) {
            this.set({ "currentPage" : pageNumber });
        },

        getPageNumber : function () {
            return this.get("currentPage");
        },

        setInvisible : function () {
            this.set({ "visible" : false });
        },

        getCurrentPage : function () {
            return this.getPage(this.get("currentPage"));
        },

        getPage : function (pageNumber) {
            return this.get("helpData").pages[pageNumber];
        }
    });
});