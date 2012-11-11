function createNodeSocket(node) {

    var node = node,
        nodeYOffset = 90,
        location = "left",
        pane;


    return {

        initialize : function (pan) {
            pane = pan;
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