function createNodeSocket(transparentPane, node) {
    console.log("createnode socket") ;
    var node = node,
        pane = transparentPane,
        nodeYOffset = 90,
        lastKnownNodeYPosition = node.getY();
        //horizontalNode = node.getHorizontalNode();

    node.restrictX();

   // horizontalNode.setDimensionsOfTransparentPane(pane.getDimensions());

    return {

        updateNode : function (x, y) {

            if(this._changeInNodeYPosition()) {
                nodeYOffset = nodeYOffset - this._changeInNodeYPosition();
            }
            var xCood = x - 10;
            var yCood = y + nodeYOffset;
            // calculate new x and y coods for node.
            node.setNodePosition( xCood, yCood );
            node.setUpperYLimit(pane.getHeight() + y);
            node.setLowerYLimit(y);
            lastKnownNodeYPosition = node.getY();
            //horizontalNode.setDimensionsOfTransparentPane(pane.getDimensions());


        },



        _changeInNodeYPosition : function () {
            var currentNodeYPosition = node.getY();
            return lastKnownNodeYPosition - currentNodeYPosition;
        }


    }
}