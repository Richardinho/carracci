define(['keyManager',
        'globalController',
        'svgUtilities',
        'horizontalConnector',
        'ModelDiamond',
        'ViewPointer',
        'CollectionPointer',
        'ModelArrowNode',
        'ViewArrowNode',
        'ControllerArrowNode',
        'ControllerDraggableElement',
        'ViewElement',
        'ModelDistalNode',
        'ModelLine',
        'ViewLine',
        'CoordinatorHorizontalConnector',
        'Collection',
        'componentContainer' ], function (keyManager,
                                          globalController,
                                          svgUtils,
                                          HorizontalConnector,
                                          ModelDiamond,
                                          ViewPointer,
                                          CollectionPointer,
                                          ModelArrowNode,
                                          ViewArrowNode,
                                          ControllerArrowNode,
                                          ControllerDraggableElement,
                                          ViewElement,
                                          ModelDistalNode,
                                          ModelLine,
                                          ViewLine,
                                          CoordinatorHorizontalConnector,
                                          Collection,
                                          ComponentContainer) {

    return function (config) {

        componentId = ComponentContainer.createComponentSlot('Connector');

        connector = new HorizontalConnector();

        left = createArrowNode({
            config : config.leftNode,
            connector : connector,
            direction : "left",
            componentId : componentId
        });

        proximal = createNode({
            config : config,
            connector : connector,
            direction : "proximal",
            componentId : componentId
        });

        distal = createNode({
            config : config,
            connector : connector,
            direction : "distal",
            componentId : componentId
        });

        right = createArrowNode({
            config : config.rightNode,
            connector : connector,
            direction : "right",
            componentId : componentId
        });

        function createLine( nodeA, nodeB ) {

            var lineModel = new ModelLine({ "nodeA" : nodeA, "nodeB" : nodeB });
            var lineView = new ViewLine({ model : lineModel });
            return lineModel;
        }

        line1Model = createLine( left, distal );
        line2Model = createLine( distal, proximal );
        line3Model = createLine( proximal, right );

        new CoordinatorHorizontalConnector({
            "leftArrow" : left,
            "proximalNode" : distal,
            "distalNode" : proximal,
            "rightArrow" : right
        });

        left.setProximalNodeModel(proximal);
        left.setDistalNodeModel(proximal);

        distal.setArrowNodeModel(left);
        distal.setDistalNodeModel(proximal);
        distal.setLastNodeModel(right);

        proximal.setArrowNodeModel(right);
        proximal.setDistalNodeModel(right);
        proximal.setLastNodeModel(left);

        right.setProximalNodeModel(proximal);
        right.setDistalNodeModel(distal);

        connector.lines = new Collection([line1Model, line2Model,line3Model]);


        function createNode (options) {

            var config, connector, x, y, model, view, controller, componentId;

            config = options.config;
            connector = options.connector;
            componentId = options.componentId;

            x = (config.leftNode.x + config.rightNode.x) /2;

            if(options.direction === "proximal") {
                y = config.rightNode.y;
            } else {
                y = config.leftNode.y;
            }

            model = new ModelDistalNode({
                "x" : x,
                "y" : y ,
                "connector" : connector,
                "name" : options.direction
            });

            view = new ViewElement({ "model" : model, "name" : options.direction });

            controller = new ControllerDraggableElement({
                "model" : model,
                "view" : view,
                "name" : options.direction
            });
            ComponentContainer.store( componentId, [model, view, controller]);
            return model;
        }

        function createArrowNode (options) {

            var config, direction, connector, x, y, pointers, model, view, controller, componentId;

            config = options.config;
            direction = options.direction;
            connector = options.connector;
            componentId = options.componentId;

            x = config.x;
            y = config.y;

            pointers = _getPointers(config, direction);

            model = new ModelArrowNode({
                "x" : x,
                "y" : y,
                "connector" : connector,
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
        }

        function _getPointers (config, direction) {

            var pointers, pointerType, constructors, model, view;
            pointers = [];

            for(var i=0; i < config.arrows.length; i++) {

                pointerType = config.arrows[i];
                constructors = _getPointerConstructors(pointerType);

                model = new constructors.model({
                    "direction" : direction,
                    "x" : config.x,
                    "y" : config.y,
                    "color" : "green"
                });

                view = new constructors.view({
                    "model" : model
                });

                pointers.push(model);
            }

            return new CollectionPointer(pointers);
        }

        function _getPointerConstructors (pointer) {

            switch(pointer) {
                case "diamond" :
                    return {
                        model : ModelDiamond,
                        view : ViewPointer
                    }
                    break;
            }
        }
    };
});