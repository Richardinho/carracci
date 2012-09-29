Glenmorangie.namespace("Glenmorangie.module");

Glenmorangie.module.Connector = function (canv, baseX, baseY, or) {
    var canvas = canv;
        nodes = [],
        lines = [],
        lineMode = "normal",
        orientation = or;


    return {
        initialize : function () {

            var node1 = this._createNode(20,100, "do");
            var node3 = this._createNode(20,200, "me");
            var node2 = this._createNodeWithArrow(50,100, "rae", node1, node3);
            var node4 = this._createNodeWithArrow(50,200, "fa", node3, node1);

            this._linkNodesHorizontally(node1, node2);
            this._linkNodesVertically(node1, node3);
            this._linkNodesHorizontally(node3, node4);

            node1.addListener(node2, "setArrowDirection");
            node3.addListener(node2, "setArrowDirection");

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

        _createNode : function (x, y, id) {
            var node = new Node(canvas, this, x, y, id);
            nodes.push(node);
            return node;
        },

        _createNodeWithArrow : function (x, y, id, partnerNode, distalNode) {
            var node = new NodeWithArrowClass(canvas, this, x, y, id, partnerNode, distalNode);
            nodes.push(node);
            return node;
        },

        _linkNodesHorizontally : function (nodeA, nodeB) {

            lines.push(createLine(nodeA, nodeB, canvas));

            nodeA.addListener(nodeB, "horizontal");
            nodeB.addListener(nodeA, "horizontal");

        },

        _linkNodesVertically : function (nodeA, nodeB) {

            lines.push(createLine(nodeA, nodeB, canvas, "vertical"));
            nodeA.addListener(nodeB, "vertical");
            nodeB.addListener(nodeA, "vertical");
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
