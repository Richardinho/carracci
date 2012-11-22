

Glenmorangie.ConnectorFactory = (function () {

    var canvas,
        nodeFactory;

    function AbstractConnector () {

        this.nodes = [];
        this.lines = [];
        this.lineMode = "normal";
    }

    AbstractConnector.prototype.initialize = function () {};

    AbstractConnector.prototype.renderAll = function () {
        var i = 0,
            nodesLength = this.nodes.length,
            linesLength = this.lines.length;

        for ( i = 0; i < nodesLength; i++ ) {
            this.nodes[i].render();
        }

        for ( i = 0; i < linesLength; i++ ) {
            this.lines[i].render();
        }
    };

    // this sets the line mode to either 'normal' or 'dashed' then re-renders the connector.
    AbstractConnector.prototype.updateLineMode = function () {

        if(this.lineMode === "normal") {
            this.lineMode = "dashes";
            this._setLinesToDashes();

        } else {
            this.lineMode = "normal";
            this._setLinesToNormal();
        }
        this.renderAll();
    };

    AbstractConnector.prototype._createNode = function (x, y, id) {

        var node = nodeFactory.createNode(this, x, y, id);
        this.nodes.push(node);
        return node;
    };

    AbstractConnector.prototype._createNodeWithArrow = function (x, y, id, partnerNode, distalNode) {

        var node = nodeFactory.createNodeWithArrow(this, x, y, id, partnerNode, distalNode);
        this.nodes.push(node);
        return node;
    };

    //  ToDo: optimize for loops
    AbstractConnector.prototype._setLinesToDashes = function () {
        var i = 0,
        linesLength = this.lines.length;

        for ( i = 0; i < linesLength; i++ ) {
            this.lines[i].dashes();
        }
    };

    AbstractConnector.prototype._setLinesToNormal = function () {
        var i = 0,
            linesLength = this.lines.length;

        for ( i = 0; i < linesLength; i++ ) {
            this.lines[i].normal();
        }
    };

    AbstractConnector.prototype._linkNodesHorizontally = function (nodeA, nodeB) {

        this.lines.push(createLine(nodeA, nodeB, canvas));

        nodeA.addListener(nodeB, "horizontal");
        nodeB.addListener(nodeA, "horizontal");
    };

    AbstractConnector.prototype._linkNodesVertically = function (nodeA, nodeB) {

        this.lines.push(createLine(nodeA, nodeB, canvas, "vertical"));
        nodeA.addListener(nodeB, "vertical");
        nodeB.addListener(nodeA, "vertical");
    };

    function HorizontalConnector () {
        AbstractConnector.call(this);
    }

    // ToDo: modularize this
    Glenmorangie.utils.extend(AbstractConnector, HorizontalConnector);

    HorizontalConnector.prototype.initialize = function () {

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
    };

    function VerticalConnector () {
        AbstractConnector.call(this);
    }

    // ToDo: modularize this
    Glenmorangie.utils.extend(AbstractConnector, VerticalConnector);

    VerticalConnector.prototype.initialize = function () {

        var node2 = this._createNode( 20, 150, "rae" );
        var node3 = this._createNode( 100, 150, "me" );
        var node1 = this._createVerticalNodeWithArrow( 20, 100, "do", node2, node3, "up" );
        var node4 = this._createVerticalNodeWithArrow( 100, 200, "fa", node3, node2, "down");

        this._linkNodesVertically(node1, node2);
        this._linkNodesHorizontally(node2, node3);
        this._linkNodesVertically(node3, node4);

        this.renderAll();

        return this;
    };

    VerticalConnector.prototype._createVerticalNodeWithArrow = function (x, y, id, partnerNode, distalNode, direction) {

        var node = nodeFactory.createNodeWithVerticalArrow(this, x, y, id, partnerNode, distalNode, direction);
        this.nodes.push(node);
        return node;
    };

    return {
        initialize : function (can, nf) {
            canvas = can;
            nodeFactory = nf;
            return this;
        },

        createConnector : function (baseX, baseY) {
            return new HorizontalConnector(baseX, baseY).initialize();
        },

        createVerticalConnector : function () {
            return new VerticalConnector().initialize();
        }
    };

})();


