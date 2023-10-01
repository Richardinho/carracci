define(['BaseType', 'menu/view', 'events/eventsBus'], function(
  BaseType,
  View,
  eventsBus
) {
  'use strict'

  return BaseType.extend({
    initialize: function(options) {
      this.diagramController = options.diagramController

      this.view = new View({
        el: $('#menu'),
      })

      this.view.render(false)
    },

    update: function(hasDiagram) {
      this.view.render(hasDiagram)
    },
  })
})
