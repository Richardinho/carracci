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
        'Collection' ], function (keyManager,
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
                                          Collection) {

    return function (options) {


    //  construct connector here.
        var x1 = options.x1,
            y1 = options.y1,
            x2 = options.x2,
            y2 = options.y2,
            connector,
            blackDiamondModel,
            blackDiamondView,
            blackDiamondModel2,
            blackDiamondView2,
            pointers,
            pointers2,
            leftArrowNodeModel,
            leftArrowNodeView,
            leftArrowNodeController,
            rightArrowNodeModel,
            rightArrowNodeView,
            rightArrowNodeController,
            leftProximalNodeModel,
            leftProximalNodeView,
            leftProximalNodeController,
            rightProximalNodeModel,
            rightProximalNodeView,
            rightProximalNodeController,
            line1Model,
            line1View,
            line2Model,
            line2View,
            line3Model,
            line3View,
            lineCollection;

        connector = new HorizontalConnector();
        var pointers = createPointers(x1, y1, "left", "pink");

        function createPointers(x, y, direction, color) {

            var blackDiamondModel = new ModelDiamond({ "direction" : direction,
                                                       "x" : x,
                                                       "y" : y,
                                                       "color" : color });

            var blackDiamondView = new ViewPointer({ "model" : blackDiamondModel });

            var pointers = new CollectionPointer([ blackDiamondModel ]);

            return pointers;
        }

        var leftArrowNodeModel = createArrowNode(x1, y1, connector, pointers);



        function createArrowNode(x, y, connector, pointers) {

            var leftArrowNodeModel = new ModelArrowNode({ "id" : "foo",
                                                                        "x" : x,
                                                                        "y" : y ,
                                                                        "connector" : connector,
                                                                        "pointers": pointers });

            var leftArrowNodeView = new ViewArrowNode({ "model" : leftArrowNodeModel });

            new ControllerArrowNode({ "model" : leftArrowNodeModel, "view" : leftArrowNodeView });

            return leftArrowNodeModel;

        }



        var leftProximalNodeModel = createProximalNode(x1 + 100, y1, connector );

        function createProximalNode( x, y, connector ) {

           var leftProximalNodeModel = new ModelDistalNode({ id : "foo",
                                                             "x" : x,
                                                             "y" : y ,
                                                             "connector" : connector });

           var leftProximalNodeView = new ViewElement({ "model" : leftProximalNodeModel });

           var leftProximalNodeController = new ControllerDraggableElement({ "model" : leftProximalNodeModel,
                                                                             "view" : leftProximalNodeView });
           return leftProximalNodeModel;
        }



        var rightProximalNodeModel = createProximalNode(x2 - 100, y2, connector);

        var pointers2 = createPointers( x2, y2, "right", "yellow" );

        var rightArrowNodeModel = createArrowNode( x2, y2, connector, pointers2 );



        line1Model = createLine( leftArrowNodeModel, leftProximalNodeModel );
        line2Model = createLine( leftProximalNodeModel, rightProximalNodeModel );
        line3Model = createLine( rightProximalNodeModel, rightArrowNodeModel );

        function createLine( nodeA, nodeB ) {
            var lineModel = new ModelLine({ "nodeA" : nodeA, "nodeB" : nodeB });
            var lineView = new ViewLine({ model : lineModel });
            return lineModel;
        }


        new CoordinatorHorizontalConnector({ "leftArrow" : leftArrowNodeModel,
                                                           "proximalNode" : leftProximalNodeModel,
                                                           "distalNode" : rightProximalNodeModel,
                                                           "rightArrow" : rightArrowNodeModel   });


        leftArrowNodeModel.setProximalNodeModel(leftProximalNodeModel);
        leftArrowNodeModel.setDistalNodeModel(rightProximalNodeModel);

        leftProximalNodeModel.setArrowNodeModel(leftArrowNodeModel);
        leftProximalNodeModel.setDistalNodeModel(rightProximalNodeModel);
        leftProximalNodeModel.setLastNodeModel(rightArrowNodeModel);

        rightProximalNodeModel.setArrowNodeModel(rightArrowNodeModel);
        rightProximalNodeModel.setDistalNodeModel(leftProximalNodeModel);
        rightProximalNodeModel.setLastNodeModel(leftArrowNodeModel);

        rightArrowNodeModel.setProximalNodeModel(rightProximalNodeModel);
        rightArrowNodeModel.setDistalNodeModel(leftProximalNodeModel);


        lineCollection = new Collection([line1Model, line2Model,line3Model]);
        connector.lines = lineCollection;

        return connector;

    };

});