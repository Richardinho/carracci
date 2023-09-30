define(['utility/nodeWrapper'], function(NodeWrapper) {
  'use strict'

  /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

  return NodeWrapper.extend({
    initialize: function(options) {
      NodeWrapper.prototype.initialize.call(this, options)

      // used?
      this.diagramModel = options.diagramModel
    },

    getName: function() {
      return this.model.name
    },

    save: function() {
      this.trigger('update')
    },

    setCoods: function(x, y) {
      this.set('xCood', x)
      this.set('yCood', y)
      this.trigger('update:position')
    },

    /*
      setting width and height are special cases where the view rendering results in the
      model being changed. This is because we can't know the width of the type box
      until we've rendered it.

      Trying to fire event on root model which mediators will be able to listen to
      and update accordingly
    */
    setWidth: function(width) {
      var previousWidth = this.getWidth()
      this.set('width', width)

      if (previousWidth !== width) {
        this.trigger('changeWidth')
      }
    },

    setHeight: function(height) {
      var previousHeight = this.getHeight()

      this.set('height', height)

      if (previousHeight !== height) {
        this.trigger('changeHeight')
      }
    },

    getHeight: function() {
      return this.get('height')
    },

    getWidth: function() {
      return this.get('width')
    },

    getFlavor: function() {
      return this.get('flavor')
    },

    getXCood: function() {
      return this.get('xCood')
    },

    getYCood: function() {
      return this.get('yCood')
    },

    getTypeName: function() {
      return this.get('name')
    },

    getMethods: function() {
      return this.model.methods
    },

    getProperties: function() {
      return this.model.properties
    },
  })
})
