define([
  'diagram/connectors/nodes/abstractNodeMediator',
  'diagram/connectors/nodes/nodeModel',
  'events/eventsBus',
], function(AbstractNodeMediator, NodeModel, eventsBus) {
  'use strict'

  return AbstractNodeMediator.extend({
    initialize: function(options) {
      this.leftArrowModel = options.leftArrowModel
      this.proximalNodeModel = options.proximalNodeModel
      this.distalNodeModel = options.distalNodeModel
      this.rightArrowModel = options.rightArrowModel

      AbstractNodeMediator.prototype.initialize.call(this, options)
    },

    destroy: function() {
      this.detachAll()
      this.leftArrowModel.trigger('destroy')
      this.proximalNodeModel.trigger('destroy')
      this.distalNodeModel.trigger('destroy')
      this.rightArrowModel.trigger('destroy')
    },

    addBoxNodeMediator: function(boxNodeMediator, orientation) {
      if (orientation === 'left') {
        this._attachTypeBoxToLeftNode(boxNodeMediator)
      } else if (orientation === 'right') {
        this._attachTypeBoxToRightNode(boxNodeMediator)
      }
    },

    // called from node controller
    removeBoxNodeMediator: function(orientation) {
      if (orientation === 'left') {
        this.leftArrowModel.setAttached(false)
        this.leftArrowModel.model['attachedBox'] = null
        this.leftNodeTypeBoxMediator.destroy()
        this.leftNodeTypeBoxMediator = null
      } else {
        this.rightArrowModel.setAttached(false)
        this.rightArrowModel.model['attachedBox'] = null
        this.rightNodeTypeBoxMediator.destroy()
        this.rightNodeTypeBoxMediator = null
      }
    },

    detachAll: function() {
      if (this.leftNodeTypeBoxMediator) {
        this.removeBoxNodeMediator('left')
      }
      if (this.rightNodeTypeBoxMediator) {
        this.removeBoxNodeMediator('right')
      }
    },

    _attachTypeBoxToRightNode: function(boxNodeMediator) {
      this.rightArrowModel.setAttached(true)
      var box = boxNodeMediator.typeController.model.model.id
      this.rightArrowModel.model['attachedBox'] = box

      this.rightNodeTypeBoxMediator = boxNodeMediator
    },

    _attachTypeBoxToLeftNode: function(boxNodeMediator) {
      this.leftArrowModel.setAttached(true)
      var box = boxNodeMediator.typeController.model.model.id
      this.leftArrowModel.model['attachedBox'] = box
      this.leftNodeTypeBoxMediator = boxNodeMediator
    },

    /*  update a node model using coordinates */
    update: function(node, x, y, overRideConstraints) {
      switch (node) {
        case 'left':
          this.updateLeftArrow(x, y, overRideConstraints)
          break
        case 'proximal':
          this.updateProximalNode(x, y)
          break
        case 'distal':
          this.updateDistalNode(x, y)
          break
        case 'right':
          this.updateRightArrow(x, y, overRideConstraints)
          break
      }
      this.connectorModel.trigger('change')
    },

    /* update a node model when you have the difference in x and y */
    updateUsingDifference: function(orientation, dx, dy) {
      var x, y
      switch (orientation) {
        case 'left':
          x = this.leftArrowModel.getXCood() + dx
          y = this.leftArrowModel.getYCood() + dy

          var proximalNodeXCood = this.proximalNodeModel.getXCood()

          this.leftArrowModel.setXCood(
            this.leftNodeTypeBoxMediator.calculateNodeXCood(proximalNodeXCood)
          )
          this._setLeftArrowDirection()
          this.leftArrowModel.setYCood(y)
          this.proximalNodeModel.setYCood(y)
          break

        case 'right':
          x = this.rightArrowModel.getXCood() + dx
          y = this.rightArrowModel.getYCood() + dy

          var distalNodeXCood = this.distalNodeModel.getXCood()

          this.rightArrowModel.setXCood(
            this.rightNodeTypeBoxMediator.calculateNodeXCood(distalNodeXCood)
          )

          this.setRightArrowDirection()

          this.rightArrowModel.setYCood(y)
          this.distalNodeModel.setYCood(y)

          break
      }
      this.connectorModel.trigger('change')
    },

    // make request to join a node to a type box
    fireAttachRequest: function(orientation) {
      eventsBus.trigger('attachRequest', this, orientation)
    },

    // update from node controller
    updateLeftArrow: function(x, y, overRideConstraints) {
      if (this._leftArrowAttached()) {
        var currentX = this.leftArrowModel.getXCood()
        var currentY = this.leftArrowModel.getYCood()
        if (!overRideConstraints) {
          var coods = this.leftNodeTypeBoxMediator.getLeftNodeCoods(
            x,
            y,
            currentX,
            currentY
          )

          x = coods.x
          y = coods.y
        }
      }
      this.leftArrowModel.setXCood(x)
      this.leftArrowModel.setYCood(y)
      this.proximalNodeModel.setYCood(y)
      this._setLeftArrowDirection()
    },

    updateProximalNode: function(x, y) {
      if (this._rightArrowAttached()) {
        /*
          align right node according to the position of the proximal node
          in relation to the type box.
        */

        this.rightArrowModel.setXCood(
          this.rightNodeTypeBoxMediator.calculateNodeXCood(x)
        )
      }

      if (this._leftArrowAttached()) {
        var currentX = this.proximalNodeModel.getXCood()
        var currentY = this.proximalNodeModel.getYCood()

        // ask mediator if we can move this node
        var coods = this.leftNodeTypeBoxMediator.getProximalNodeCoods(
          x,
          y,
          currentX,
          currentY
        )

        x = coods.x
        y = coods.y

        this.leftArrowModel.setXCood(
          this.leftNodeTypeBoxMediator.calculateNodeXCood(x)
        )
      }

      this.setRightArrowDirection()
      this._setLeftArrowDirection()
      this.proximalNodeModel.setXCood(x)
      this.proximalNodeModel.setYCood(y)
      this.leftArrowModel.setYCood(y)
      this.distalNodeModel.setXCood(x)
    },

    updateDistalNode: function(x, y) {
      if (this._rightArrowAttached()) {
        var currentX = this.distalNodeModel.getXCood()
        var currentY = this.distalNodeModel.getYCood()

        // ask mediator if we can move this node
        var coods = this.rightNodeTypeBoxMediator.getDistalNodeCoods(
          x,
          y,
          currentX,
          currentY
        )

        x = coods.x
        y = coods.y

        /*
          align right node according to the position of the distal node
          in relation to the type box.
        */

        this.rightArrowModel.setXCood(
          this.rightNodeTypeBoxMediator.calculateNodeXCood(x)
        )
      }

      if (this._leftArrowAttached()) {
        /*
          move right arrow node onto right or left edge of box
          if distal node extends too far in either direction.
        */

        this.leftArrowModel.setXCood(
          this.leftNodeTypeBoxMediator.calculateNodeXCood(x)
        )
      }

      this.setRightArrowDirection()
      this._setLeftArrowDirection()

      this.distalNodeModel.setXCood(x)
      this.distalNodeModel.setYCood(y)
      this.proximalNodeModel.setXCood(x)

      this.rightArrowModel.setYCood(y)
    },

    updateRightArrow: function(x, y, overRideConstraints) {
      if (this._rightArrowAttached()) {
        /*
          if we're currently attached to a type box,  check against
          the mediator if the proposed coods are acceptable
        */
        if (!overRideConstraints) {
          var currentX = this.rightArrowModel.getXCood()
          var currentY = this.rightArrowModel.getYCood()

          var coods = this.rightNodeTypeBoxMediator.getRightNodeCoods(
            x,
            y,
            currentX,
            currentY
          )

          x = coods.x
          y = coods.y
        }
      }

      this.rightArrowModel.setXCood(x)
      this.rightArrowModel.setYCood(y)
      this.distalNodeModel.setYCood(y)

      this.setRightArrowDirection()
    },

    setRightArrowDirection: function() {
      if (this.rightArrowModel.getXCood() < this.proximalNodeModel.getXCood()) {
        this.rightArrowModel.setArrowDirection('left')
      } else {
        this.rightArrowModel.setArrowDirection('right')
      }
      this.rightArrowModel.trigger('switchArrowHead')
    },

    _setLeftArrowDirection: function() {
      if (this.leftArrowModel.getXCood() < this.proximalNodeModel.getXCood()) {
        this.leftArrowModel.setArrowDirection('left')
      } else {
        this.leftArrowModel.setArrowDirection('right')
      }
      this.leftArrowModel.trigger('switchArrowHead')
    },

    _rightArrowAttached: function() {
      return this.rightArrowModel.isAttached()
    },

    _leftArrowAttached: function() {
      return this.leftArrowModel.isAttached()
    },
  })
})
