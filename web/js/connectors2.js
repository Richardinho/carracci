
$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);

    function Connector(baseX, baseY) {

        var nodes = [];
        var lines = [];
        var lineMode = "normal";

        var node1 = createNode(20,100,false).initialize();
        var node2 = createNode(50,100,true).initialize();
        var node3 = createNode(20,200,false).initialize();
        var node4 = createNode(50,200,true).initialize();

        nodes.push(node1);
        nodes.push(node2);
        nodes.push(node3);
        nodes.push(node4);

        linkNodesHorizontally(node1, node2);
        linkNodesVertically(node1, node3);
        linkNodesHorizontally(node3, node4);

        renderAll();

        function updateLineMode(mode) {

            lineMode = mode;

            if(mode === "normal") {
                setLinesToNormal();

            } else {
                setLinesToDashes();
            }
            renderAll();
        }

        function linkNodesHorizontally(nodeA, nodeB) {
            lines.push(createLine(nodeA, nodeB, canvas));
            nodeA.linkNode(nodeB, "horizontal");
            nodeB.linkNode(nodeA, "horizontal");

        }

        function linkNodesVertically(nodeA, nodeB) {
            lines.push(createLine(nodeA, nodeB, canvas));
            nodeA.linkNode(nodeB, "vertical");
            nodeB.linkNode(nodeA, "vertical");

        }

        function setLinesToDashes () {
            var i = 0,
                linesLength = lines.length;
            for ( i = 0; i < linesLength; i++ ) {
                lines[i].dashes();
            }
        }

        function setLinesToNormal () {
            var i = 0,
                linesLength = lines.length;
            for ( i = 0; i < linesLength; i++ ) {
                lines[i].normal();
            }
        }


        function renderAll() {
            var i = 0,
                nodesLength = nodes.length,
                linesLength = lines.length;
            for ( i = 0; i < nodesLength; i++ ) {
                nodes[i].render();
            }

            for ( i = 0; i < linesLength; i++ ) {
                lines[i].render();
            }
        }

        function createNode(x, y, arrowHead) {
            var startX = x,
                startY = y,
                xCood = x,
                yCood = y,
                draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y),
                horizontalNodes = [],
                verticalNodes = [],
                arrow;


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
                for (var i = 0; i < horizontalNodes.length; i++) {
                    horizontalNodes[i].updateYCood(yCood);
                }

                for (var i = 0; i < verticalNodes.length; i++) {
                    verticalNodes[i].updateXCood(xCood);
                }
                renderAll();
            }

            function updateCoods(dx, dy) {
                xCood = startX + dx;
                yCood = startY + dy;
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
                    updateLineMode("inheritance");
                },

                setNormalLineMode : function () {
                    updateLineMode("normal");
                },

                orientation : "east", // e.g pointing right.

                updateYCood : function (y) {
                    yCood = y;
                },

                updateXCood : function (x) {
                    xCood = x;
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
                        horizontalNodes.push(node)
                    } else if("vertical" === geoRelationship) {
                        verticalNodes.push(node)
                    }
                }
            }
        }

        return {

            // this should draw the elements.
            render : function () {
                //renderLines();
                //renderNodes();
            }

        }




    }

    Connector(100, 100);





});
