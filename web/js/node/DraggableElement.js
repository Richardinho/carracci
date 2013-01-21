Glenmorangie.namespace("Glenmorangie");
     debugger;
Glenmorangie.DraggableElement = Glenmorangie.SvgElement.extend({


    startX : null, // temp x variable for use when moving

    startY : null, // temp y variable for use when moving

    constraintsManagers : [],

    initialize : function (options) {

        _.bindAll(this, "_onMove", "_onStart", "_onEnd" );

        Glenmorangie.SvgElement.prototype.initialize.call(this, options);

        this.element.drag(this._onMove, this._onStart, this._onEnd);
    },

    _onMove : function (dx, dy) {
        var proposedX = this.startX + dx,
            proposedY = this.startY + dy;

        var x = this._checkXRestrictions(proposedX) ? proposedX : this.startX;
        var y = this._checkYRestrictions(proposedY) ? proposedY : this.startY;

        this.updateCoordinates(x,y);

        this.render();
    },

    _onStart : function () {
        this.startX = parseInt(this.element.attr("cx"));
        this.startY = parseInt(this.element.attr("cy"));
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



