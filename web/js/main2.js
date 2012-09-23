
$(document).ready(function () {

    Glenmorangie.module.canvas = Raphael(10, 50, 500, 820);

    Glenmorangie.module.keyHandler();




    Glenmorangie.module.Connector(Glenmorangie.module.canvas, 100, 100, "horizontal").initialize();

});
