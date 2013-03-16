define(['jQuery',
        'BaseType',
        'ModelDistalNode',
        'ViewElement',
        'ControllerDraggableElement'], function ($,
                               BaseType,
                               ModelDistalNode,
                               ViewElement,
                               ControllerDraggableElement) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

        },

        coods : function (x, y) {
            this.xCood(x);
            this.yCood(y);
        },

        xCood : function (newXCood) {

            if(!newXCood) {
                return this.model.get('xCood');
            } else {
                this.model.update(newXCood, this.model.get('yCood'));
            }
        },

        yCood : function (newYCood) {

            if(!newYCood) {
                return this.model.get('yCood');
            } else {
                this.model.update(this.model.get('xCood'), newYCood);
            }
        },

        move : function (dx, dy) {
            this.model.update(this.xCood() + dx, this.yCood() + dy);
        }
    });
});
