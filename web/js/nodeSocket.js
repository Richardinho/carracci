function createNodeSocket(transparentPane, node) {
    console.log("createnode socket") ;
    var node = node,
        pane = transparentPane,
        nodeYOffset = 90,
        lastKnownNodeYPosition = node.getY(),
        location = "left",
        horizontalNode = node.getHorizontalNode();

    node.restrictX();


    return {

        initialize : function () {
            horizontalNode.setCurrentlyAttachedPane(pane, this);
            node.setCurrentlyAttachedPane(pane, this);
            return this;

        },

        updateNode : function (x, y) {

            if(this._changeInNodeYPosition()) {
                nodeYOffset = nodeYOffset - this._changeInNodeYPosition();
            }
            var xCood = location === "left" ? x : x + pane.getWidth();
            var yCood = y + nodeYOffset;
            // calculate new x and y coods for node.
            node.setNodePosition( xCood, yCood );
            lastKnownNodeYPosition = node.getY();
        },

        _changeInNodeYPosition : function () {
            var currentNodeYPosition = node.getY();
            return lastKnownNodeYPosition - currentNodeYPosition;
        },

        setLocation : function (loc) {

            location = loc;
        }


    }
}