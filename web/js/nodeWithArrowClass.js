var canvas;


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

            node.addListener(this, "updateYOffset");
            proximalNode.setConstraintsManager({
                proposeXCood : function (x) {
                    return true;
                },

                proposeYCood : function (y) {
                    if(y < pane.getY() || y > (pane.getY() + pane.getHeight())) {
                        return false;
                    } else {
                        return true;
                    }
                }

            });

            node.setConstraintsManager({

                proposeXCood : function (x) {
                    return false;
                },

                proposeYCood : function (y) {
                    if(y < pane.getY() || y > (pane.getY() + pane.getHeight())) {
                        return false;
                    } else {
                        return true;
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
            node.updateCoordinates(x, yCood);
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
        }
    }
}









