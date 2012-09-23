Glenmorangie.namespace("Glenmorangie.svgUtils");


Glenmorangie.svgUtils.createCircle = function(paper, x, y) {
    var circle = paper.circle(x, y, 10);
    circle.attr("fill" , "red");
    //circle.attr("opacity", 0);
    circle.attr("stroke", "#fff");
    return circle;
}


Glenmorangie.svgUtils.buildPath = function (x1, y1, x2, y2) {
    return "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
}

Glenmorangie.svgUtils.createLine = function (paper, x1, y1, x2, y2) {
    var element = paper.path(Glenmorangie.svgUtils.buildPath(x1, y1, x2, y2));
    element.attr("stroke-dasharray", "--");
    return element;
}

Glenmorangie.svgUtils.resetLine = function (line, x1, y1, x2, y2) {
    line.attr({ "path" : Glenmorangie.svgUtils.buildPath(x1, y1, x2, y2)});
}

Glenmorangie.svgUtils.createRectangle = function (paper, x1, y1, width, height) {
    var rect =  paper.rect(x1, y1, width, height);
    rect.attr({"fill" : "red"});
    return rect;
}



Glenmorangie.svgUtils.createDiamond = function (paper, x, y, color) {
    var points = [];
    points.push(createPoint(x, y + 10));
    points.push(createPoint(x - 10, y));
    points.push(createPoint(x, y - 10));
    points.push(createPoint(x + 10, y));

    var path =  "M" + points[0].x + " "
                    + points[0].y
                    + "L"
                    + points[1].x + " "
                    + points[1].y + " "
                    + points[2].x + " "
                    + points[2].y + " "
                    + points[3].x + " "
                    + points[3].y + " "
                    + "Z"


    var element = paper.path(path);
    element.attr({fill: color});
    return element;
    function createPoint(x, y) {
        return { 'x' : x, 'y' : y };
    }
}

