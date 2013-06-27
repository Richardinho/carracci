define(["core/BaseType",
        'utility/typeBox',
        'underscore'],

        function (
            BaseType,
            TypeBox,
             _
        ) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "_onMove", "_onStart", "_onEnd" );

            this.startX = null;
            this.startY = null;

            this.model = options.model;

            this.id = options.id;


            this.view = options.view;
            this.box = this.view.box.rect;

            this.box.drag(this._onMove, this._onStart, this._onEnd);
        },

        _onMove : function (dx, dy) {
            var x = this.startX + dx,
                y = this.startY + dy;

            this.model.moveType(this.id, x, y);
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

