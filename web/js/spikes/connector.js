

$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);


    var lines = [];

    function createLine(nodeA, nodeB) {
        var nodeA = nodeA,
            nodeB = nodeB;

        var line = Glenmorangie.svgUtils.createLine(canvas,
                                                    nodeA.getX(),
                                                    nodeA.getY(),
                                                    nodeB.getX(),
                                                    nodeB.getY())

        return {
            render : function() {
                Glenmorangie.svgUtils.resetLine(line,
                                                nodeA.getX(),
                                                nodeA.getY(),
                                                nodeB.getX(),
                                                nodeB.getY());
            }

        }
    }

    function createNode(x,y, _id) {
        var thisNode,
            horizontalNodes = [],
            verticalNodes = [],
            startX,
            startY,
            id = _id,
            xConstraints = [];

        thisNode = Glenmorangie.svgUtils.createCircle(canvas, x, y);


        function onmove(dx, dy) {
            var i;

            if (checkXConstraints(dx)) {
                moveX(dx);
            }

            moveY(dy);

            for (i=0; i < lines.length; i++) {
                lines[i].render();
            }
        }

        function checkXConstraints(dx) {
            for (i = 0; i < verticalNodes.length; i++) {
                if (!verticalNodes[i].checkXConstraint(dx)) {
                    return false;
                }
            }
            return true;
        }

        function moveX(dx) {
            var i;
            moveThisX(dx);
            for (i = 0; i < verticalNodes.length; i++) {
                if (verticalNodes[i].getId() != id) {
                    verticalNodes[i].moveX(dx);
                }
            }
        }

        function moveY(dy) {
            var i;
            moveThisY(dy);
            for (i = 0; i < horizontalNodes.length; i++) {
                if (horizontalNodes[i].getId() != id) {
                    horizontalNodes[i].moveY(dy);
                }
            }
        }

        function moveThisX(dx) {
            var newX = startX + dx;
            thisNode.attr({cx: newX});

        }

        function moveThisY(dy) {
            var newY = startY + dy;
            thisNode.attr({cy : newY});
        }

        function onstart() {
            var i;
            startThis();
            for (i = 0; i < horizontalNodes.length; i++) {
                if (horizontalNodes[i].getId() != id) {
                    horizontalNodes[i].start();
                }
            }

            for (i = 0; i < verticalNodes.length; i++) {
                if (verticalNodes[i].getId() != id) {
                    verticalNodes[i].start();
                }
            }
        }

        function startThis() {
            startX = thisNode.attr("cx");
            startY = thisNode.attr("cy");
        }

        function onend() {
            var i;
            endThis();
            for (i = 0; i < horizontalNodes.length; i++) {
                if (horizontalNodes[i].getId() != id) {
                    horizontalNodes[i].end();
                }
            }

            for (i = 0; i < verticalNodes.length; i++) {
                if (verticalNodes[i].getId() != id) {
                    verticalNodes[i].end();
                }
            }
        }

        function endThis() {
            startX = null;
            startY = null;

        }

        thisNode.drag(onmove, onstart, onend);

        return {

            linkNode : function (node, orientation) {

                if("horizontal" === orientation) {
                    if (horizontalNodes.length < 1) {
                        horizontalNodes.push(this);
                    }
                    horizontalNodes.push(node)
                    node.setHorizontalNodes(horizontalNodes);

                } else if("vertical" === orientation) {
                    if (verticalNodes.length < 1) {
                        verticalNodes.push(this);
                    }
                    verticalNodes.push(node)
                    node.setVerticalNodes(verticalNodes);
                }

                lines.push(createLine(this, node));
            },

            moveX : function(dx) {
                moveThisX(dx);
            },

            getId : function () {

              return id;
            },

            moveY : function (dy) {
                moveThisY(dy);
            },

            start : function () {
                startThis();
            },

            end : function () {
                endThis();
            },

            getHorizontalNodes : function () {
                return horizontalNodes;
            },

            setHorizontalNodes : function (horizNodes) {
                horizontalNodes = horizNodes;
            },

            getVerticalNodes : function () {
                return verticalNodes;
            },

            setVerticalNodes : function (vertNodes) {
                verticalNodes = vertNodes;
            },

            checkXConstraint : function (dx) {
                var i,
                    newX = startX + dx;

                for (i=0; i < xConstraints.length; i++) {

                    if (!xConstraints[i](newX)) {
                        return false;
                    }
                }
                return true;
            },

            addMaxXConstraint : function (maxX) {
                xConstraints.push(function(newX) {
                    if (newX > maxX) {
                        return false;
                    } else {
                        return true;
                    }
                });
            },

            getX : function () {
                return thisNode.attr("cx");
            },

            getY : function () {
                return thisNode.attr("cy");
            }
        }
    }

    var node1 = createNode(20,100,1);
    var node2 = createNode(50,100,2);
    var node3 = createNode(80,100,3);
    var node4 = createNode(20,160,4);
    var node5 = createNode(50,160,5);
        node5.addMaxXConstraint(200);

    node1.linkNode(node2, "horizontal");
    node2.linkNode(node3, "horizontal");

    node4.linkNode(node1, "vertical");
    node4.linkNode(node5, "horizontal");
    node5.linkNode(node2, "vertical");






});