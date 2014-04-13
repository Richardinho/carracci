define(['utility/svg'], function(svg) {



    return {

        //  constants
        //  namespace
        NS : "http://www.w3.org/2000/svg",

        //  path constants
        MOVE_TO   : "M",

        SEPARATOR : ",",

        LINETO    : "L",

        SPACE     : " ",

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

        createSVGTextNode : function (fontSize, fontFamily) {


            var textEl = document.createElementNS(this.NS, "text");

            textEl.setAttribute("font-family", fontFamily);
            textEl.setAttribute("font-size", fontSize);
            //textEl.setAttribute("x", 100);
            // textEl.setAttribute("y", 0);

            return textEl;


        },

        createTextBody : function (text, width, paddingHorizontal, fontFamily, fontSize,  svg) {

            var NS = this.NS;
            var self = this;

            function segmentText(text, width, paddingHorizontal, fontFamily, fontSize,  svg) {

                var textArray = text.split(/\s/);
                var maxWidth = width - (paddingHorizontal * 2);
                var tempArray = [];

                var textNode = self.createSVGTextNode(fontSize, fontFamily);
                var tSpan = document.createElementNS(NS, "tspan");

                svg.appendChild(textNode);
                textNode.appendChild(tSpan);

                var t;
                var resultArray = [];


                for(var i = 0; i < textArray.length; i++) {

                    var word = textArray[i];

                    tempArray.push(word);

                    if(t) {

                        tSpan.removeChild(t);
                    }
                    var string = tempArray.join(" ");
                    t = document.createTextNode(string);

                    tSpan.appendChild(t);

                    var width = tSpan.getBBox().width;

                    if(width > maxWidth) {

                        tempArray.pop();
                        resultArray.push(tempArray.join(" "));
                        tempArray = [word];

                    }

                }
                tSpan.removeChild(t);
                resultArray.push(tempArray.join(" "));

                return resultArray;

            }

            // create a text node


            var linesArray = segmentText(text, width, paddingHorizontal, fontFamily, fontSize,  svg);
            var svgTextNode = this.createSVGTextNode(fontSize, fontFamily);
            svgTextNode.setAttribute('y', fontSize);
            linesArray.forEach(function(text, index) {

                var tSpan = document.createElementNS(NS, "tspan");
                var t = document.createTextNode(text);
                tSpan.appendChild(t);
                tSpan.setAttribute('dy', 20);
                tSpan.setAttribute('x', paddingHorizontal);

                svgTextNode.appendChild(tSpan);

            });

            return svgTextNode;

        },

        buildCoods : function(x, y) {


            return {

                x : x, y : y
            };

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

        resetLineStyle : function (line, type) {
            if (type === "dashed") {
                line.attr("stroke-dasharray", "-");
            } else {
                line.attr({"stroke-dasharray" : ""});
            }
        }

    };
});

