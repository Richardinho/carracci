Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {

    var startX, startY;

    // Creates canvas 320 × 200 at 10, 50
    Glenmorangie.umlProject.canvas = Raphael(10, 50, 320, 200);

    // Creates circle at x = 50, y = 40, with radius 10
    var circle = Glenmorangie.umlProject.canvas.circle(50, 40, 10);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");

    // Sets the stroke attribute of the circle to white
    circle.attr("stroke", "#fff");

    function onmove(dx, dy) {
		newX = startX + dx;
		newY = startY + dy;
		this.attr({cx: newX, cy: newY});
    }

    function onstart() {
		startX = this.attr("cx");
		startY = this.attr("cy");
    }

    function onend() {
        startX = null;
        startY = null;
    }

    circle.drag(onmove, onstart, onend);




});

