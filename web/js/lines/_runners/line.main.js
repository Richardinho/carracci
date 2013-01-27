Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);

    var svgUtils = Glenmorangie.svgUtils(can);

    var lineModel = new Glenmorangie.Model.Line({"svgUtils" : svgUtils, nodeA : {xCood : 50, yCood : 50 }, nodeB : {xCood : 150, yCood :150 } });
    var lineView = new Glenmorangie.View.Line({"svgUtils" : svgUtils, model : lineModel } );
    lineView.render();

});
