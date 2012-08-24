Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {

    var canvas = Raphael(10, 50, 320, 200);

    var umlBox = createUmlClassBox(canvas);

    function wrapLine (ax1, ay1, ax2, ay2) {
        var x1 = ax1,
            y1 = ay1,
            x2 = ax2,
            y2 = ay2,
            startx1,
            starty1,
            startx2,
            starty2;


        return {

            node : Glenmorangie.svgUtils.createLine(canvas, x1, y1, x2, y2),

            start : function () {
                startx1 = x1;
                starty1 = y1;
                startx2 = x2;
                starty2 = y2;

            },
            //orientation, is basically just a piece of data which we store on the observed object
            // when we tell this object to listen to it.Another way of doing it would be to pass a listener function
            // to the observed object.
            move : function (dx, dy, orientation) {
                if ("left" === orientation) {
                    x1 = startx1 + dx;
                    y1 = starty1 + dy;
                    y2 = starty2 + dy;
                } else if ("right" === orientation) {
                    x2 = startx2 + dx;
                    y1 = starty1 + dy;
                    y2 = starty2 + dy;
                } else {
                    x1 = startx1 + dx;
                }
                this.reset();

            },

            end : function () {
                startx1 = null;
                starty1 = null;
                startx2 = null;
                starty2 = null;

            },

            reset : function () {
                Glenmorangie.svgUtils.resetLine(this.node, x1, y1, x2, y2);

            }

        };

    }

    var line = wrapLine(100,150,150,150);



    var node1 = Glenmorangie.svgUtils.createCircle(canvas,100, 150);
    var node2 = Glenmorangie.svgUtils.createCircle(canvas,150, 150);
    var node3 = Glenmorangie.svgUtils.createCircle(canvas,100, 200);

    node1 = wrapNode(node1);
    node2 = wrapNode(node2);
    node3 = wrapNode(node3);



    function wrapNode(n) {
        return {
            node : n,
            startX : null,
            startY : null
        }
    }


    var wrapNode1 = createMovableNode(node1);
    wrapNode1.addLongitudinalListener(node2);
    wrapNode1.addLateralListener(node3);
    wrapNode1.addCustomListener(line, "left");

    var wrapNode2 = createMovableNode(node2);
    wrapNode2.addLongitudinalListener(node1);
    wrapNode2.addCustomListener(line, "right");
    wrapNode2.attachTo(umlBox);


    var wrapNode3 = createMovableNode(node3);
    wrapNode3.addLateralListener(node1);
    wrapNode3.addCustomListener(line, "leftbelow");


    function createMovableNode(node) {
        var wrappedNode = node,
            lateralListeners = [],
            longitudinalListeners = [],
            customListeners = [];

        function onmove(dx, dy) {
            var i;
            move(wrappedNode, dx, dy);
            for (i = 0; i < lateralListeners.length; i++) {
                move(lateralListeners[i], dx, 0);
            }

            for (i = 0; i < longitudinalListeners.length; i++) {
                move(longitudinalListeners[i], 0, dy);
            }

            for (i = 0; i < customListeners.length; i++) {
                customListeners[i].node.move(dx, dy, customListeners[i].orientation);
            }
        }

        function onstart() {
            var i;
            start(wrappedNode);
            for (i = 0; i < lateralListeners.length; i++) {
                start(lateralListeners[i]);
            }

            for (i = 0; i < longitudinalListeners.length; i++) {
                start(longitudinalListeners[i]);
            }

            for (i = 0; i < customListeners.length; i++) {
                customListeners[i].node.start();
            }
        }

        function onend() {
            var i;

            end(wrappedNode);

            for (i = 0; i < lateralListeners.length; i++) {
                end(lateralListeners[i]);
            }

            for (i = 0; i < longitudinalListeners.length; i++) {
                end(longitudinalListeners[i]);
            }

            for (i = 0; i < customListeners.length; i++) {
                customListeners[i].node.end();
            }
        }

        function start(n) {
            n.startX = n.node.attr("cx");
            n.startY = n.node.attr("cy");
        }

        function move(n, dx, dy) {
            var newX = n.startX + dx;
            var newY = n.startY + dy;
            n.node.attr({cx: newX, cy: newY});
        }

        function end(n) {
            n.startX = null;
            n.startY = null;
        }

        wrappedNode.node.drag(onmove, onstart, onend);

        return {

            onMove : function(dx, dy) {
                onmove(dx, dy);
            },

            onStart : function () {
                onstart();
            },

            onEnd : function () {
                onend();
            },

            attachTo : function(umlBox) {
                wrappedNode.node.undrag();
                umlBox.attach(this);
            },

            addLongitudinalListener : function(listenerNode) {
                longitudinalListeners.push(listenerNode);
            },

            addLateralListener : function(listenerNode) {
                lateralListeners.push(listenerNode);
            },

            addCustomListener : function(listenerNode, orientation) {
                customListeners.push({"node" : listenerNode, "orientation" : orientation});
            }
        }

    }





});