
$(document).ready(function () {

    Glenmorangie.module.canvas = Raphael(0, 0, 800, 820);

    var canvas = Glenmorangie.module.canvas;

    Glenmorangie.UmlViewFactory.initialize(canvas);

    Glenmorangie.module.keyHandler();

    Glenmorangie.module.Connector(Glenmorangie.module.canvas, 100, 100, "horizontal").initialize();

});
