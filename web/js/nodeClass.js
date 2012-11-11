var canvas;


function Node(canvas, connector, x, y, id) {
    if(canvas) {
        this.id = id;
        this.xCood = x;
        this.yCood = y;
        this.draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y);
        this.movementManager = createMovementManager(x, y, this);
        this.listeners = [];
        this.connector = connector;
        var self = this;
        this.draggableElement.click(function () {
            var currentKey = Glenmorangie.module.currentKey;
            if (currentKey != null && currentKey === 115) { // 's'
                //  change line type
                self.connector.updateLineMode();
            }
        });
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

Node.prototype.setCoods = function (x, y) {

    this.xCood = x;
    this.yCood = y;
}

Node.prototype.getX = function () {
    return this.xCood;
}

Node.prototype.foo = function (x,y) {

this.setCoods(x, y)

this.connector.renderAll();
}

Node.prototype.getY = function () {
    return this.yCood;
}

Node.prototype.updateCoordinates = function (x, y) {
    this.movementManager.updateCoordinates(x, y);
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

        var x = checkXRestrictions(proposedX) ? proposedX : node.xCood;
        var y = checkYRestrictions(proposedY) ? proposedY : node.yCood;

        updateCoordinates(x,y);

    }

    function updateCoordinates(x, y) {

        node.setCoods(x, y)
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

        updateCoordinates : function (x, y)  {
            updateCoordinates(x, y);
        },

        foo : function (x, y) {
            foobar(x, y);

        },

        render : function (x, y) {
            render(x, y);
        }

    }
}



