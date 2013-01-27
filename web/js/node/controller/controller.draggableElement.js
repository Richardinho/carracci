Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.DraggableElement = Glenmorangie.utils.extend({


    initialize : function (options) {

        _.bindAll(this, "_onMove", "_onStart", "_onEnd" );

        this.startX = null;
        this.startY = null;

        this.constraintsManagers = [];
        this.model = options.model;
        this.view = options.view;

        this.view.element.drag(this._onMove, this._onStart, this._onEnd);
    },

    _onMove : function (dx, dy) {
        var proposedX = this.startX + dx,
            proposedY = this.startY + dy;

        var x = this._checkXRestrictions(proposedX) ? proposedX : this.startX;
        var y = this._checkYRestrictions(proposedY) ? proposedY : this.startY;

        this.model.updateCoordinates(x,y);
    },

    _onStart : function () {
        this.startX = parseInt(this.view.element.attr("cx"));
        this.startY = parseInt(this.view.element.attr("cy"));
    },

    _onEnd : function () {
        this.startX = null;
        this.startY = null;
    },

    setConstraintsManager : function (manager) {
        this.constraintsManagers.push(manager);
    },

    _checkXRestrictions : function (x) {
        for (var i = 0; i < this.constraintsManagers.length; i++) {
            var result = this.constraintsManagers[i].proposeXCood(x);
            return result;
        }
        return true;
    },

    _checkYRestrictions : function (y) {
        for (var i = 0; i < this.constraintsManagers.length; i++) {
            var result = this.constraintsManagers[i].proposeYCood(y);
            return result;
        }
        return true;
    }
});



