
$(document).ready(function () {

    var canvas = Raphael(0, 0, 800, 820),
        nodeFactory = Glenmorangie.nodeFactory.initialize(canvas),
        connectorFactory = Glenmorangie.ConnectorFactory.initialize(canvas, nodeFactory),
        umlView = Glenmorangie.UmlViewFactory.initialize(canvas);

    Glenmorangie.module.keyHandler();

    connectorFactory.createConnector(100, 100);
    connectorFactory.createConnector(200, 200);

    connectorFactory.createVerticalConnector(200, 200);

});
