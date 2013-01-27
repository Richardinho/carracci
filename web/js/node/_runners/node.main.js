Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);

    var svgUtils = Glenmorangie.svgUtils(can);


/*    var arrow = new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "up", x : 100, y : 50 });
    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "down", x : 150, y : 50 });
    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "left", x : 150, y : 150 });
    new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils, direction : "right", x : 100, y : 150 });

    new Glenmorangie.WhiteArrow({ "svgUtils" : svgUtils, direction : "right", x : 120, y : 140 });
    new Glenmorangie.WhiteArrow({ "svgUtils" : svgUtils, direction : "up", x : 150, y : 190 });
    new Glenmorangie.WhiteArrow({ "svgUtils" : svgUtils, direction : "down", x : 160, y : 220 });
    new Glenmorangie.WhiteArrow({ "svgUtils" : svgUtils, direction : "left", x : 170, y : 260 });*/




    /*var nodeWithArrow = new Glenmorangie.VerticalArrowNode({ id : "id1",
                                                              x : 100,
                                                              y : 50,
                                                            svg : svgUtils,
                                                        "arrow" : arrow});*/

    var nodeFactory = Glenmorangie.NodeFactory(svgUtils);

    new Glenmorangie.HorizontalConnector({ "nodeFactory" : nodeFactory, x : 100, y : 100 });



});
