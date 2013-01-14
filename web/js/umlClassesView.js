
Glenmorangie.UmlViewFactory = (function () {
    // dependency
    var canvas;

    function createHtmlView(mod, element) {
        var model = mod;
            el = element,
            template = _.template($('#uml-class-template').html()),

        render();

        function render() {
            $(el).html(template({ "class" : model.get("class") }));
        }

        return {

            update : function () {
                render();
            },

            getWidth : function () {
                return $($(el).find(".umlClass")[0]).css("width"); // must be able to do this cleaner!
            },

            getHeight : function () {
                return $($(el).find(".umlClass")[0]).css("height"); // must be able to do this cleaner!
            }

        }
    }

    function createSVGView(configObj) {

        var model = configObj.model,
            htmlView = createHtmlView(model, configObj.el),
            rectangle = null,
            attachedNodes = [],
            xCood,
            yCood,
            startX,
            startY,
            interface; // public object which other objects will interact with

        model.on("change:class", modelChange);

        rectangle = Glenmorangie.svgUtils.createRectangle(canvas, 100, 200, htmlView.getWidth(), htmlView.getHeight());
        rectangle.drag(onmove, onstart, onend);

        interface =  {

            getX : function () {
                return xCood;
            },

            getY : function () {
                return yCood;
            },

            getWidth : function () {
                return parseInt(htmlView.getWidth());
            },

            getY2Cood : function () {
                return (this.getY() + this.getHeight());
            },

            getX2Cood : function () {
                return this.getX() + this.getWidth();
            },

            getHeight : function () {
                return parseInt(htmlView.getHeight());
            }
        }

        rectangle.click(function () {

            var nodeToRectangleLink;

            if (Glenmorangie.module.askingToAttachNode) {

                nodeToRectangleLink = Glenmorangie.module.askingToAttachNode.getLink();
                nodeToRectangleLink.activate(interface);
                attachedNodes.push(nodeToRectangleLink);
            }
        });

        function modelChange() {
            htmlView.update();
            render();
        }

        function onstart () {
            startX = parseInt(rectangle.attr("x"));
            startY = parseInt(rectangle.attr("y"));
        }

        function onmove (dx, dy) {

            xCood = startX + dx;
            yCood = startY + dy;

    //                for (var i = 0; i < listeners.length; i++) {
    //                listeners[i].action.call(listeners[i].listener, xCood, yCood);
    //                }
            for (var i = 0; i < attachedNodes.length; i++) {
                attachedNodes[i].updateNode(xCood, yCood);
            }
            render();
        }

        function onend () {
            startX = null;
            startY = null;
        }

        function render () {
            rectangle.attr({ x : xCood });
            rectangle.attr({ y : yCood });
            rectangle.attr({ "width" : htmlView.getWidth() });
        }

        return interface;
    }

    return {
        initialize : function (can) {
            canvas = can;
            return this;
        },

        createView : function (configObj) {
            return createSVGView(configObj);
        }
    }

})();




