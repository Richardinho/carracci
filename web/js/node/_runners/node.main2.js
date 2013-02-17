Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);
    var keyManager = new Glenmorangie.Controller.KeyManager();

    var globalController = new Glenmorangie.Controller.Global();

    var svgUtils = Glenmorangie.svgUtils(can);

    var connector2 = Glenmorangie.ConnectorFactory({ x1 : 40, y1 : 30, x2 : 240, y2 : 350, "svgUtils" : svgUtils, "keyManager" : keyManager, "globalController" : globalController });


    var classBox = Glenmorangie.ClassBoxFactory({ x : 240, y : 130, "svgUtils" : svgUtils, "keyManager" : keyManager, "globalController" : globalController, "height" : 70, "width" : 100 });


    var classBox2 = Glenmorangie.ClassBoxFactory({ x : 340, y : 230, "svgUtils" : svgUtils, "keyManager" : keyManager, "globalController" : globalController, "height" : 90, "width" : 150 });






});
