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

            this.attachedNodesMediators = [];

            this.startX = null;
            this.startY = null;

            this.model = options.model;

            this.view = options.view;
            this.box = this.view.box.rect;

            this.box.drag(this._onMove, this._onStart, this._onEnd);

            var that = this;

            /*
                For when request is made to attach a node to this type box
             */
            this.box.click(function () {
                //  fire on model, will bubble up to diagram
                that.model.fireReceiveClickEvent(that);
            });
        },

        /*
            requests for model state, delegating to model
        */
        getTopYLimit : function () {
            return this.model.getYCood();
        },

        getBottomYLimit : function () {
            return this.model.getYCood() + this.model.getHeight();
        },

        getLeftXLimit : function () {
            return this.model.getXCood();
        },

        getRightXLimit : function () {
            return this.model.getXCood() + this.model.getWidth();

        },

        _onMove : function (dx, dy) {

            var x = this.startX + dx,
                y = this.startY + dy,
                oldX = this.model.getXCood(),
                oldY = this.model.getYCood(),
                diffX = x - oldX,
                diffY = y - oldY;

            this.model.setCoods(x, y);

            _.each(this.attachedNodesMediators, function (mediator) {

                mediator.moveNode(diffX, diffY);

            });

        },

        _onStart : function () {
            this.startX = parseInt(this.box.attr("x"));
            this.startY = parseInt(this.box.attr("y"));
        },

        _onEnd : function () {
            this.startX = null;
            this.startY = null;
        },

        addAttachedNodeMediator : function (mediator) {

            this.attachedNodesMediators.push(mediator);
        },

        unAttachNodeMediator : function (mediator) {

            _.each(this.attachedNodesMediators, function (item, index) {

                if(item === mediator) {
                    this.attachedNodesMediators.splice(index, 1);
                }
            }, this);
        }
    });
});

