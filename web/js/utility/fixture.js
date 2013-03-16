define(['BaseType',
        'componentContainer',
        'ClassBoxModel',
        'ClassBoxView',
        'ClassBoxController',
        'GuiView' ,
        'GuiController',
        'propertyBuilder',
        'methodBuilder',
        'templateLoader',
        'horizontalConnector',
        'ModelArrowNode',
        'ControllerArrowNode',
        'ViewArrowNode',
        'ModelDiamond',
        'ViewPointer',
        'CollectionPointer',
        'ModelDistalNode',
        'ViewElement',
        'ControllerDraggableElement',
        'ModelLine',
        'ViewLine',
        'CoordinatorHorizontalConnector',
        'Collection',
        'MenuFactory' ], function (BaseType,
                                 ComponentContainer,
                                 ClassBoxModel,
                                 ClassBoxView,
                                 ClassBoxController,
                                 GuiView,
                                 GuiController,
                                 propertyBuilder,
                                 methodBuilder,
                                 templateLoader,
                                 HorizontalConnector,
                                 ModelArrowNode,
                                 ControllerArrowNode,
                                 ViewArrowNode,
                                 ModelDiamond,
                                 ViewPointer,
                                 CollectionPointer,
                                 ModelDistalNode,
                                 ViewElement,
                                 ControllerDraggableElement,
                                 ModelLine,
                                 ViewLine,
                                 CoordinatorHorizontalConnector,
                                 Collection,
                                 MenuFactory) {

    return BaseType.extend({

        initialize : function () {
            templateLoader.initialize(['umlClassBoxGUI', 'tools', 'help'], '/web/templates/');


            var menu = MenuFactory();
        },

        setUp : function (config) {

            if(config.classBoxes) {
                this.setUpClasses(config.classBoxes);
            }

            if(config.connectors) {
                this.setUpConnectors(config.connectors);
            }

        },

        setUpConnectors : function (connectorsConfig) {

            var config, connector, left, proximal, distal, right, line1Model, line2Model, line3Model, componentId;

            for(var i = 0; i < connectorsConfig.length; i++) {

                config = connectorsConfig[i];

                componentId = ComponentContainer.createComponentSlot('Connector');

                connector = new HorizontalConnector();

                left = this.createArrowNode({
                    config : config.leftNode,
                    connector : connector,
                    direction : "left",
                    componentId : componentId
                });

                proximal = this.createNode({
                    config : config,
                    connector : connector,
                    direction : "proximal",
                    componentId : componentId
                });

                distal = this.createNode({
                    config : config,
                    connector : connector,
                    direction : "distal",
                    componentId : componentId
                });

                right = this.createArrowNode({
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

            }
        },

        createNode : function (options) {

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
        },

        createArrowNode : function (options) {

            var config, direction, connector, x, y, pointers, model, view, controller, componentId;

            config = options.config;
            direction = options.direction;
            connector = options.connector;
            componentId = options.componentId;

            x = config.x;
            y = config.y;

            pointers = this._getPointers(config, direction);

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
                    "y" : config.y,
                    "color" : "green"
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
            }
        },

        setUpClasses : function (classesConfig) {

            var classConfig, className, x, y, classBoxModel, classBoxView, classBoxController,
                propertiesConfigs, methodsConfigs, guiView, guiController, componentId;

            for(var i =0; i < classesConfig.length; i++) {





                classConfig = classesConfig[i];
                className = classConfig.name;

                x = classConfig.x;
                y = classConfig.y;

                classBoxModel = new ClassBoxModel({ "name" : className, "x" : x, "y" : y });

                classBoxView = new ClassBoxView({ model : classBoxModel });

                classBoxController = new ClassBoxController({ model : classBoxModel, view : classBoxView });

                if(classConfig.properties) {

                    propertiesConfigs = classConfig.properties;

                    for(var j=0; j < propertiesConfigs.length; j++) {

                        classBoxModel.addProperty(getProperty(propertiesConfigs[j]));
                    }
                }

                if (classConfig.methods) {

                    methodsConfigs = classConfig.methods;

                    for(var j=0; j < methodsConfigs.length; j++) {

                        classBoxModel.addMethod(getMethod(methodsConfigs[j]));
                    }
                }

                guiView = new GuiView({ model : classBoxModel , containerEl : $('#class-container') });

                guiController = new GuiController({ model : classBoxModel , view : guiView });

                componentId = ComponentContainer.createComponentSlot('UmlClass');

                ComponentContainer.store(
                    componentId,
                    [ classBoxModel,
                      classBoxView,
                      classBoxController,
                      guiView,
                      guiController
                    ]);


            }

            function getProperty(config) {
                return propertyBuilder(config.name).visibility(config.visibility).type(config.type).build();
            }

            function getMethod(config) {
                return methodBuilder(config.name).visibility(config.visibility).returnType(config.returnType).build();
            }
        }
    });
});