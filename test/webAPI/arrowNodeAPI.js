define(['jQuery',
        'BaseType',
        'ModelDiamond',
        'ViewPointer',
        'ModelArrowNode',
        'ViewArrowNode',
        'ControllerArrowNode',
        'CollectionPointer'], function ($,
                                          BaseType,
                                          ModelDiamond,
                                          ViewPointer,
                                          ModelArrowNode,
                                          ViewArrowNode,
                                          ControllerArrowNode,
                                          CollectionPointer) {

    function getPointers(config, direction) {
        var pointers = [];
        for(var i=0; i < config.arrows.length; i++) {
            var pointerType = config.arrows[i];
            var constructors = getPointerConstructors(pointerType);

            var model = new constructors.model({ "direction" : direction,
                "x" : config.x,
                "y" : config.y,
                "color" : "green" });
            var view = new constructors.view({ "model" : model });

            pointers.push(model);

        }

        return new CollectionPointer(pointers);
    }

    function getPointerConstructors (pointer) {
        switch(pointer) {
            case "diamond" :
                return {
                    model : ModelDiamond,
                    view : ViewPointer
                }
                break;
        }
    }

    return BaseType.extend({

        initialize : function (options) {

/*            var config = options.config;
            var direction = options.direction;
            var connector = options.connector;

            var x = config.x;
            var y = config.y;

            var pointers = getPointers(config, direction);

            this.model = new ModelArrowNode({ "x" : x,
                                              "y" : y,
                                              "connector" : connector,
                                              "pointers": pointers });

            this.view = new ViewArrowNode({ "model" : this.model });


            this.controller = new ControllerArrowNode({ "model" : this.model,
                                                        "view" : this.view });*/

            this.model = options.model;
            this.view = options.view;
            this.controller = options.controller;
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
        },

        arrowDirection : function () {
            return this.model._getArrowModel().get("direction");
        },

        click : function () {
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent('click', true, false);
            this.view.element.node.dispatchEvent(evObj);
        }
    });
});
