define([
        'ModelPointer',
        'ModelDiamond',
        'ModelImplements',
        'ViewPointer',
        'CollectionPointer',
        'ModelArrowNode',
        'ViewArrowNode',
        'ControllerArrowNode',
        'ModelLine',
        'ViewLine',
        'componentContainer',
        'BaseType' ], function (
                                 ModelPointer,
                                 ModelDiamond,
                                 ModelImplements,
                                 ViewPointer,
                                 CollectionPointer,
                                 ModelArrowNode,
                                 ViewArrowNode,
                                 ControllerArrowNode,
                                 ModelLine,
                                 ViewLine,
                                 ComponentContainer,
                                 BaseType) {

    return BaseType.extend({


        createConnector : function (config) {},

        _createNode : function (options) {},

        _createLine : function (nodeA, nodeB) {
            var lineModel = new ModelLine({ "nodeA" : nodeA, "nodeB" : nodeB });
            var lineView = new ViewLine({ model : lineModel });
            return lineModel;
        },

        _createArrowNode : function (options) {

            var config, direction, lineContainer, x, y, pointers, model, view, controller, componentId;

            config = options.config;
            direction = options.direction;
            lineContainer = options.lineContainer;
            componentId = options.componentId;

            x = config.x;
            y = config.y;

            pointers = this._getPointers(config, direction);

            model = new ModelArrowNode({
                "x" : x,
                "y" : y,
                "lineContainer" : lineContainer,
                "pointers": pointers,
                "name" : direction
            });

            view = new ViewArrowNode({ "model" : model, "name" : direction });

            controller = new ControllerArrowNode({

                "model" : model,
                "view" : view,
                "name" : direction
            });
            ComponentContainer.store( componentId, [model, view, controller]);
            return model;
        },

        _getPointers : function (config, direction) {

            var pointers, pointerType, constructors, model, view;
            pointers = [];

            for(var i=0; i < config.arrows.length; i++) {

                pointerType = config.arrows[i];
                constructors = this._getPointerConstructors(pointerType);

                model = new constructors.model({
                    "direction" : direction,
                    "x" : config.x,
                    "y" : config.y
                });

                view = new constructors.view({
                    "model" : model
                });

                pointers.push(model);
            }

            return new CollectionPointer(pointers);
        },

        _getPointerConstructors : function (pointer) {

            switch(pointer) {
                case "diamond" :
                    return {
                        model : ModelDiamond,
                        view : ViewPointer
                    }
                    break;
                case "implements" :
                    return {
                        model : ModelImplements,
                        view : ViewPointer
                    }
                    break;
                case "none" :
                    return {
                        model : ModelPointer,
                        view : function () {}
                    }
                    break;
            }
        }
    });
});