define(['BaseType', 'text!diagram/banner/editorTemplate.html'], function(
  BaseType,
  template
) {
  'use strict'

  return BaseType.extend({
    initialize: function(options) {
      this.$el = options.el
      this.$el.hide()
    },

    template: _.template(template),

    show: function(stackingOrder, model) {
      this.$el.html(this.template(model.model))

      this.$el.css({ zIndex: stackingOrder })
      this.$el.show()
    },

    hide: function() {
      this.$el.hide()
    },
  })
})
