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
        direction = "right",
        restrainX = false,
        upperYLimit = 3000,
        lowerYLimit = 0;


    //  handler for when draggable element is dragged
    function draggableNodeOnMove(dx, dy) {
        if (restrainX) {
            dx = 0;
        }

        if((startY + dy) > lowerYLimit && (startY + dy) < upperYLimit) {
            setCoordinates(startX + dx, startY + dy);
            updateDirection(xCood);
        }

        updateAssociatedNodesAndRender();
    }

    function setCoordinates (x, y) {
        xCood = x;
        yCood = y;
    }

    function updateAssociatedNodesAndRender() {

        horizontalNode.updateYCood(yCood);

        for (var i = 0; i < verticalNodes.length; i++) {
            verticalNodes[i].updateXCood(xCood);
        }
        connector.renderAll();
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

    function updateDraggableElement() {
        draggableElement.attr({cx : xCood});
        draggableElement.attr({cy : yCood});
        draggableElement.toFront();
    }

    //  set node to be movable
    draggableElement.drag(draggableNodeOnMove, onstart, onend);

    return {

        initialize : function () {
            if(arrowHead) {
                arrow = createArrow(xCood, yCood, canvas, this);
                var self = this;
                draggableElement.click(function () {
                var currentKey = Glenmorangie.module.currentKey;
                    if (currentKey!= null && currentKey === 113) { //  'q'
                        arrow.changeArrowHead();
                        render();
                    }

                    if (currentKey != null && currentKey === 114) { // 'r'
                        Glenmorangie.module.askingToAttachNode = self;
                    }
                });
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

        //  update y cood from outside
        updateYCood : function (y) {
            yCood = y;
        },

        //  update x cood from outside
        updateXCood : function (x) {
            xCood = x;
            updateDirection(xCood);
        },

        setNodePosition : function (x, y) {
            setCoordinates(x, y);
            updateAssociatedNodesAndRender()
        },

        render : function () {
            render();
        },

        // set limits
        restrictX : function () {
            restrainX = true;
        },

        setUpperYLimit : function (y) {
            this.setUpperYLimit2(y);
            horizontalNode.setUpperYLimit2(y);
        },

        setUpperYLimit2 : function (y) {
            upperYLimit = y;
        },

        setLowerYLimit : function (y) {
            this.setLowerYLimit2(y);
            horizontalNode.setLowerYLimit2(y);
        },

        setLowerYLimit2 : function (y) {
            lowerYLimit = y;
        },

        //  get coods
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

