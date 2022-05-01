define(["utility/nodeWrapper"], function (NodeWrapper) {
  return NodeWrapper.extend({
    initialize: function (options) {
      NodeWrapper.prototype.initialize.call(this, options);

      this.height = 100;
    },

    save: function (result) {
      this.setTitle(result.title);
      this.setCreated(result.created);
      this.setAuthor(result.author);
      this.setDescription(result.description);

      this.trigger("showbanner");
    },

    getXCood: function () {
      return parseInt(this.get("xCood"), 10);
    },

    setCoods: function (x, y) {
      this.setXCood(x);
      this.setYCood(y);
      this.trigger("update:position");
    },

    setXCood: function (x) {
      this.set("xCood", x);
    },

    setYCood: function (y) {
      this.set("yCood", y);
    },

    getYCood: function () {
      return parseInt(this.get("yCood"), 10);
    },

    setDescription: function (description) {
      this.set("description", description);
    },

    getAuthor: function () {
      return this.get("author");
    },

    setAuthor: function (author) {
      this.set("author", author);
    },

    getFontFamily: function () {
      return "arial";
    },

    getDescription: function () {
      return this.get("description");
    },

    getPaddingHorizontal: function () {
      return 12;
    },

    getCreated: function () {
      return this.get("created");
    },

    setCreated: function (created) {
      this.set("created", created);
    },

    getTitleFontSize: function () {
      return 12;
    },

    // should be in CSS
    getTitleFontFamily: function () {
      return "arial";
    },

    getWidth: function () {
      return 300;
    },

    getTitleText: function () {
      return this.get("title");
    },

    setTitle: function (title) {
      this.set("title", title);
    },
  });
});
