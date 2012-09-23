Glenmorangie.namespace("Glenmorangie.module");

Glenmorangie.module.Connector = function (canv, baseX, baseY) {
    var canvas = canv;
    var nodes = [];
    var lines = [];
    var lineMode = "normal";


    return {
        initialize : function () {

            var node1 = this._createNode(20,100,false, "do");
            var node2 = this._createNode(50,100,true,"rae");
            var node3 = this._createNode(20,200,false, "me");
            var node4 = this._createNode(50,200,true, "fa");

            this._linkNodesHorizontally(node1, node2);
            this._linkNodesVertically(node1, node3);
            this._linkNodesHorizontally(node3, node4);

            this.renderAll();

            return this;
        },

        // this should draw the elements.
        renderAll : function () {

            var i = 0,
                nodesLength = nodes.length,
                linesLength = lines.length;
            for ( i = 0; i < nodesLength; i++ ) {
                nodes[i].render();
            }

            for ( i = 0; i < linesLength; i++ ) {
                lines[i].render();
            }
        },

        // this sets the line mode to either 'normal' or 'dashed' then re-renders the connector.
        updateLineMode : function (mode) {
            lineMode = mode;

            if(mode === "normal") {
                this._setLinesToNormal();

            } else {
                this._setLinesToDashes();
            }
            this.renderAll();
        },

        _createNode : function (x, y, hasArrowHead, id) {
            var node = createNode(canvas, this, x, y, hasArrowHead, id).initialize();
            nodes.push(node);
            return node;
        },

        _linkNodesHorizontally : function (nodeA, nodeB) {

            lines.push(createLine(nodeA, nodeB, canvas, "horizontal"));
            if (nodeA.getX() > nodeB.getX()) {
                nodeA.setDirection("right");
                nodeB.setDirection("left");
            } else {
                nodeA.setDirection("left");
                nodeB.setDirection("right");
            }
            nodeA.linkNode(nodeB, "horizontal");
            nodeB.linkNode(nodeA, "horizontal");

        },

        _linkNodesVertically : function (nodeA, nodeB) {

            lines.push(createLine(nodeA, nodeB, canvas, "vertical"));
            nodeA.linkNode(nodeB, "vertical");
            nodeB.linkNode(nodeA, "vertical");
        },

        _setLinesToNormal : function () {
            var i = 0,
                linesLength = lines.length;

            for ( i = 0; i < linesLength; i++ ) {
                lines[i].normal();
            }
        },

        _setLinesToDashes : function () {
            var i = 0,
                linesLength = lines.length;

            for ( i = 0; i < linesLength; i++ ) {
                lines[i].dashes();
            }
        },
    }
}
