define([
    "BaseType",
    'utility/svg'
    ],

    function (
        BaseType,
        paper
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.artifactType = "banner";

            this.model = options.model;
            this.view = options.view;

            this.proxyEl = this._createProxyEl();

            this.proxyEl.dblclick(function () {

                this.model.setSelected(this);

            }, this);

            this.model.on("delete", this.destroy, this);
        },

        _createProxyEl : function () {

            var rect = paper.rect(this.model.getXCood(), this.model.getYCood(), this.model.getWidth(), this.model.height);
            rect.attr({ fill : "red", opacity : 0 });
            this._dragger(rect);
            return rect;

        },

        destroy : function () {

           this.proxyEl.remove();

        },

        _dragger : function dragger(c) {

           c.drag($.proxy(onMove, this), onStart, onEnd);
           c.attr('cursor', 'move');

           var startX, startY;

           function onMove (dx, dy) {
               var x = startX + dx;
               var y = startY + dy;

               c.attr({

                   x : x,
                   y : y

               });

               this.model.setCoods(x, y);

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

    });
});

