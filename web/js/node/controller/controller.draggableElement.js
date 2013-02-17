Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.DraggableElement = Glenmorangie.utils.extend({


    initialize : function (options) {

        _.bindAll(this, "_onMove", "_onStart", "_onEnd" );

        this.startX = null;
        this.startY = null;


        this.globalController = options.globalController;
        this.model = options.model;
        this.view = options.view;

        this.keyManager = options.keyManager;

        this.view.element.drag(this._onMove, this._onStart, this._onEnd);

    },

    _onMove : function (dx, dy) {
        var x = this.startX + dx,
            y = this.startY + dy;

        this.model.update(x,y);
    },

    _onStart : function () {
        this.startX = parseInt(this.view.element.attr("cx"));
        this.startY = parseInt(this.view.element.attr("cy"));
    },

    _onEnd : function () {
        this.startX = null;
        this.startY = null;
    }


});


