Glenmorangie.namespace("Glenmorangie");

Glenmorangie.NodeFactory = function(utils) {

    var svgUtils = utils;

    return {

        createArrowNode : function (x,y, direction, connector, id) {

            var arrow = new Glenmorangie.WhiteDiamond({ "svgUtils" : svgUtils,
                                                        "x" : x, "y" : y  });

            return new Glenmorangie.HorizontalArrowNode({ "id" : id,
                                                              "x" : x,
                                                              "y" : y,
                                                      "direction" : direction,
                                                            svg : svgUtils,
                                                        "arrow" : arrow, "connector" : connector});
        },

        createNode : function (x, y, connector, id) {

            return new Glenmorangie.DraggableElement({
                                                         "svg" :svgUtils,
                                                         "x": x,
                                                         "y": y, "connector" : connector, "id" : id });
        }
    }
};