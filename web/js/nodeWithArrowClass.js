var canvas;


// work in progress- not yet 'live'!
Glenmorangie.nodeFactory = (function () {
    var canvas;





    return {
        // pass dependencies in on initialization
        initialize : function (c) {
            canvas = c;
        },

        createNode : function () {

        },

        createNodeWithArrow : function () {
            return {

                render : function () {},

                setArrowDirection : function () {}

            }

        }
    }
})();

function NodeWithArrowClass (canvas, connector, x, y, id, node, distalNode) {

    Node.call(this,canvas, connector, x, y, id);

    this.arrow = createArrow(this.xCood, this.yCood, canvas, this);
    this.partnerNode = node;
    this.paneToNodeSocket = createPaneToNodeSocket(this, node, distalNode);
    var self = this;

    this.draggableElement.click(function () {

        var currentKey = Glenmorangie.module.currentKey;

        if (currentKey != null && currentKey === 113) { //  'q'
            self.arrow.changeArrowHead();
            self.connector.renderAll();
        }

        if (currentKey != null && currentKey === 114) { // 'r'
            Glenmorangie.module.askingToAttachNode = self;
        }

    });


}

NodeWithArrowClass.prototype = new Node();

NodeWithArrowClass.prototype.render = function () {
    this.setArrowDirection(this.partnerNode.getX());
    this.arrow.updateArrowHead(this.xCood, this.yCood);
    Node.prototype.render.call(this);
}

NodeWithArrowClass.prototype.getSocket = function() {
    return this.paneToNodeSocket;
}

NodeWithArrowClass.prototype.setArrowDirection = function (x, y) {

    if ( this.xCood > x) {
        this.arrow.setArrowDirection("right");
    } else {
        this.arrow.setArrowDirection("left");
    }

}

function createPaneToNodeSocket(node, proximalNode, distalNode) {

    var nodeYOffset = 90,
        location = "left",
        pane = null;




    return {

        activate : function (pan) {
            pane = pan;

            proximalNode.addListener(this, "updateLocation");
            distalNode.addListener(this, "updateLocation");
            node.addListener(this, "updateYOffset");
            proximalNode.setConstraintsManager({
                proposeXCood : function (x) {
                    return true;
                },

                proposeYCood : function (y) {
                    if(y > pane.getY() && y < pane.getY2Cood()) {
                        return true;
                    } else {
                        return false;
                    }
                }

            });

            node.setConstraintsManager({

                proposeXCood : function (x) {
                    return false;
                },

                proposeYCood : function (y) {

                    if(y > pane.getY() && y < pane.getY2Cood()) {
                        return true;
                    } else {
                        return false;
                    }
                }

            });
            var coods = this.calculateInitialLocationOfNode();
            node.updateCoordinates(coods.x, coods.y);
            return this;
        },

        updateYOffset : function (x, y) {
            if (pane !== null) {
                nodeYOffset = y - pane.getY();
            }
        },

        setPane : function (p) {
            pane = p;
        },

        isAttachedToPane : function () {
            return (pane === null);
        },

        updateNode : function (x, y) {
            var yCood = y + nodeYOffset;
            var xCood = location === "left" ? x : x + pane.getWidth();
            node.updateCoordinates(xCood, yCood);
        },

        foo : function (x, y) {
            var yCood = y + nodeYOffset;
            var xCood = location === "left" ? x : x + pane.getWidth();

        },

        calculateInitialLocationOfNode : function () {

        //  naive implementation, needs to be a lot more sophisticated.
            var newNodeX,
                newNodeY;

            newNodeX = pane.getX();
            newNodeY = pane.getY() + nodeYOffset;

            return { x : newNodeX, y : newNodeY };
        },

        setLocation : function (loc) {
            location = loc;
        },

        //  this probably needs to be a bit more sophisticated too.
        updateLocation : function (x, y) {
            if (x > (pane.getX() + pane.getWidth())) {
                location = "right";
            } else {
                location = "left";
            }
            this.foo(pane.getX(), pane.getY());
        }
    }
}









