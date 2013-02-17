Glenmorangie.namespace("Glenmorangie");

Glenmorangie.ConnectorFactory = function (options) {

//  construct connector here.
    var x1 = options.x1,
        y1 = options.y1,
        x2 = options.x2,
        y2 = options.y2,
        connector,
        svgUtils = options.svgUtils,
        globalController = options.globalController,
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
        keyManager = options.keyManager,
        lineCollection;

    connector = new Glenmorangie.Model.HorizontalConnector();
    var pointers = createPointers(svgUtils, x1, y1, "left", "pink");

    function createPointers(svgUtils, x, y, direction, color) {

        blackDiamondModel = new Glenmorangie.Model.Diamond({ "direction" : direction,
                                                             "svgUtils" : svgUtils,
                                                             "x" : x,
                                                             "y" : y,
                                                             "color" : color });

        blackDiamondView = new Glenmorangie.View.Pointer({ "model" : blackDiamondModel , "svgUtils" : svgUtils });

        pointers = new Glenmorangie.Collection.Pointer([ blackDiamondModel ]);

        return pointers;
    }
    var leftArrowNodeModel = createArrowNode(x1, y1, connector, pointers, svgUtils, keyManager, globalController);

    function createArrowNode(x, y, connector, pointers, svgUtils, keyManager, globalController) {

        var leftArrowNodeModel = new Glenmorangie.Model.ArrowNode({ "id" : "foo",
                                                                "x" : x,
                                                                "y" : y ,
                                                                "connector" : connector,
                                                                "pointers": pointers });

        var leftArrowNodeView = new Glenmorangie.View.ArrowNode({ "model" : leftArrowNodeModel, "svgUtils" : svgUtils });


        var leftArrowNodeController = new Glenmorangie.Controller.ArrowNode({ "model" : leftArrowNodeModel,
                                                                          "view" : leftArrowNodeView,
                                                                          "keyManager" : keyManager,
                                                                          "globalController" : globalController });

        return leftArrowNodeModel;
    }

    var leftProximalNodeModel = createProximalNode(x1 + 100, y1, connector, svgUtils, keyManager);

    function createProximalNode(x, y, connector, svgUtils, keyManager) {

       var leftProximalNodeModel = new Glenmorangie.Model.DistalNode({ id : "foo",
                                                                   "x" : x,
                                                                   "y" : y ,
                                                                   "connector" : connector });

       var leftProximalNodeView = new Glenmorangie.View.Element({ "model" : leftProximalNodeModel,
                                                              "svgUtils" : svgUtils });

       var leftProximalNodeController = new Glenmorangie.Controller.DraggableElement({ "model" : leftProximalNodeModel,
                                                                                   "view" : leftProximalNodeView,
                                                                                   "keyManager" : keyManager});
       return leftProximalNodeModel;
    }

    var rightProximalNodeModel = createProximalNode(x2 - 100, y2, connector, svgUtils, keyManager);

    var pointers2 = createPointers(svgUtils, x2, y2, "right", "yellow");

    var rightArrowNodeModel = createArrowNode(x2, y2, connector, pointers2, svgUtils, keyManager, globalController);



    line1Model = createLine( svgUtils, leftArrowNodeModel, leftProximalNodeModel );
    line2Model = createLine( svgUtils, leftProximalNodeModel, rightProximalNodeModel );
    line3Model = createLine( svgUtils, rightProximalNodeModel, rightArrowNodeModel );

    function createLine(svgUtils, nodeA, nodeB) {
        var line1Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , "nodeA" : nodeA, "nodeB" : nodeB });
        var line1View = new Glenmorangie.View.Line({ model : line1Model, "svgUtils" : svgUtils });
        return line1Model;
    }

    new Glenmorangie.Coordinator.HorizontalConnector({ "leftArrow" : leftArrowNodeModel,
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


    lineCollection = new Glenmorangie.Collection([line1Model, line2Model,line3Model]);
    connector.lines = lineCollection;

};