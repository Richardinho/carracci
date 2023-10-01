define(['BaseType', 'text!diagram/viewer/viewerTemplate.html'], function(
  BaseType,
  template
) {
  'use strict'

  return BaseType.extend({
    initialize: function() {
      this.$el = $('#viewer')
    },

    template: _.template(template),

    show: function(stackingOrder, html) {
      this.$el.html(this.template({ innerHTML: html }))

      this.$el.css({ zIndex: stackingOrder })
      this.$el.show()
    },

    hide: function() {
      this.$el.hide()
    },
  })
})
