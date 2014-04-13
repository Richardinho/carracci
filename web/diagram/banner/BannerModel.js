define(["utility/nodeWrapper"],

        function (
            NodeWrapper
        ) {


    return NodeWrapper.extend({

        initialize : function (options) {

            NodeWrapper.prototype.initialize.call(this, options);

            this.height = 100;

        },

        save : function (result) {


            this.setTitle(result.title);
            this.setCreated(result.created);
            this.setAuthor(result.author);
            this.setDescription(result.description);

            console.log(result.author);

        },

        getXCood : function () {

            return parseInt(this.model.children['xCood'].value, 10);
        },

        setCoods : function (x, y) {

            this.setXCood(x);
            this.setYCood(y);
        },

        setXCood : function (x) {

            this.model.children['xCood'].set(x);
        },

        setYCood : function (y) {

            this.model.children['yCood'].set(y);
        },

        getYCood : function () {

            return parseInt(this.model.children['yCood'].value, 10);

        },

        setDescription : function (description) {

            this.model.children['description'].set(description);
        },

        getAuthor : function () {
            return this.get("author");
        },

        setAuthor : function (author) {

            this.model.children['author'].set(author);
        },

        getFontFamily : function () {
            return "arial";
        },

        getDescription: function () {
            return this.get("description");
        },

        getPaddingHorizontal: function () {
            return 12;
        },

        getCreated : function () {

            return this.model.children['created'].value;
        },

        setCreated : function (created) {

            this.model.children['created'].set(created);
        },

        getTitleFontSize: function () {
            return 12;
        },

        getTitleFontFamily: function () {
            return "arial";
        },

        getWidth: function () {
            return 300;
        },

        getTitleText: function () {
            return this.model.children['title'].children['text'].value;
        },

        setTitle : function (title) {

            this.model.children['title'].children['text'].set(title);

        }




    });
});

