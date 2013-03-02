Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);

    var svgUtils = Glenmorangie.svgUtils(can);


    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "right", x : 100, y : 50 });
    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "left", x : 100, y : 50 });
    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "up", x : 100, y : 50 });
    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "down", x : 100, y : 50 });



});