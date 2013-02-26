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
            circle.attr("opacity", 0.2);
            circle.attr("stroke", "#fff");
            return circle;
        },

        createUmlBox : function ( x1, y1, width, height, properties) {
            var offset = 10;
            svg.setStart();
            var rect =  svg.rect(0, 0, width, height);
            rect.attr({ "fill" : "#ffffce" });
            for(var i=0; i < properties.length; i++) {
                svg.text(30, (10 * i) + offset, properties[i]).attr({ "fill" : "black" });
            }

            var st = svg.setFinish();
            st.translate(x1, y1);
            return st;
        },

        resetRectangle : function (rect, x, y) {
            //rect.translate(x, y);
            rect.attr({ "x" : x, "y" : y });
        },

        createText : function (text) {
            svg.text(100, 100, text);
        },

        resetLine : function (line, type) {
            console.log("reset line")
            if (type === "dashes") {
                line.attr("stroke-dasharray", "-");
            } else {
                line.attr({"stroke-dasharray" : ""});
            }
        }
    };
});

