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
        'ViewElement'], function (BaseType,
                                           HorizontalConnector,
                                           ModelArrowNode,
                                           CollectionPointer,
                                           ModelDiamond,
                                           ViewPointer,
                                           ViewArrowNode,
                                           ControllerArrowNode,
                                           ControllerDraggableElement,
                                           ModelDistalNode,
                                           ViewElement) {


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

            xCood : function () {
                return arrowNodeModel.get('xCood');
            },

            yCood : function () {
                return arrowNodeModel.get('yCood');
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
            xCood : function () {
                return proximalNodeModel.get('xCood');
            },

            yCood : function () {
                return proximalNodeModel.get('yCood');
            }
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
            xCood : function () {
                return distalNodeModel.get('xCood');
            },

            yCood : function () {
                return distalNodeModel.get('yCood');
            }
        };

    }
});