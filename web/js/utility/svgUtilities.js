Glenmorangie.namespace("Glenmorangie.svgUtils");


Glenmorangie.svgUtils.createCircle = function(paper, x, y) {
    var circle = paper.circle(x, y, 10);
    circle.attr("fill", "#f00");
    circle.attr("stroke", "#fff");
    return circle;
}


Glenmorangie.svgUtils.buildPath = function (x1, y1, x2, y2) {
    return "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
}

Glenmorangie.svgUtils.createLine = function (paper, x1, y1, x2, y2) {
    return paper.path(Glenmorangie.svgUtils.buildPath(x1, y1, x2, y2));
}

Glenmorangie.svgUtils.resetLine = function (line, x1, y1, x2, y2) {
    line.attr({ "path" : Glenmorangie.svgUtils.buildPath(x1, y1, x2, y2)});
}

Glenmorangie.svgUtils.createRectangle = function (paper, x1, y1, width, height) {
    var rect =  paper.rect(x1, y1, width, height);
    rect.attr({"fill" : "red"});
    return rect;
}