define(['BaseType',
        'horizontalConnector',
        'ModelArrowNode',
        'CollectionPointer',
        'ModelDiamond',
        'ViewPointer',
        'ViewArrowNode',
        'ControllerArrowNode',
        'ControllerDraggableElement',
        'ModelDistalNode',
        'ViewElement',
        'ModelLine',
        "ViewLine",
        "CoordinatorHorizontalConnector",
        "Collection",
        "ClassBoxModel",
        "propertyBuilder",
        "ClassBoxView",
        "ClassBoxController",
        "keyManager",
        "GuiView",
        "GuiController",
        "methodBuilder",
        "templateLoader"], function (BaseType,
                                           HorizontalConnector,
                                           ModelArrowNode,
                                           CollectionPointer,
                                           ModelDiamond,
                                           ViewPointer,
                                           ViewArrowNode,
                                           ControllerArrowNode,
                                           ControllerDraggableElement,
                                           ModelDistalNode,
                                           ViewElement,
                                           ModelLine,
                                           ViewLine,
                                           CoordinatorHorizontalConnector,
                                           Collection,
                                           ClassBoxModel,
                                           propertyBuilder,
                                           ClassBoxView,
                                           ClassBoxController,
                                           KeyManager,
                                           GuiView,
                                           GuiController,
                                           methodBuilder,
                                           templateLoader) {


    function getProperty(config) {
        return propertyBuilder(config.name).visibility(config.visibility).type(config.type).build();
    }

    function getMethod(config) {
        return methodBuilder(config.name).visibility(config.visibility).returnType(config.returnType).build();
    }

    return BaseType.extend({


        initialize : function (config) {

            var connectors = config.connectors;
            this.connectors = {};
            this.classes = {};
            this.classGuis = {};

            templateLoader.initialize(['umlClassBoxGUI', 'tools', 'help'], '/web/templates/');

            var classes = config.classBoxes;

            for(var i =0; i < classes.length; i++) {
                var classConfig = classes[i];



                var className = classConfig.name;
                var classId = classConfig.id;

                var x = classConfig.x;
                var y = classConfig.y;

                var classBoxModel = new ClassBoxModel({ "name" : className, "id" : classId, "x" : x, "y" : y });
                var classBoxView = new ClassBoxView({ model : classBoxModel });
                var classBoxController = new ClassBoxController({ model : classBoxModel, view : classBoxView });
                var propertiesConfig = classConfig.properties;
                var methodsConfig = classConfig.methods;

                for(var j=0; j < propertiesConfig.length; j++) {
                    var propertyConfig = propertiesConfig[j];
                    classBoxModel.addProperty(getProperty(propertyConfig));
                }
                if(methodsConfig) {
                    for(var j=0; j < methodsConfig.length; j++) {
                        var methodConfig = methodsConfig[j];
                        classBoxModel.addMethod(getMethod(methodConfig));
                    }
                }


                var guiView = new GuiView({ model : classBoxModel , containerEl : $('#class-container') });
                var guiController = new GuiController({ model : classBoxModel , view : guiView });

                this.classGuis[classId] = {

                    id : classId,

                    model : classBoxModel,

                    ControllerClass : GuiController,

                    view : guiView,

                    controller : guiController,

                    setClassName : function (name) {
                        //this.controller.changeClassName({ currentTarget : { value : name }});
                        var inputEl = this.view.getMyEl().find('.changeClassName input');
                        inputEl.val(name);
                        inputEl.trigger("change");

                    },

                    clickAddMethod : function () {
                        this.view.getMyEl().find('.methods .addMethod input').click();
                    },

                    properties : function() {
                        return getProperties(this.view.getMyEl());
                    },

                    property : function (index) {
                        return getProperties(this.view.getMyEl()).property(index);
                    },

                    methods : function () {
                        return getMethods(this.view.getMyEl());
                    },

                    method : function(index) {
                        return getMethods(this.view.getMyEl()).method(index);
                    }
                };

                function getMethods(element) {
                    return {


                        method : function (index) {
                            var method = $(element.find('.methods .method').get(index));

                            return {
                                name : function () {
                                    return method.find('.name input').val();
                                },

                                clickOnVisibility : function () {
                                    method.find('.visibility').click();
                                },

                                visibility : function () {
                                    return method.find('.visibility').text().trim();
                                }
                            }
                        },

                        size : function () {
                            return element.find('.methods .method').size();
                        }
                    };
                }

                function getProperties(element) {
                    return {

                        property : function (index) {
                            var property = $(element.find('.properties .property').get(index + 1));

                            return {

                                name : function (name) {
                                    if(name){
                                        property.find('.name input').val(name);
                                    } else {
                                        return property.find('.name input').val();
                                    }

                                },

                                visibility : function () {
                                    return property.find('.visibility').text().trim();
                                },

                                clickOnVisibility : function () {
                                    property.find('.visibility').click();
                                },

                                type : function (type) {
                                    if(type) {
                                        property.find('.type input').val(type);
                                    } else {
                                        return property.find('.type input').val();
                                    }

                                }
                            }
                        },

                    };
                }

                this.classes[classId] = {

                    id : classId ,

                    model : classBoxModel,

                    view : classBoxView,

                    xCood : function () {
                        return this.model.get('xCood');
                    },

                    yCood : function () {
                        return this.model.get('yCood');
                    },

                    move : function (dx, dy) {
                        this.model.set({ 'startX': this.xCood() });
                        this.model.set({ 'startY': this.yCood() });
                        this.model.translate(dx, dy);
                    },

                    click : function () {
                        var evObj = document.createEvent('MouseEvents');
                        evObj.initEvent('click', true, false);
                        this.view.element.node.dispatchEvent(evObj);
                    },
                    height : function () {
                        return this.model.get("height");
                    }
                };

            }

            for(var i = 0; i < connectors.length; i++) {
                var config = connectors[i];
                var connectorObj = { id : config.id };
                var connector = new HorizontalConnector();
                //  fill up connectorObj here.
                connectorObj.left = getArrowNode(config.leftNode, connector, "left");
                connectorObj.proximal = getProximalNode(config, connector);
                connectorObj.distal = getDistalNode(config, connector);
                connectorObj.right = getArrowNode(config.rightNode, connector, "right");

                function createLine( nodeA, nodeB ) {
                    var lineModel = new ModelLine({ "nodeA" : nodeA, "nodeB" : nodeB });
                    var lineView = new ViewLine({ model : lineModel });
                    return lineModel;
                }

                var line1Model = createLine( connectorObj.left.model, connectorObj.distal.model );
                var line2Model = createLine( connectorObj.distal.model, connectorObj.proximal.model );
                var line3Model = createLine( connectorObj.proximal.model, connectorObj.right.model );


                new CoordinatorHorizontalConnector({ "leftArrow" : connectorObj.left.model,
                                                     "proximalNode" : connectorObj.distal.model,
                                                     "distalNode" : connectorObj.proximal.model,
                                                     "rightArrow" : connectorObj.right.model   });


                connectorObj.left.model.setProximalNodeModel(connectorObj.proximal.model);
                connectorObj.left.model.setDistalNodeModel(connectorObj.proximal.model);

                connectorObj.distal.model.setArrowNodeModel(connectorObj.left.model);
                connectorObj.distal.model.setDistalNodeModel(connectorObj.proximal.model);
                connectorObj.distal.model.setLastNodeModel(connectorObj.right.model);

                connectorObj.proximal.model.setArrowNodeModel(connectorObj.right.model);
                connectorObj.proximal.model.setDistalNodeModel(connectorObj.distal.model);
                connectorObj.proximal.model.setLastNodeModel(connectorObj.left.model);

                connectorObj.right.model.setProximalNodeModel(connectorObj.proximal.model);
                connectorObj.right.model.setDistalNodeModel(connectorObj.distal.model);


                lineCollection = new Collection([line1Model, line2Model,line3Model]);
                connector.lines = lineCollection;

                this.connectors[config.id] = connectorObj;
            }

        },

        getLeftArrowNode : function (connectorId) {
            return this.connectors[connectorId]['left'];
        },

        getRightArrowNode : function (connectorId) {
            return this.connectors[connectorId]['right'];
        },

        getProximalNode : function (connectorId) {
            return this.connectors[connectorId]['proximal'];
        },

        getDistalNode : function (connectorId) {
            return this.connectors[connectorId]['distal'];
        },

        getConnector : function (id) {
            return this.connectors[id];
        },

        getClassBox : function (id) {
            return this.classes[id];
        },

        getClassBoxGui : function (id) {
            return this.classGuis[id];
        },

        keyDown : function (key) {

            var map = { 'U' : 85 },
                keyCode;

            key = key.toUpperCase();

            keyCode = map[key];

            KeyManager._keyDown({ "keyCode" : keyCode });

        }
    });
                                                           type

    function getArrowNode (config, connector, direction) {
        var x = config.x;
        var y = config.y;

        var pointers = getPointers(config, direction);

        var arrowNodeModel = new ModelArrowNode({ "x" : x,
                                                  "y" : y,
                                                  "connector" : connector,
                                                  "pointers": pointers });

        var arrowNodeView = new ViewArrowNode({ "model" : arrowNodeModel });


        var arrowNodeController = new ControllerArrowNode({ "model" : arrowNodeModel,
                                                            "view" : arrowNodeView });

        return {

            model : arrowNodeModel,

            view : arrowNodeView,

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


        };
    }

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

    function getProximalNode(config, connector) {

        var node1X = config.leftNode.x;
            node2X = config.rightNode.x;
            x = (node1X + node2X) /2,
            y = config.rightNode.y;

        var proximalNodeModel = new ModelDistalNode({ id : "foo",
                                                             "x" : x,
                                                             "y" : y ,
                                                             "connector" : connector });

        var proximalNodeView = new ViewElement({ "model" : proximalNodeModel });

        var proximalNodeController = new ControllerDraggableElement({ "model" : proximalNodeModel,
                                                                     "view" : proximalNodeView });
        return {

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
            model : proximalNodeModel
        };

    }

    function getDistalNode(config, connector) {

        var node1X = config.leftNode.x;
            node2X = config.rightNode.x;
            x = (node1X + node2X) /2,
            y = config.leftNode.y;

        var distalNodeModel = new ModelDistalNode({ "id" : "foo",
                                                    "x" : x,
                                                    "y" : y ,
                                                    "connector" : connector });

        var distalNodeView = new ViewElement({ "model" : distalNodeModel });

        var distalNodeController = new ControllerDraggableElement({ "model" : distalNodeModel,
                                                                     "view" : distalNodeView });
        return {
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

            model : distalNodeModel
        };

    }
});