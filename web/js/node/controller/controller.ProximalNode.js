Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.ProximalNode = Glenmorangie.Controller.DraggableElement.extend({


    initialize : function (options) {
        console.log("hello")
        Glenmorangie.Controller.DraggableElement.prototype.initialize.call(this, options);
        this.model = options.model;
        this.view.element.click(function () { alert("hello")})
    },

    _onMove : function (dx, dy) {
        var proposedX = this.startX + dx,
            proposedY = this.startY + dy;

        var x = this._checkXRestrictions(proposedX) ? proposedX : this.startX;
        var y = this._checkYRestrictions(proposedY) ? proposedY : this.startY;

        this.model.updateCoordinates(x,y);

    },

    _onClick : function () {
        console.log("click")
    },
});



