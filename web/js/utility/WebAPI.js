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
        "Collection"], function (BaseType,
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
                                           Collection) {


    return BaseType.extend({


        initialize : function (config) {

            var connectors = config.connectors;
            this.connectors = {};
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
        }
    });


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