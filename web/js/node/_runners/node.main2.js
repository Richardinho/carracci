Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);

    var svgUtils = Glenmorangie.svgUtils(can);
    var connector = new Glenmorangie.Model.HorizontalConnector();

    var arrowModel = new Glenmorangie.Model.Diamond({ "svgUtils" : svgUtils, x : 100, y : 50 });
    var arrowView = new Glenmorangie.View.Diamond({ model : arrowModel , "svgUtils" : svgUtils });

    var model = new Glenmorangie.Model.ArrowNode({ id : "foo", x : 100, y : 50 , "connector" : connector, "arrowModel" : arrowModel });
    var view = new Glenmorangie.View.ArrowNode({ "model" : model, "svgUtils" : svgUtils, "arrowView" : arrowView });
    var controller = new Glenmorangie.Controller.DraggableElement({ "model" : model, "view" : view  });


    var proximalModel = new Glenmorangie.Model.DistalNode({ id : "foo", x : 150, y : 50 , "connector" : connector });
    var proximalView = new Glenmorangie.View.Element({ "model" : proximalModel, "svgUtils" : svgUtils });
    var controller2 = new Glenmorangie.Controller.DraggableElement({ "model" : proximalModel, "view" : proximalView });

    var distalModel = new Glenmorangie.Model.DistalNode({ id : "foo", x : 150, y : 100 , "connector" : connector });
    var distalView = new Glenmorangie.View.Element({ "model" : distalModel, "svgUtils" : svgUtils });
    var distalController = new Glenmorangie.Controller.DraggableElement({ "model" : distalModel, "view" : distalView  });


    var arrowModel2 = new Glenmorangie.Model.Diamond({ "svgUtils" : svgUtils, x : 250, y : 100 });
    var arrowView2 = new Glenmorangie.View.Diamond({ model : arrowModel2 , "svgUtils" : svgUtils });

    var blahModel = new Glenmorangie.Model.ArrowNode({ id : "foo", x : 250, y : 100 , "connector" : connector, "arrowModel" : arrowModel2 });
    var blahView = new Glenmorangie.View.ArrowNode({ "model" : blahModel, "svgUtils" : svgUtils, "arrowView" : arrowView2 });
    var blahController = new Glenmorangie.Controller.DraggableElement({ "model" : blahModel, "view" : blahView });




    var line1Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , nodeA : model, nodeB : proximalModel });
    var line1View = new Glenmorangie.View.Line({ model : line1Model, "svgUtils" : svgUtils });

    var line2Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , nodeA : proximalModel , nodeB : distalModel });
    var line2View = new Glenmorangie.View.Line({ model : line2Model, "svgUtils" : svgUtils });

    var line3Model = new Glenmorangie.Model.Line({ "svgUtils" : svgUtils , nodeA : distalModel , nodeB : blahModel });
    var line3View = new Glenmorangie.View.Line({ model : line3Model, "svgUtils" : svgUtils });

    model.setProximalNodeModel(proximalModel);
    model.setDistalNodeModel(distalModel);

    proximalModel.setArrowNodeModel(model);
    proximalModel.setDistalNodeModel(distalModel);
    proximalModel.setLastNodeModel(blahModel);

    distalModel.setArrowNodeModel(blahModel);
    distalModel.setDistalNodeModel(proximalModel);
    distalModel.setLastNodeModel(model);

    blahModel.setProximalNodeModel(distalModel);
    blahModel.setDistalNodeModel(proximalModel);


    connector.nodes.push(proximalView);
    connector.nodes.push(view);
    connector.nodes.push(distalView);
    connector.nodes.push(blahView);

    connector.lineModels.push(line1Model);
    connector.lineModels.push(line2Model);
    connector.lineModels.push(line3Model);

    connector.lines.push(line1View);
    connector.lines.push(line2View);
    connector.lines.push(line3View);






});
