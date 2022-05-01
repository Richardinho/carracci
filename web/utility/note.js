define([
  "utility/svg",
  "BaseType",
  "underscore",
  "utility/svgUtilities",
], function (paper, BaseType, _, SVGUtils) {
  "use strict";

  /* this should simply read the model and render the typebox accordingly */
  return BaseType.extend({
    initialize: function (options) {
      this.svg = document.getElementById("foo");

      var x = 0;
      var y = 0;

      this.x = x;
      this.y = y;
      this.width = options.width;
      this.height = options.height;

      var fold = 10;
      this.fold = fold;

      var path = this._buildMainPath(x, y, fold, this.width, this.height);

      var path2 = SVGUtils.buildPath([
        SVGUtils.buildCoods(x, y + fold),
        SVGUtils.buildCoods(x + fold, y + fold),
        SVGUtils.buildCoods(x + fold, y),
      ]);

      var foo = this.createPathEl(path, "white");
      var bar = this.createPathEl(path2, "white");

      foo.setAttribute("stroke", "#666");
      foo.setAttribute("stroke-width", 1);
      bar.setAttribute("stroke", "#666");
      bar.setAttribute("stroke-width", 1);

      this.foo = foo;

      var group = this.createGroup();
      this.group = group;
      this.svg.appendChild(group);

      this.text = SVGUtils.createTextBody(
        options.text,
        this.width,
        12,
        "arial",
        12,
        this.svg
      );

      group.appendChild(foo);
      group.appendChild(bar);

      group.appendChild(this.text);

      //this.invisibleRect = paper.rect(x, y - 20, this.width, this.height);

      //dragger(group, this.invisibleRect);

      this.height = this.resetHeight(x, y);

      this.setCoods(options.xCood, options.yCood);
    },

    update: function (text, width) {
      this.resetText(text, width);
      this.width = width;
      this.height = this.resetHeight(0, 0);
    },

    resetText: function (text, width) {
      this.group.removeChild(this.text);
      this.text = SVGUtils.createTextBody(
        text,
        width,
        12,
        "arial",
        12,
        this.svg
      );
      this.group.appendChild(this.text);
    },

    destroy: function () {
      this.svg.removeChild(this.group);
    },

    setSelected: function () {
      this.foo.setAttribute("fill", "orange");
    },

    setDeselected: function () {
      this.foo.setAttribute("fill", "white");
    },

    resetBoxSize: function (x, y, width, height) {
      this.foo.setAttribute(
        "d",
        this._buildMainPath(x, y, this.fold, width, height)
      );
    },

    _buildMainPath: function (x, y, fold, width, height) {
      return SVGUtils.buildPath(
        [
          SVGUtils.buildCoods(x, y + fold),
          SVGUtils.buildCoods(x + fold, y),
          SVGUtils.buildCoods(x + width, y),
          SVGUtils.buildCoods(x + width, y + height),
          SVGUtils.buildCoods(x, y + height),
        ],
        true
      );
    },

    resetHeight: function (x, y) {
      var height = this.text.getBBox().height + 50;
      this.resetBoxSize(x, y, this.width, height);
      return height;
    },

    setCoods: function (x, y) {
      this.group.setAttribute("transform", "translate(" + x + " ," + y + ")");
    },

    createGroup: function () {
      return document.createElementNS(SVGUtils.NS, "g");
    },

    createPathEl: function (path, color) {
      var el = document.createElementNS(SVGUtils.NS, "path");
      el.setAttribute("d", path);
      el.setAttribute("fill", color);
      return el;
    },
  });
});
