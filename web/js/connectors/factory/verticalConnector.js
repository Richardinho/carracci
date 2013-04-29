define([
        'lineContainer',
        'ControllerDraggableElement',
        'ViewElement',
        'ModelDistalNode',
        'Collection',
        'componentContainer',
        'VerticalConnectorMediator',
        'ConnectorFactory' ], function (
                                LineContainer,
                                ControllerDraggableElement,
                                ViewElement,
                                ModelDistalNode,
                                Collection,
                                ComponentContainer,
                                VerticalConnectorMediator,
                                ConnectorFactory) {

    return ConnectorFactory.extend({

        createConnector : function (config) {
            var top,
                proximal,
                distal,
                bottom;

            componentId = ComponentContainer.createComponentSlot('VerticalConnector');
            ComponentContainer.store( componentId, []);

            var lineContainer = new LineContainer();

            top = this._createArrowNode({
                config : config.topNode,
                lineContainer : lineContainer,
                direction : "top",
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

            bottom = this._createArrowNode({
                config : config.bottomNode,
                lineContainer : lineContainer,
                direction : "bottom",
                componentId : componentId
            });

            line1Model = this._createLine( top, proximal );
            line2Model = this._createLine( proximal, distal );
            line3Model = this._createLine( distal, bottom );

            new VerticalConnectorMediator({
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

            lineContainer.lines = new Collection([line1Model, line2Model,line3Model]);

        },

        _createNode : function  (options) {

            var config, lineContainer, x, y, model, view, controller, componentId;

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
                "lineContainer" : lineContainer,
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
    });
});