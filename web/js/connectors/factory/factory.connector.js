Glenmorangie.namespace("Glenmorangie");

Glenmorangie.ConnectorFactory = function (options) {

//  construct connector here.
    var x1 = options.x1,
        y1 = options.y1,
        x2 = options.x2,
        y2 = options.y2,
        connector,
        svgUtils = options.svgUtils,
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

    blackDiamondModel = new Glenmorangie.Model.Diamond({ direction : "left", "svgUtils" : svgUtils, x : x1, y : y1, color : "black" });

    blackDiamondView = new Glenmorangie.View.Pointer({ model : blackDiamondModel , "svgUtils" : svgUtils });

    pointers = new Glenmorangie.Collection.Pointer([ blackDiamondModel ]);

    leftArrowNodeModel = new Glenmorangie.Model.ArrowNode({ id : "foo", x : x1, y : y1 , "connector" : connector, "pointers": pointers });

    leftArrowNodeView = new Glenmorangie.View.ArrowNode({ "model" : leftArrowNodeModel, "svgUtils" : svgUtils });

    leftArrowNodeController = new Glenmorangie.Controller.ArrowNode({ "model" : leftArrowNodeModel,
                                                                        "view" : leftArrowNodeView,
                                                                        "keyManager" : keyManager  });

    leftProximalNodeModel = new Glenmorangie.Model.DistalNode({ id : "foo",
                                                                x : x1 + 100,
                                                                y : y1 ,
                                                                "connector" : connector });

    leftProximalNodeView = new Glenmorangie.View.Element({ "model" : leftProximalNodeModel,
                                                           "svgUtils" : svgUtils });

    leftProximalNodeController = new Glenmorangie.Controller.DraggableElement({ "model" : leftProximalNodeModel,
                                                                                "view" : leftProximalNodeView,
                                                                                "keyManager" : keyManager });

    rightProximalNodeModel = new Glenmorangie.Model.DistalNode({ id : "foo", x : x2 - 100, y : y2 , "connector" : connector });
    rightProximalNodeView = new Glenmorangie.View.Element({ "model" : rightProximalNodeModel, "svgUtils" : svgUtils });
    rightProximalNodeController = new Glenmorangie.Controller.DraggableElement({ "model" : rightProximalNodeModel, "view" : rightProximalNodeView, "keyManager" : keyManager  });

    blackDiamondModel2 = new Glenmorangie.Model.Diamond({ direction : "right", svgUtils : svgUtils, x : x2, y : y2, color : "green" });
    blackDiamondView2 = new Glenmorangie.View.Pointer({ model : blackDiamondModel2 , "svgUtils" : svgUtils });

    pointers2 = new Glenmorangie.Collection.Pointer([ blackDiamondModel2 ]);

    rightArrowNodeModel = new Glenmorangie.Model.ArrowNode({ id : "foo", x : x2, y : y2 , "connector" : connector, "pointers" : pointers2 });
    rightArrowNodeView = new Glenmorangie.View.ArrowNode({ "model" : rightArrowNodeModel, "svgUtils" : svgUtils });
    rightArrowNodeController = new Glenmorangie.Controller.ArrowNode({ "model" : rightArrowNodeModel, "view" : rightArrowNodeView, "keyManager" : keyManager  });

    line1Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , nodeA : leftArrowNodeModel, nodeB : leftProximalNodeModel });
    line1View = new Glenmorangie.View.Line({ model : line1Model, "svgUtils" : svgUtils });

    line2Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , nodeA : leftProximalNodeModel , nodeB : rightProximalNodeModel });
    line2View = new Glenmorangie.View.Line({ model : line2Model, "svgUtils" : svgUtils });

    line3Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , nodeA : rightProximalNodeModel , nodeB : rightArrowNodeModel });
    line3View = new Glenmorangie.View.Line({ model : line3Model, "svgUtils" : svgUtils });

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