function createNodeSocket(transparentPane, node) {
    console.log("createnode socket") ;
    var node = node,
        pane = transparentPane,
        nodeYOffset = 90,
        lastKnownNodeYPosition = node.getY();

        horizontalNode = node.getHorizontalNode();

    node.restrictX();
    horizontalNode.setCurrentlyAttachedPane(pane);
    node.setCurrentlyAttachedPane(pane);

    return {

        updateNode : function (x, y) {

            if(this._changeInNodeYPosition()) {
                nodeYOffset = nodeYOffset - this._changeInNodeYPosition();
            }
            var xCood = x;
            var yCood = y + nodeYOffset;
            // calculate new x and y coods for node.
            node.setNodePosition( xCood, yCood );
            lastKnownNodeYPosition = node.getY();
        },

        _changeInNodeYPosition : function () {
            var currentNodeYPosition = node.getY();
            return lastKnownNodeYPosition - currentNodeYPosition;
        }


    }
}