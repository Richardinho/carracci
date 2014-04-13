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



                initialize : function (options) {

                    this.svg = document.getElementById('foo');

                    var x = 0;
                    var y = 0;

                    this.x = x;
                    this.y = y;
                    this.width = options.width;
                    this.height = 100;

                    var path = SVGUtils.buildPath([
                        SVGUtils.buildCoods(x,y),
                        SVGUtils.buildCoods(x + 20, y - 20),
                        SVGUtils.buildCoods(x + this.width, y - 20),
                        SVGUtils.buildCoods(x + this.width, y + this.height),
                        SVGUtils.buildCoods(x, y + this.height)

                    ], true);

                    var path2 = SVGUtils.buildPath([
                        SVGUtils.buildCoods(x,y),
                        SVGUtils.buildCoods(x + 20, y),
                        SVGUtils.buildCoods(x + 20, y -20)
                    ]);

                   var foo = this.createPathEl(path, 'yellow');
                   var bar = this.createPathEl(path2, 'red');

                   var group = this.createGroup();
                   this.group = group;
                   this.svg.appendChild(group);

                   group.appendChild(foo);
                   group.appendChild(bar);

                   //this.invisibleRect = paper.rect(x, y - 20, this.width, this.height);

                   //dragger(group, this.invisibleRect);





                },

                setCoods : function (x, y) {


                    this.group.setAttribute('transform', "translate(" + x + " ," + y + ")");
                },

                createGroup : function () {

                    return document.createElementNS(SVGUtils.NS, 'g');
                },

                createPathEl : function (path, color) {

                    var el = document.createElementNS(SVGUtils.NS, 'path');
                    el.setAttribute('d', path);
                    el.setAttribute('fill', color);
                    return el;

                }


            });

        });