


function createUmlClassBox(canvas) {


    var wrappedNode = wrapNode(Glenmorangie.svgUtils.createRectangle(canvas, 150, 100, 160, 70)),
        attachedNodes = [];

    function onmove(dx, dy) {
        var i;
        move(wrappedNode, dx, dy);
        // move attached nodes too
        for (i = 0; i < attachedNodes.length; i++) {
            attachedNodes[i].onMove(dx, dy);
        }
     }

    function onstart() {
        var i;
        start(wrappedNode);
        for (i = 0; i < attachedNodes.length; i++) {
            attachedNodes[i].onStart();
        }
    }

    function onend() {
        var i;
        end(wrappedNode);
        for (i = 0; i < attachedNodes.length; i++) {
            attachedNodes[i].onEnd();
        }
    }

    function start(n) {
        n.startX = n.node.attr("x");
        n.startY = n.node.attr("y");
    }

    function move(n, dx, dy) {
        var newX = n.startX + dx;
        var newY = n.startY + dy;
        n.node.attr({x: newX, y: newY});
    }

    function end(n) {
        n.startX = null;
        n.startY = null;
    }

    function wrapNode(n) {
        return {
            node : n,
            startX : null,
            startY : null
        }
    }

    wrappedNode.node.drag(onmove, onstart, onend);

    return {

        attach : function (node) {
            attachedNodes.push(node);
        }
    }
}

