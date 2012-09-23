
$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);

    function Connector(baseX, baseY) {

        var nodes = [];
        var lines = [];

        var node1 = createNode(20,100);
        var node2 = createNode(50,100);

        nodes.push(node1);
        nodes.push(node2);

        node1.linkNode(node2, "horizontal");
        node2.linkNode(node1, "horizontal");


        function renderAll() {
            var i = 0,
                nodesLength = nodes.length;
            for ( i = 0; i < nodesLength; i++ ) {
                nodes[i].render();
            }
        }

        function createNode(x, y) {
            var startX = x,
                startY = y,
                xCood = x,
                yCood = y,
                draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y),
                horizontalNodes = [],
                verticalNodes = [];

            var arrow = createArrow(xCood, yCood, canvas);

            draggableElement.click(function () {
/*                if (currentKey && currentKey === 113) { //  'q'
                    arrow.changeArrowHead();
                    render();
                }*/
            });

            draggableElement.toFront();


            function onmove(dx, dy) {
                updateCoods(dx, dy);
                for (var i = 0; i < horizontalNodes.length; i++) {
                    horizontalNodes[i].updateYCood(yCood);
                }

                for (var i = 0; i < verticalNodes.length; i++) {
                    verticalNodes[i].updateCoods(dx, 0);
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

                arrow.updateArrowHead(xCood, yCood);

                updateDraggableElement();
            }

            draggableElement.drag(onmove, onstart, onend);

            function updateDraggableElement() {
                draggableElement.attr({cx : xCood});
                draggableElement.attr({cy : yCood});
                draggableElement.toFront();
            }

            return {

                orientation : "east", // e.g pointing right.

                updateYCood : function (y) {
                    yCood = y;
                },

                render : function () {
                    render();
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
