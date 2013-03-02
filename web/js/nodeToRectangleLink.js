Glenmorangie.nodeToRectangleLinkFactory = (function () {

  function createPaneToNodeLink(node, proximalNode, distalNode) {

        var nodeYOffset = 90,
            location = "left",
            pane = null;

        return {

            activate : function (pan) {
                pane = pan;

                proximalNode.addListener(this, "updateYOffset");
                proximalNode.addListener(this, "updateFromProximalNode");
                distalNode.addListener(this, "updateFromDistalNode");
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

            /*
            *  this is called from the umlclass view to update the node
            */
            updateNode : function (x, y) {
                var yCood = y + nodeYOffset;
                var xCood = location === "left" ? x : x + pane.getWidth();
                node.updateCoordinates(xCood, yCood);
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

            updateFromDistalNode : function(x, y) {
                if (x > (pane.getX() + pane.getWidth())) {
                    location = "right";
                } else {
                    location = "left";
                }

                var xCood = location === "left" ? pane.getX() : pane.getX() + pane.getWidth();

                node.upDateX(xCood);
            },

            /*
            * when we move the proximal node, the attached (arrow) node is updated accordingly.
            */
            updateFromProximalNode : function (x, y) {
                if (x > (pane.getX() + pane.getWidth())) {
                    location = "right";
                } else {
                    location = "left";
                }

                var xCood = location === "left" ? pane.getX() : pane.getX() + pane.getWidth();

                node.upDateX(xCood);
                node.upDateY(y);
            }
        }
    }

    return {
        createPaneToNodeLink : function (node, proximalNode, distalNode) {
            return createPaneToNodeLink(node, proximalNode, distalNode);
        }
    }

})();


