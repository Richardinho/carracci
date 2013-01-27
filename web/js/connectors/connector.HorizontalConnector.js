Glenmorangie.namespace("Glenmorangie");

Glenmorangie.HorizontalConnector = Glenmorangie.AbstractConnector.extend({

    coordinates : null,

    initialize : function (options) {

        this.nodes = [];
        this.lines = [];

        var x = options.x;
        var y = options.y;

        var nodeFactory = options.nodeFactory;

        this.coordinates = this._precomputeCoods(x, y);

        var node1 = nodeFactory.createArrowNode(this.coordinates.A.x,this.coordinates.A.y, "left", this, "do");
        var node2 = nodeFactory.createNode(this.coordinates.B.x, this.coordinates.B.y, this, "rae");
        node1.setProximalNode(node2);
        var node3 = nodeFactory.createNode(this.coordinates.C.x, this.coordinates.C.y, this);
        var node4 = nodeFactory.createNode(this.coordinates.D.x, this.coordinates.D.y, this);

        node1.addListener(node2, "moveInYAxis");
        node2.addListener(node1, "moveInYAxis");
        node2.addListener(node3, "moveInXAxis");
        node3.addListener(node2, "moveInXAxis");
        node3.addListener(node4, "moveInYAxis");
        node4.addListener(node3, "moveInYAxis");

        node3.addListener(node1, "setArrowDirection");
        node2.addListener(node1, "setArrowDirection");

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);
        this.nodes.push(node4);

        this.renderAll();

    },

    _precomputeCoods : function (x, y) {

        var coods = { A : createCoods(x, y),
                      B : createCoods(x + 100, y),
                      C : createCoods(x + 100, y + 100 ),
                      D : createCoods(x + 200, y + 100 ) };

        function createCoods(x, y) {
            return { "x" : x, "y" : y };
        }

        return coods;
    }
});