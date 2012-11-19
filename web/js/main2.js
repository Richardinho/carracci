
$(document).ready(function () {

    var canvas = Raphael(0, 0, 800, 820);

    Glenmorangie.nodeFactory.initialize(canvas);
    Glenmorangie.UmlViewFactory.initialize(canvas);
    Glenmorangie.ConnectorFactory.initialize(canvas);

    Glenmorangie.module.keyHandler();

    Glenmorangie.ConnectorFactory.createConnector(100, 100);

});
