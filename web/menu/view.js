define([
  "BaseType",
  "text!menu/template.html",
  "text!menu/initialTemplate.html",
], function (BaseType, template, initialTemplate) {
  "use strict";

  return BaseType.extend({
    initialize: function (options) {
      this.$el = options.el;
    },

    initialTemplate: _.template(initialTemplate),

    template: _.template(template),

    render: function (diagram) {
      this.$el.html(this._getTemplate(diagram));

      this.$el.show();
    },

    _getTemplate: function (diagram) {
      if (diagram) {
        return this.template();
      } else {
        return this.initialTemplate();
      }
    },
  });
});
