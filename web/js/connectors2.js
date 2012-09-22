
$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);

    var currentKey;

    $(window).keypress(function (event) {
      currentKey = event.which
    });

    $(window).keyup(function (event) {
      currentKey = null;
    });

    function Connector(baseX, baseY) {

        var nodes = [];
        var lines = [];




        // api

        //  create nodes

        nodes.push(createNode(20,100));
        nodes.push(createNode(50,100));

        //  link nodes
        //  node1.linkNode(node2, "horizontal");
        //  node2.linkNode(node1, "horizontal");

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
                draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y);



            var arrow = createArrow();

                draggableElement.click(function () {
                    if (currentKey === 113) { //  'q'
                        arrow.changeArrowHead();
                        render();
                    }
                });

            draggableElement.toFront();


            function onmove(dx, dy) {
                xCood = startX + dx;
                yCood = startY + dy;

                renderAll();
            }

            function rotatePointer() {
                return "blackDiamond";
            }

            function onstart() {

                startX = draggableElement.attr("cx");
                startY = draggableElement.attr("cy");
            }

            function onend() {
                startX = null;
                startY = null;
            }

            function render() {
                updateDraggableElement();
                arrow.updateArrowHead(xCood, yCood);
                draggableElement.toFront();
            }


            draggableElement.drag(onmove, onstart, onend);

            function createArrow() {

                var arrowHead = Glenmorangie.svgUtils.createDiamond(canvas, xCood, yCood, "white");
                var index = 0;
                var arrowHeads = ["whiteDiamond", "blackDiamond"];

                var createArrows = {

                    arrow : function () {

                    },

                    whiteDiamond : function (x, y) {
                        return Glenmorangie.svgUtils.createDiamond(canvas, x, y, "white");
                    },

                    blackDiamond : function (x, y) {
                        return  Glenmorangie.svgUtils.createDiamond(canvas, x, y, "black");
                    },

                    inheritance : function () {

                    },

                    implementation : function () {

                    }
                };

                return {

                    updateArrowHead : function (x, y) {
                        console.log("arrowHead 1:" + arrowHead);
                        console.log("index: ", index)
                        arrowHead.remove();
                        arrowHead = createArrows[arrowHeads[index]](x, y);
                        console.log("arrowHead 2:" + arrowHead);

                    },

                    changeArrowHead : function () {
                        index++;
                        index = (index === arrowHeads.length) ? 0 : index;
                    }
                };
            }



            function updateDraggableElement() {
                draggableElement.attr({cx : xCood});
                draggableElement.attr({cy : yCood});
            }

            return {


                orientation : "east", // e.g pointing right.

                render : function () {
                    render();
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
