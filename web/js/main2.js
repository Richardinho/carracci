
$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);

    Glenmorangie.module.keyHandler();


    Glenmorangie.module.Connector(canvas, 100, 100, "horizontal").initialize();
    Glenmorangie.module.Connector(canvas, 100, 100, "vertical").initialize();

});
