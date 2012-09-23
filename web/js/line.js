function createLine(a, b, canvas, orient) {

    var path,
        nodeA = a,
        nodeB = b,
        lineType = null,
        orientation = orient;



    var line = Glenmorangie.svgUtils.createLine(canvas,
                                                nodeA.getX(),
                                                nodeA.getY(),
                                                nodeB.getX(),
                                                nodeB.getY(),
                                                nodeB.direction(),
                                                orientation);

    return {
        render : function() {

            Glenmorangie.svgUtils.resetLine(line,
                                            nodeA.getX(),
                                            nodeA.getY(),
                                            nodeB.getX(),
                                            nodeB.getY(),
                                            lineType,
                                            nodeB.direction(),
                                            orientation);
        },

        dashes : function () {

            lineType = "dashes";
        },

        normal : function () {

            lineType = "normal";
        }
    }

}