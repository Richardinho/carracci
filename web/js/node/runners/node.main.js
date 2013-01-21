Glenmorangie.namespace("Glenmorangie");

$(document).ready(function () {

    var can = Raphael(0, 0, 800, 820);

    var svgUtils = Glenmorangie.svgUtils(can);


    var arrow = {};


    var nodeWithArrow = new Glenmorangie.VerticalArrowNode({ id : "id1",
                                                              x : 100,
                                                              y : 45,
                                                            svg : svgUtils,
                                                        "arrow" : arrow});



});
