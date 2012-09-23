function createLine(a, b, canvas) {

    var path,
        nodeA = a,
        nodeB = b,
        lineType = null;



    var line = Glenmorangie.svgUtils.createLine(canvas,
                                                nodeA.getX(),
                                                nodeA.getY(),
                                                nodeB.getX(),
                                                nodeB.getY());

    return {
        render : function() {
            Glenmorangie.svgUtils.resetLine(line,
                                            nodeA.getX(),
                                            nodeA.getY(),
                                            nodeB.getX(),
                                            nodeB.getY(),
                                            lineType);
        },

        dashes : function () {

            lineType = "dashes";
            this.render();
        },

        normal : function () {

            lineType = "normal";
            this.render();
        }
    }

}