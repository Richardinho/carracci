define([
        'lineContainer',
        'ControllerDraggableElement',
        'ViewElement',
        'ModelDistalNode',
        'HorizontalConnectorMediator',
        'Collection',
        'componentContainer',
        'ConnectorFactory' ], function (

                                        LineContainer,
                                        ControllerDraggableElement,
                                        ViewElement,
                                        ModelDistalNode,
                                        HorizontalConnectorMediator,
                                        Collection,
                                        ComponentContainer,
                                        ConnectorFactory) {

    return ConnectorFactory.extend({


        createConnector : function (config) {

            var left,
                proximal,
                distal,
                right;

            componentId = ComponentContainer.createComponentSlot('Connector');

            var lineContainer = new LineContainer();

            left = this._createArrowNode({
                config : config.leftNode,
                lineContainer : lineContainer,
                direction : "left",
                componentId : componentId
            });

            proximal = this._createNode({
                config : config,
                lineContainer : lineContainer,
                direction : "proximal",
                componentId : componentId
            });

            distal = this._createNode({
                config : config,
                lineContainer : lineContainer,
                direction : "distal",
                componentId : componentId
            });

            right = this._createArrowNode({
                config : config.rightNode,
                lineContainer : lineContainer,
                direction : "right",
                componentId : componentId
            });

            line1Model = this._createLine( left, distal );
            line2Model = this._createLine( distal, proximal );
            line3Model = this._createLine( proximal, right );

            new HorizontalConnectorMediator({
                "leftArrow" : left,
                "proximalNode" : distal,
                "distalNode" : proximal,
                "rightArrow" : right
            });

            left.setProximalNodeModel(distal);
            left.setDistalNodeModel(proximal);

            distal.setArrowNodeModel(left);
            distal.setDistalNodeModel(proximal);
            distal.setLastNodeModel(right);

            proximal.setArrowNodeModel(right);
            proximal.setDistalNodeModel(right);
            proximal.setLastNodeModel(left);

            right.setProximalNodeModel(proximal);
            right.setDistalNodeModel(distal);

            lineContainer.lines = new Collection([line1Model, line2Model,line3Model]);

        },

        _createNode : function (options) {

            var config, lineContainer, x, y, model, view, controller, componentId;

            config = options.config;
            lineContainer = options.lineContainer;
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
                "lineContainer" : lineContainer,
                "name" : options.direction,
                "componentId" : componentId
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
    });
});