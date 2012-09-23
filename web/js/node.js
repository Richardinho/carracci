function createNode(canvas, connector, x, y, arrowHead, id) {
    var startX = x,
        startY = y,
        xCood = x,
        yCood = y,
        id = id,
        draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y),
        horizontalNode,
        verticalNodes = [],
        arrow,
        direction = "right";


    if (arrowHead) {
        draggableElement.click(function () {
            if (currentKey && currentKey === 113) { //  'q'
                arrow.changeArrowHead();
                render();
            }
        });
    }

    function onmove(dx, dy) {
        updateCoods(dx, dy);

        horizontalNode.updateYCood(yCood);

        for (var i = 0; i < verticalNodes.length; i++) {
            verticalNodes[i].updateXCood(xCood);
        }
        connector.renderAll();
    }

    function updateCoods(dx, dy) {
        xCood = startX + dx;
        yCood = startY + dy;
        updateDirection(xCood);
    }


    function updateDirection(x) {

        if (x >= horizontalNode.getX()) {
            direction = "right";
            horizontalNode.setDirection("left");
        } else {
            direction = "left";
            horizontalNode.setDirection("right");
        }
    }

    function rotatePointer() {
        return "blackDiamond";
    }

    function onstart() {
        startX = parseInt(draggableElement.attr("cx"));
        startY = parseInt(draggableElement.attr("cy"));
    }

    function onend() {
        startX = null;
        startY = null;
    }

    function render() {
        if (arrowHead) {
            arrow.updateArrowHead(xCood, yCood);
        }
        updateDraggableElement();
    }

    draggableElement.drag(onmove, onstart, onend);

    function updateDraggableElement() {
        draggableElement.attr({cx : xCood});
        draggableElement.attr({cy : yCood});
        draggableElement.toFront();
    }

    return {

        initialize : function () {
            if(arrowHead) {
                arrow = createArrow(xCood, yCood, canvas, this);
            }
            draggableElement.toFront();
            return this;
        },

        setImplementsLineMode : function () {
            connector.updateLineMode("inheritance");
        },

        setNormalLineMode : function () {
            connector.updateLineMode("normal");
        },

        direction : function () {

            return direction;
        },

        setDirection : function (dir) {
            direction = dir;
        },

        updateYCood : function (y) {
            yCood = y;
        },

        updateXCood : function (x) {
            xCood = x;
            updateDirection(xCood);
        },

        render : function () {
            render();
        },

        getX : function () {
            return xCood;
        },

        getY : function () {
            return yCood;
        },

        linkNode : function (node, geoRelationship) {

            if("horizontal" === geoRelationship) {
                horizontalNode = node;
            } else if("vertical" === geoRelationship) {
                verticalNodes.push(node)
            }
        }
    }
}

