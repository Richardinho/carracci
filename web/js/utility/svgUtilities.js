define(['svg'], function(svg) {



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

        createPath : function (path, color) {
            var element = svg.path(path);
            element.attr({ fill : color } );
            element.attr({stroke : "black"})
            return element;
        },

        resetPath : function (element, path) {
            element.attr({"path" : path });
        },

        createCircle : function(x, y) {
            var circle = svg.circle(x, y, 10);
            circle.attr("fill" , "green");
            circle.attr("opacity", 0);
            circle.attr("stroke", "#fff");
            return circle;
        },

        createUmlBoxFoo : function (model) {
            return svg.UmlClassBox(model );
        },

        createUmlBoxPane : function (model) {
            return svg.TransparentPane(model);
        },

        resetRectangle : function (rect, x, y) {
            //rect.translate(x, y);
            rect.attr({ "x" : x, "y" : y });
        },

        createText : function (text) {
            svg.text(100, 100, text);
        },

        resetLine : function (line, type) {
            if (type === "dashes") {
                line.attr("stroke-dasharray", "-");
            } else {
                line.attr({"stroke-dasharray" : ""});
            }
        }

    };
});

