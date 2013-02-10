Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);
    var keyManager = new Glenmorangie.Controller.KeyManager();

    var svgUtils = Glenmorangie.svgUtils(can);

    var connector = Glenmorangie.ConnectorFactory({ x1 : 20, y1 : 30, x2 : 220, y2 : 150, "svgUtils" : svgUtils, "keyManager" : keyManager });
    var connector2 = Glenmorangie.ConnectorFactory({ x1 : 40, y1 : 30, x2 : 240, y2 : 350, "svgUtils" : svgUtils, "keyManager" : keyManager });




});
