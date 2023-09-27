define(['utility/nodeWrapper'], function(NodeWrapper) {
  return NodeWrapper.extend({
    initialize: function(options) {
      NodeWrapper.prototype.initialize.call(this, options)

      this.model = options.model
      this.lineStyles = ['dashed', 'solid']

      this.currentLineStyleIndex = 0
    },

    getTopArrow: function() {
      return this.model['nodes']['top']
    },

    getSecondTopNode: function() {
      return this.model['nodes']['secondTop']
    },

    getSecondBottomNode: function() {
      return this.model['nodes']['secondBottom']
    },

    getBottomArrow: function() {
      return this.model['nodes']['bottom']
    },

    alternateLineStyle: function() {
      this.setLineStyle(this.lineStyles[this.currentLineStyleIndex])

      this.currentLineStyleIndex =
        (this.currentLineStyleIndex + 1) % this.lineStyles.length
    },

    setLineStyle: function(style) {
      this.model['lineStyle'] = style
    },

    getLineStyle: function() {
      return this.model['lineStyle']
    },
  })
})
