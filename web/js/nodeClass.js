var canvas;



function Node(x, y) {

    this.xCood = x;
    this.yCood = y;
    this.movementManager = createMovementManager(x, y, this);
    this.listeners = [];

}

Node.prototype.setConstraintsManager = function(man) {
    this.movementManager.setConstraintsManager(man);
}

Node.prototype.setCoods = function (x, y) {
    this.xCood = x;
    this.yCood = y;
}

Node.prototype.notifyListeners = function () {
    for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        listener.action(this.xCood, yCood);
    }
}

Node.prototype.addListener = function (object) {
    this.listeners.push(object);
}

Node.prototype.action = function (x, y) {
    this.setCoods(this.xCood, y);
}

Node.prototype.render = function () {

    this.movementManager.render(this.xCood, this.yCood);
}

var constraintsManager = {


    proposeXCood : function (x) {
        var xMaxLimit = 200;
        return (x < xMaxLimit);

    },

    proposeYCood : function (y) {
        var yMinLimit = 45;
        return y > yMinLimit;
    }
}

var renderAll;
$(document).ready(function () {



    canvas = Raphael(0, 0, 800, 820);
    var node1 =  new Node(100, 100);
    var node2 = new Node(200, 100);
    node1.setConstraintsManager(constraintsManager);
    node1.addListener(node2);

    renderAll = function() {
        node1.render();
        node2.render();
    }




});





function createMovementManager(x, y, node) {

    var draggableElement,
        startX,
        startY,
        constraintsManagers = [];

    function onstart() {
        startX = parseInt(draggableElement.attr("cx"));
        startY = parseInt(draggableElement.attr("cy"));
    }

    function onend() {
        startX = null;
        startY = null;
    }

    function onMove(dx, dy) {
        var proposedX = startX + dx,
            proposedY = startY + dy;

        xCood = checkXRestrictions(proposedX) ? proposedX : xCood;
        yCood = checkYRestrictions(proposedY) ? proposedY : yCood;
        node.setCoods(xCood, yCood);
        node.notifyListeners();

        renderAll();
    }

    function checkXRestrictions(x) {
        for (var i = 0; i < constraintsManagers.length; i++) {
            return constraintsManagers[i].proposeXCood(x);
        }
        return true;
    }

    function checkYRestrictions(y) {
        for (var i = 0; i < constraintsManagers.length; i++) {
            return constraintsManagers[i].proposeYCood(y);
        }
        return true;
    }

    function render (x, y) {
        draggableElement.attr({cx : x});
        draggableElement.attr({cy : y});
        draggableElement.toFront();
    }

    draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y);
    draggableElement.drag(onMove, onstart, onend);

    return {
        setConstraintsManager : function (manager) {
            constraintsManagers.push(manager);
        },

        render : function (x, y) {

            render(x, y);
        }

    }
}



