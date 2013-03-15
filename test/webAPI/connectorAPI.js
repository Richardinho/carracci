define(['jQuery',
        'BaseType',
        'ArrowNodeAPI',
        'NodeAPI',
        'horizontalConnector',
        'CoordinatorHorizontalConnector',
        'Collection',
        'ModelLine',
        'ViewLine'], function ($,
                                 BaseType,
                                 ArrowNodeAPI,
                                 NodeAPI,
                                 HorizontalConnector,
                                 CoordinatorHorizontalConnector,
                                 Collection,
                                 ModelLine,
                                 ViewLine ) {

    function getArrowNode (config, connector, direction) {

        return new ArrowNodeAPI({
            config : config,
            connector : connector,
            direction : direction
        });
    }

    function getProximalNode(config, connector) {

        return new NodeAPI({ config : config, connector : connector });
    }

    function getDistalNode(config, connector) {

        return new NodeAPI({ config : config, connector : connector });
    }

    return BaseType.extend({

        initialize : function (config) {

            this.id = config.id ;
            var connector = new HorizontalConnector();

            this.left = getArrowNode(config.leftNode, connector, "left");
            this.proximal = getProximalNode(config, connector);
            this.distal = getDistalNode(config, connector);
            this.right = getArrowNode(config.rightNode, connector, "right");

            function createLine( nodeA, nodeB ) {
                var lineModel = new ModelLine({ "nodeA" : nodeA, "nodeB" : nodeB });
                var lineView = new ViewLine({ model : lineModel });
                return lineModel;
            }

            var line1Model = createLine( this.left.model, this.distal.model );
            var line2Model = createLine( this.distal.model, this.proximal.model );
            var line3Model = createLine( this.proximal.model, this.right.model );


            new CoordinatorHorizontalConnector({ "leftArrow" : this.left.model,
                "proximalNode" : this.distal.model,
                "distalNode" : this.proximal.model,
                "rightArrow" : this.right.model   });


            this.left.model.setProximalNodeModel(this.proximal.model);
            this.left.model.setDistalNodeModel(this.proximal.model);

            this.distal.model.setArrowNodeModel(this.left.model);
            this.distal.model.setDistalNodeModel(this.proximal.model);
            this.distal.model.setLastNodeModel(this.right.model);

            this.proximal.model.setArrowNodeModel(this.right.model);
            this.proximal.model.setDistalNodeModel(this.distal.model);
            this.proximal.model.setLastNodeModel(this.left.model);

            this.right.model.setProximalNodeModel(this.proximal.model);
            this.right.model.setDistalNodeModel(this.distal.model);


            lineCollection = new Collection([line1Model, line2Model,line3Model]);

            connector.lines = lineCollection;

        },

        getLeftArrowNode : function () {
            return this.left;
        },

        getRightArrowNode : function () {
            return this.right;
        },

        getProximalNode : function () {
            return this.proximal;
        },

        getDistalNode : function () {
            return this.distal;
        }

    });
});

