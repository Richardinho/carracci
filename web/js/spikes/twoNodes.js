Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {

    Glenmorangie.umlProject.canvas = Raphael(10, 50, 320, 200);

    function createNode(x, y) {
        var circle = Glenmorangie.umlProject.canvas.circle(x, y, 10);
        circle.attr("fill", "#f00");
        circle.attr("stroke", "#fff");
        return circle;

    }


    var node1 = createNode(100, 150);
    var node2 = createNode(150, 150);

    makeNodeMovable(node1, node2);
    makeNodeMovable(node2, node1);

    function makeNodeMovable(node, listenerNode) {
        var startX,
            startY,
            listenerStartY;

        function onmove(dx, dy) {
            var newX = startX + dx;
            var newY = startY + dy;
            this.attr({cx: newX, cy: newY});

            var newListenerY = listenerStartY + dy;
            listenerNode.attr({cy: newListenerY});
        }

        function onstart() {
            startX = this.attr("cx");
            startY = this.attr("cy");

            listenerStartY = listenerNode.attr("cy");
        }

        function onend() {
            startX = null;
            startY = null;
        }

        node.drag(onmove, onstart, onend);

    }












});