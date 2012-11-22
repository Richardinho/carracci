Glenmorangie.namespace("Glenmorangie.svgUtils");


Glenmorangie.svgUtils.createCircle = function(paper, x, y) {
    var circle = paper.circle(x, y, 10);
    circle.attr("fill" , "red");
    circle.attr("opacity", 0);
    circle.attr("stroke", "#fff");
    return circle;

}


Glenmorangie.svgUtils.buildPath = function (x1, y1, x2, y2) {
    return "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
}

Glenmorangie.svgUtils.createLine = function (paper, x1, y1, x2, y2) {
    var element = paper.path(Glenmorangie.svgUtils.buildPath(x1, y1, x2, y2));
    return element;
}

Glenmorangie.svgUtils.resetLine = function (line, x1, y1, x2, y2, type) {

    line.attr({ "path" : Glenmorangie.svgUtils.buildPath(x1, y1, x2, y2)});

    if (type === "dashes") {
        line.attr("stroke-dasharray", "-");
    } else {
        line.attr({"stroke-dasharray" : ""});
    }
}



Glenmorangie.svgUtils.createRectangle = function (paper, x1, y1, width, height) {
    var rect =  paper.rect(x1, y1, width, height);
    rect.attr({"fill" : "red"});
    return rect;
}

Glenmorangie.svgUtils.createArrow = function (paper, x, y, direction) {
    var points = [];
    points.push(direction === "right" ? createPoint(x -10, y + 10) : createPoint(x +10, y + 10 ));
    points.push(createPoint(x, y));
    points.push(direction === "right" ? createPoint(x -10, y - 10) : createPoint(x +10, y - 10 ));

    var path =  buildPath(points, false);

    var element = paper.path(path);
    return element;
};

Glenmorangie.svgUtils.createExtendsArrow = function (paper, x, y, color, direction) {

    var points = [];
    console.log(direction)
    switch (direction) {
    case "right" :
        points.push(createPoint(x - 10, y + 10));
        points.push(createPoint(x , y));
        points.push(createPoint(x - 10, y - 10));
        break;
    case "left" :
        points.push(createPoint(x + 10, y + 10 ));
        points.push(createPoint(x , y));
        points.push(createPoint(x + 10, y - 10 ));
        break;
    case "up" :

        points.push(createPoint(x - 10, y + 10));
        points.push(createPoint(x , y));
        points.push(createPoint(x + 10, y + 10));
        break;
    case "down" :
        points.push(createPoint(x - 10, y - 10 ));
        points.push(createPoint(x , y));
        points.push(createPoint(x + 10, y - 10 ));
        break;
    default:
        throw {
            name : "NoSuchDirectionError",
            message : "direction must be one of [up,down,left,right], but was: " + direction
        };
    }

    var path =  buildPath(points, true);

    var element = paper.path(path);
    element.attr({fill: color});
    return element;
};

Glenmorangie.svgUtils.createNullElement = function (paper, x, y, direction) {
    var circle = paper.circle(x, y, 10);
    circle.attr("opacity", 0);
    return circle;
};

Glenmorangie.svgUtils.createDiamond = function (paper, x, y, color, direction) {
    var points = [];


    points.push(direction === "right" ? createPoint(x - 10, y + 10) : createPoint(x + 10, y + 10) );
    points.push(direction === "right" ? createPoint(x - 20, y) : createPoint(x, y));
    points.push(direction === "right" ? createPoint(x - 10, y - 10) : createPoint(x + 10, y - 10));
    points.push(direction === "right" ? createPoint(x, y) : createPoint(x + 20, y));

    var path =  buildPath(points, true);

    var element = paper.path(path);
    element.attr({fill: color});
    return element;

}

function createPoint(x, y) {
    return { 'x' : x, 'y' : y };
}

function buildPath(pointsArray, closePath) {
    var path = "M" + pointsArray[0].x + " " + pointsArray[0].y + "L";

    for (var i = 1; i < pointsArray.length; i++) {

        path += (pointsArray[i].x + " ");
        path += (pointsArray[i].y + " ");
    }
    if (closePath) {
        path += "Z";
    }
    return path;

}

