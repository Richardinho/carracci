define([
    'utility/svg',
    'BaseType',
    'underscore',
    'utility/svgUtilities'
    ], function(
        paper,
        BaseType,
         _,
         SVGUtils
         ) {

            "use strict";

            /* this should simply read the model and render the typebox accordingly */
            return BaseType.extend({

                redraw : function (banner) {

                    // empty out contents of group

                    this.banner = banner;

                    while( this.group.firstChild ) {

                        this.group.removeChild( this.group.firstChild );

                    }

                    // recreate contents of group

                    this._createBanner(this.banner, this.group, this.svg);
                    // resize invisible rectangle

                    var svgRect = this.group.getBBox();

                    this.invisibleRect.attr({

                        width : svgRect.width,
                        height : svgRect.height

                    });

                },

                _createBanner : function (banner, group, svg) {

                    var NS= SVGUtils.NS;

                    createBanner(banner, group, svg);

                    function createBanner(banner, group, svg) {

                        var background = createBackground(banner);
                        var title = createTitle(banner);
                        var description = createDescription(banner, svg);
                        var created = createCreated(banner);

                        group.appendChild(background);
                        group.appendChild(title);
                        group.appendChild(description);
                        group.appendChild(created);

                        var titleHeight = title.getBBox().height;
                        var descriptionHeight = description.getBBox().height;
                        var createdHeight = created.getBBox().height;

                        description.setAttribute('y', titleHeight);
                        created.setAttribute('y', titleHeight + descriptionHeight + banner.title.fontSize);
                        background.setAttribute('height', titleHeight + descriptionHeight + banner.title.fontSize + createdHeight);

                    }

                    function createTitle(banner) {

                        var svgTextNode = createSVGTextNode(banner.title.fontSize, banner.title.fontFamily);

                        svgTextNode.setAttribute("y", banner.title.fontSize);
                        svgTextNode.setAttribute("text-anchor", "middle");
                        svgTextNode.setAttribute("x", banner.width / 2);

                        var text = document.createTextNode(banner.title.text);

                        svgTextNode.appendChild(text);

                        return svgTextNode;

                    }

                    function createDescription(banner, svg) {

                        var linesArray = segmentText(banner, svg);
                        var svgTextNode = createSVGTextNode(banner.fontSize, banner.fontFamily);
                        svgTextNode.setAttribute('y', banner.title.fontSize);
                        linesArray.forEach(function(text, index) {

                            var tSpan = document.createElementNS(NS, "tspan");
                            var t = document.createTextNode(text);
                            tSpan.appendChild(t);
                            tSpan.setAttribute('dy', 20);
                            tSpan.setAttribute('x', banner.paddingHorizontal);

                            svgTextNode.appendChild(tSpan);

                        });

                        return svgTextNode;


                    }

                    function createCreated(banner) {

                        var created = banner.created;
                        var svgTextNode = createSVGTextNode(10, banner.fontFamily);
                        svgTextNode.setAttribute("x", banner.paddingHorizontal);
                        svgTextNode.setAttribute("y", 120);

                        var text = document.createTextNode("created: " + created);
                        svgTextNode.appendChild(text);

                        return svgTextNode;

                    }

                    function createBackground(banner) {

                        var rect = document.createElementNS(NS, "rect");
                        rect.setAttribute("fill", "white");
                        rect.setAttribute("width", banner.width);
                        rect.setAttribute("x", 0);
                        rect.setAttribute("y", 0);
                        rect.setAttribute("stroke", 'black');
                        rect.setAttribute("stroke-width", 1);

                        return rect;

                    }

                    // create a text node
                    function createSVGTextNode(fontSize, fontFamily) {

                        var textEl = document.createElementNS(NS, "text");

                        textEl.setAttribute("font-family", fontFamily);
                        textEl.setAttribute("font-size", fontSize);
                        //textEl.setAttribute("x", 100);
                       // textEl.setAttribute("y", 0);

                        return textEl;

                    }

                    function segmentText(banner, svg) {

                        var textArray = banner.description.split(/\s/);
                        var maxWidth = banner.width - (banner.paddingHorizontal * 2);
                        var tempArray = [];

                        var textNode = createSVGTextNode(banner.fontSize, banner.fontFamily);
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



                },

                initialize : function (options) {

                    this.banner = options.model;
                    var banner = this.banner;

                    var NS= SVGUtils.NS;
                    // give canvas an id so we can find the raw element. Must be a better way of doing this!
                    paper.canvas.id = "foo"

                    var svg = document.getElementById('foo');
                    this.svg = svg;
                    var group = document.createElementNS(NS, "g");
                    this.group = group;

                    svg.appendChild(group);

                    this._createBanner(banner, group, svg);

                    var svgRect = group.getBBox();

                    this.invisibleRect = paper.rect(0, 0, svgRect.width, svgRect.height);

                    dragger(group, this.invisibleRect);

                    function dragger(draggable, c) {

                        c.attr({ fill : "red", opacity : 0 });
                        c.drag(onMove, onStart, onEnd);
                        c.attr('cursor', 'move');

                        var startX, startY;

                        function onMove (dx, dy) {
                            var x = startX + dx;
                            var y = startY + dy;

                            c.attr({

                                x : x,
                                y : y

                            });

                            draggable.setAttribute('transform', "translate(" + x + " ," + y + ")");

                        }

                        function onStart () {
                            startX = parseInt(c.attr("x"));
                            startY = parseInt(c.attr("y"));
                        }
                        function onEnd () {
                            startX = null;
                            startY = null;
                        }

                    }
                }


            });

        });