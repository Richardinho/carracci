define(["diagram/boxNodeMediator"], function (BoxNodeMediator) {
  return BoxNodeMediator.extend({
    initialize: function (options) {
      BoxNodeMediator.prototype.initialize.call(this, options);
    },

    getBoxRightLimit: function () {
      return this.typeController.getRightXLimit();
    },

    getBoxLeftLimit: function () {
      return this.typeController.getLeftXLimit();
    },

    /*
      works out whether the right hand node should be on the right
      edge of the box or the left edge
    */

    calculateNodeXCood: function (relativeX) {
      if (relativeX > this.getBoxRightLimit()) {
        return this.getBoxRightLimit();
      } else {
        return this.getBoxLeftLimit();
      }
    },

    getDistalNodeCoods: function (x, y, currentX, currentY) {
      var topY = this.typeController.getTopYLimit();
      var bottomY = this.typeController.getBottomYLimit();

      if (y < topY || y > bottomY) {
        y = currentY;
      }

      // note that the x cood is not under any constraint.
      return {
        x: x,
        y: y,
      };
    },

    //  todo: this and the previous function do the same thing. Should resolve into one function.
    getProximalNodeCoods: function (x, y, currentX, currentY) {
      var topY = this.typeController.getTopYLimit();
      var bottomY = this.typeController.getBottomYLimit();

      if (y < topY || y > bottomY) {
        y = currentY;
      }

      // note that the x cood is not under any constraint.
      return {
        x: x,
        y: y,
      };
    },

    /* methods called from nodes mediator to determine position of nodes */

    getRightNodeCoods: function (x, y, currentX, currentY) {
      return this._getNodeCoods(x, y, currentX, currentY);
    },

    getLeftNodeCoods: function (x, y, currentX, currentY) {
      return this._getNodeCoods(x, y, currentX, currentY);
    },

    //  private methods
    _getNodeCoods: function (x, y, currentX, currentY) {
      var topY = this.typeController.getTopYLimit();
      var bottomY = this.typeController.getBottomYLimit();

      if (y < topY || y > bottomY) {
        y = currentY;
      }

      return {
        x: currentX,
        y: y,
      };
    },

    // inherited methods
    _moveNodeOnToBox: function () {
      var relativeX = this.nodeMediator.proximalNodeModel.getXCood();

      var x = this.calculateNodeXCood(relativeX);

      var topY = this.typeController.getTopYLimit();
      var bottomY = this.typeController.getBottomYLimit();

      var y = (topY + bottomY) / 2;
      this.nodeMediator.update(this.nodeOrientation, x, y, true);
    },
  });
});
