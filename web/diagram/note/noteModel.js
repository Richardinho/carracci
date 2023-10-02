define(['utility/nodeWrapper'], function(NodeWrapper) {
  'use strict'

  return NodeWrapper.extend(
    /** @lends NoteModel.prototype */ {
      /**
       *
       * @augments external:NodeWrapper
       * @constructs
       */
      initialize: function(options) {
        NodeWrapper.prototype.initialize.call(this, options)

        this.x = 0
        this.y = 0
        this.height = 100
      },

      getHeight: function() {
        return this.height
      },

      getWidth: function() {
        return this.get('width')
      },

      setText: function(text) {
        this.set('text', text)
      },

      save: function(text, width) {
        this.setText(text)
        this.setWidth(width)
        this.trigger('save')
        this.trigger('update:position')
      },

      setWidth: function(width) {
        isNaN(parseInt(width, 10))
          ? this.set('width', 200)
          : this.set('width', width)
      },

      getText: function() {
        return this.get('text')
      },

      getType: function() {
        return this.get('type')
      },

      setCoods: function(x, y) {
        this.setXCood(x)
        this.setYCood(y)
        this.trigger('update:position')
      },

      setXCood: function(x) {
        this.set('xCood', x)
      },

      setYCood: function(y) {
        this.set('yCood', y)
      },

      getXCood: function() {
        return parseInt(this.get('xCood'), 10)
      },

      getYCood: function() {
        return parseInt(this.get('yCood'), 10)
      },

      setHeight: function(height) {
        this.height = height
        this.trigger('change:dimensions')
      },
    }
  )
})
