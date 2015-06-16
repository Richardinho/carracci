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

                    var path = SVGUtils.buildPath([
                        SVGUtils.buildCoods(options.x1, options.y1),
                        SVGUtils.buildCoods(options.x2, options.y2)

                    ], false);

                    this.foo = this.createPathEl(path);

                    this.timestamp = new Date();

                    this.svg.insertBefore(this.foo, this.svg.firstChild);

                },

                destroy : function () {

                    this.svg.removeChild(this.foo);

                },

                update : function (x1, y1, x2, y2) {
                    console.log(this.timestamp);
                    var pathString = this._createPathString(x1, y1, x2, y2);
                    //console.log("path string", pathString);
                   // console.log("this.foo", this.foo);
                    this.foo.setAttribute("d", pathString);
                    // console.log("this.foo 2", this.foo);
                },

                createPathEl : function (path) {

                    var el = document.createElementNS(SVGUtils.NS, 'path');
                    el.setAttribute('d', path);
                    el.setAttribute('stroke', 'black');
                    el.setAttribute('stroke-width', '1');
                    el.setAttribute("stroke-dasharray", "1,1");
                    return el;

                },

                _createPathString : function (x1, y1, x2, y2) {

                    return SVGUtils.buildPath([
                        SVGUtils.buildCoods(x1, y1),
                        SVGUtils.buildCoods(x2, y2)

                    ], false);

                }


            });

        });