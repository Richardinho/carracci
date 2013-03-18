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
        'componentContainer',
        'CoordinatorVerticalConnector' ], function (keyManager,
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
                                          ComponentContainer,
                                          CoordinatorVerticalConnector) {

    return function (config) {
        var top, proximal, distal, bottom;
        componentId = ComponentContainer.createComponentSlot('VerticalConnector');
        ComponentContainer.store( componentId, []);

        //connector = new HorizontalConnector();

        top = createArrowNode({
            config : config.topNode,
            connector : connector,
            direction : "top",
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

        bottom = createArrowNode({
            config : config.bottomNode,
            connector : connector,
            direction : "bottom",
            componentId : componentId
        });

        function createLine( nodeA, nodeB ) {

            var lineModel = new ModelLine({ "nodeA" : nodeA, "nodeB" : nodeB });
            var lineView = new ViewLine({ model : lineModel });
            return lineModel;
        }

        line1Model = createLine( top, proximal );
        line2Model = createLine( proximal, distal );
        line3Model = createLine( distal, bottom );

        new CoordinatorVerticalConnector({
            "topArrow" : top,
            "proximalNode" : distal,
            "distalNode" : proximal,
            "bottomArrow" : bottom
        });

        top.setProximalNodeModel(proximal);
        top.setDistalNodeModel(distal);

        distal.setArrowNodeModel(bottom);
        distal.setDistalNodeModel(proximal);
        distal.setLastNodeModel(top);

        proximal.setArrowNodeModel(top);
        proximal.setDistalNodeModel(distal);
        proximal.setLastNodeModel(bottom);

        bottom.setProximalNodeModel(distal);
        bottom.setDistalNodeModel(proximal);

        //connector.lines = new Collection([line1Model, line2Model,line3Model]);


        function createNode (options) {

            var config, connector, x, y, model, view, controller, componentId;

            config = options.config;
            connector = options.connector;
            componentId = options.componentId;

            y = (config.topNode.y + config.bottomNode.y) /2;

            if(options.direction === "proximal") {
                x = config.topNode.x;
            } else {
                x = config.bottomNode.x;
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