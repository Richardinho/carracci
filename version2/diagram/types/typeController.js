define(["core/BaseType",
        'utility/typeBox',
        'underscore'],

        function (
            BaseType,
            TypeBox,
             _
        ) {
    /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll( this, "_onMove", "_onStart", "_onEnd" );

            this.startX = null;
            this.startY = null;

            this.model = options.model;

            this.view = options.view;
            this.box = this.view.box.rect;

            this.box.drag(this._onMove, this._onStart, this._onEnd);
        },

        _onMove : function (dx, dy) {

            var x = this.startX + dx,
                y = this.startY + dy;

            this.model.setCoods(x, y);
        },

        _onStart : function () {
            this.startX = parseInt(this.box.attr("x"));
            this.startY = parseInt(this.box.attr("y"));
        },

        _onEnd : function () {
            this.startX = null;
            this.startY = null;
        },
    });
});

