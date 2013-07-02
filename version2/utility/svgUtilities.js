define(['utility/svg'], function(svg) {



    return {

        buildPath : function (pointsArray, closePath) {
            var path = "M" + pointsArray[0].x + " " + pointsArray[0].y + "L";

            for (var i = 1; i < pointsArray.length; i++) {

                path += (pointsArray[i].x + " ");
                path += (pointsArray[i].y + " ");
            }
            if (closePath) {
                path += "Z";
            }
            return path;
        },

        setShapeOpacity : function (element, op) {
            var opacity = op ? 1 : 0;
            element.attr("opacity", opacity );
        },

        nullObject : function () {

            return {
                attr : function () {},
                remove : function () {}

            }
        },

        createPath : function (path, color) {
            var element = svg.path(path);
            if(color) {
                element.attr({ fill : color } );
            }
            element.attr({stroke : "black" })
            return element;
        },

        resetPath : function (element, path) {
            element.attr({"path" : path });
        },

        createCircle : function(x, y) {
            var circle = svg.circle(x, y, 10);
            return circle;
        },

        resetRectangle : function (rect, x, y) {
            rect.attr({ "x" : x, "y" : y });
        },

        createText : function (text) {
            svg.text(100, 100, text);
        },

        resetLine : function (line, type) {
            if (type === "dashed") {
                line.attr("stroke-dasharray", "-");
            } else {
                line.attr({"stroke-dasharray" : ""});
            }
        }

    };
});

