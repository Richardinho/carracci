var canvas;


function Node(canvas, connector, x, y, id) {
    if(canvas) {
        this.xCood = x;
        this.yCood = y;
        this.draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y);
        this.movementManager = createMovementManager(x, y, this);
        this.listeners = [];
        this.connector = connector;
    }
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
        listener.obj[listener.action]( this.xCood, this.yCood );
    }
}

Node.prototype.addListener = function (object, method) {
    this.listeners.push({ obj : object, action : method });
}

Node.prototype.horizontal = function (x, y) {
    this.setCoods(this.xCood, y);
}

Node.prototype.vertical = function (x, y) {
    this.setCoods(x, this.yCood);
}

Node.prototype.render = function () {
    this.movementManager.render(this.xCood, this.yCood);
}

Node.prototype.getX = function () {
    return this.xCood;
}

Node.prototype.getY = function () {
    return this.yCood;
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


function createMovementManager(x, y, node) {

    var node = node,
        startX,
        startY,
        constraintsManagers = [];

    function onstart() {
        startX = parseInt(node.draggableElement.attr("cx"));
        startY = parseInt(node.draggableElement.attr("cy"));
    }

    function onend() {
        startX = null;
        startY = null;
    }

    function onMove(dx, dy) {
        var proposedX = startX + dx,
            proposedY = startY + dy;

        node.xCood = checkXRestrictions(proposedX) ? proposedX : node.xCood;
        node.yCood = checkYRestrictions(proposedY) ? proposedY : node.yCood;
        node.notifyListeners();

        node.connector.renderAll();
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
        node.draggableElement.attr({cx : x});
        node.draggableElement.attr({cy : y});
        node.draggableElement.toFront();
    }

    node.draggableElement.drag(onMove, onstart, onend);

    return {
        setConstraintsManager : function (manager) {
            constraintsManagers.push(manager);
        },

        render : function (x, y) {

            render(x, y);
        }

    }
}



