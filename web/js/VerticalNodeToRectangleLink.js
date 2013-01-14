Glenmorangie.VerticalNodeToRectangleLinkFactory = (function () {

  function createPaneToNodeLink(node, proximalNode, distalNode) {

        var nodeXOffset = 40,
            location = "up",
            pane = null;

        return {

            activate : function (pan) {
                pane = pan;

                proximalNode.addListener(this, "updateXOffset");
                proximalNode.addListener(this, "updateFromProximalNode");
                distalNode.addListener(this, "updateFromDistalNode");
                node.addListener(this, "updateXOffset");

                proximalNode.setConstraintsManager({

                    proposeXCood : function (x) {
                        if(x > pane.getX() && x < pane.getX2Cood()) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    proposeYCood : function (y) {
                        return true;
                    }
                });

                node.setConstraintsManager({

                    proposeXCood : function (x) {
                        if(x > pane.getX() && x < pane.getX2Cood()) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    proposeYCood : function (y) {
                        return false;
                    }
                });
                var coods = this.calculateInitialLocationOfNode();
                node.updateCoordinates(coods.x, coods.y);
                return this;
            },

            updateXOffset : function (x, y) {
                if (pane !== null) {
                    nodeXOffset = x - pane.getX();
                }
            },

            setPane : function (p) {
                pane = p;
            },

            /*
            *  this is called from the umlclass view to update the node
            */
            updateNode : function (x, y) {
                var xCood = x + nodeXOffset;
                var yCood = location === "up" ? y : y + pane.getHeight();
                node.updateCoordinates(xCood, yCood);
            },

            calculateInitialLocationOfNode : function () {

            //  naive implementation, needs to be a lot more sophisticated.
                var newNodeX,
                    newNodeY;

                newNodeX = pane.getX() +nodeXOffset;
                newNodeY = pane.getY();

                return { x : newNodeX, y : newNodeY };
            },

            setLocation : function (loc) {
                location = loc;
            },

            updateFromDistalNode : function(x, y) {
                if (y > (pane.getY() + pane.getHeight())) {
                    location = "down";
                } else {
                    location = "up";
                }

                var yCood = location === "up" ? pane.getY() : pane.getY() + pane.getHeight();

                node.upDateY(yCood);
            },

            /*
            * when we move the proximal node, the attached (arrow) node is updated accordingly.
            */
            updateFromProximalNode : function (x, y) {
                if (y > (pane.getY() + pane.getHeight())) {
                    location = "down";
                } else {
                    location = "up";
                }

                var yCood = location === "up" ? pane.getY() : pane.getY() + pane.getHeight();

                node.upDateY(yCood);
                node.upDateX(x);
            }
        }
    }

    return {
        createPaneToNodeLink : function (node, proximalNode, distalNode) {
            return createPaneToNodeLink(node, proximalNode, distalNode);
        }
    }

})();


