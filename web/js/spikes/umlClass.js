$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);

    var rect = canvas.rect(10, 10, 100, 80);
    rect.attr({ fill : "#ffffce"});
    rect.attr({ "stroke-width" : "0.5"});

    var t = canvas.text(50, 50, "Raphaël\nkicks\nbutt!");
    $('#foo').css({"color": "green", "height" : 100, "width" : 100, backgroundColor : "red", position : "absolute" });

    var startX,
        startY;

    function onmove(dx, dy) {
        var newX = startX + dx;
        var newY = startY + dy;
        this.attr({x: newX, y: newY});
        $('#foo').css({left : newX, top : newY });
    }

    function onstart() {
        startX = this.attr("x");
        startY = this.attr("y");
    }

    function onend() {
        startX = null;
        startY = null;
    }

    rect.drag(onmove, onstart, onend);






});