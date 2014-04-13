define([
    "BaseType",
    'utility/svg',
    'jquery',
    'events/eventsBus'
    ],

        function (
            BaseType,
            paper,
            $,
            events
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.artifactType = "note";

            this.model = options.model;
            this.view = options.view;

            this.proxyEl = this._createProxyEl();

            this.proxyEl.dblclick($.proxy(function () {

                events.trigger("dblclick:note", this.model);

            }, this));

            this.model.on("delete", this.destroy, this);
        },

        _createProxyEl : function () {

            var rect = paper.rect(this.model.x, this.model.y, this.model.getWidth(), this.model.height);
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

       },

       getName : function () {

           return this.model.model.name;
       }








    });
});

