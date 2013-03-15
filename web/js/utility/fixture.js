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
        'Collection'], function (BaseType,
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
                                 Collection ) {

    return BaseType.extend({

        initialize : function () {
            templateLoader.initialize(['umlClassBoxGUI', 'tools', 'help'], '/web/templates/');

            ComponentContainer.createComponentSlot('UmlClass');
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

                connector = new HorizontalConnector();

                left = this.createArrowNode({
                    config : config.leftNode,
                    connector : connector,
                    direction : "left"
                });

                proximal = this.createNode({
                    config : config,
                    connector : connector,
                    direction : "proximal"
                });

                distal = this.createNode({
                    config : config,
                    connector : connector,
                    direction : "distal"
                });

                right = this.createArrowNode({
                    config : config.rightNode,
                    connector : connector,
                    direction : "right"
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

                componentId = ComponentContainer.createComponentSlot('Connector');

                ComponentContainer.store( componentId, [left, proximal, distal, right]);
            }
        },

        createNode : function (options) {

            var config, connector, x, y, model, view, controller;

            config = options.config;
            connector = options.connector;

            x = (config.leftNode.x + config.rightNode.x) /2;

            if(options.direction === "proximal") {
                y = config.rightNode.y;
            } else {
                y = config.leftNode.y;
            }

            model = new ModelDistalNode({
                "x" : x,
                "y" : y ,
                "connector" : connector
            });

            view = new ViewElement({ "model" : model });

            controller = new ControllerDraggableElement({
                "model" : model,
                "view" : view
            });
            return model;
        },

        createArrowNode : function (options) {

            var config, direction, connector, x, y, pointers, model, view, controller;

            config = options.config;
            direction = options.direction;
            connector = options.connector;

            x = config.x;
            y = config.y;

            pointers = this._getPointers(config, direction);

            model = new ModelArrowNode({
                "x" : x,
                "y" : y,
                "connector" : connector,
                "pointers": pointers
            });

            view = new ViewArrowNode({ "model" : model });

            controller = new ControllerArrowNode({

                "model" : model,
                "view" : view
            });

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

                    for(var j=0; j < methodsConfig.length; j++) {

                        classBoxModel.addMethod(getMethod(methodsConfig[j]));
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