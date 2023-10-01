define([
  'BaseType',
  'text!menu/template.html',
  'text!menu/initialTemplate.html',
], function(BaseType, template, initialTemplate) {
  'use strict'

  return BaseType.extend({
    initialize: function(options) {
      this.$el = options.el
    },

    initialTemplate: _.template(initialTemplate),

    template: _.template(template),

    render: function(hasDiagram) {
      this.$el.html(this._getTemplate(hasDiagram))

      this.$el.show()
    },

    _getTemplate: function(hasDiagram) {
      if (hasDiagram) {
        return this.template()
      } else {
        return this.initialTemplate()
      }
    },
  })
})
