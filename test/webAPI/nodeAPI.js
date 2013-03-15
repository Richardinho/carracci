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

            var config = options.config,
                connector = options.connector,
                x = (config.leftNode.x + config.rightNode.x) /2,
                y = config.rightNode.y;

            this.model = new ModelDistalNode({ id : "foo",
                                               "x" : x,
                                               "y" : y ,
                                               "connector" : connector });

            this.view = new ViewElement({ "model" : this.model });

            this.controller = new ControllerDraggableElement({ "model" :this.model,
                                                               "view" : this.view });

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
