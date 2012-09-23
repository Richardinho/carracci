function createPane(x, y, width, height) {

    var xCood = x,
        yCood = y,
        width = width,
        height = height,
        element,
        startX,
        startY,
        listeners = [];

    function onmove(dx, dy) {
        xCood = startX + dx;
        yCood = startY + dy;

        for (var i = 0; i < listeners.length; i++) {
            listeners[i].action.call(listeners[i].listener, xCood, yCood);
        }
        render();
    }

    function onstart() {
        startX = parseInt(element.attr("x"));
        startY = parseInt(element.attr("y"));
    }

    function onend() {
        startX = null;
        startY = null;
    }

    function render() {
        element.attr({ x : xCood });
        element.attr({ y : yCood });
    }

    return {

        initialize : function (canvas) {
            element = Glenmorangie.svgUtils.createRectangle(canvas, x, y, width, height);

            element.drag(onmove, onstart, onend);
            return this;
        },

        addListener : function (obj, method) {
            listeners.push({ "listener" : obj, "action" : method });

        },

        resize : function (width, height) {
            element.attr({ "height": height });
            element.attr({ "width" : width });
        }
    }

}