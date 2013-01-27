Glenmorangie.namespace("Glenmorangie");

Glenmorangie.AbstractConnector = Glenmorangie.utils.extend({

    lineMode : "normal",

    initialize : function () {

    },

    renderAll : function () {
        var i = 0,
        nodesLength = this.nodes.length,
        linesLength = this.lines.length;

        for ( i = 0; i < nodesLength; i++ ) {
            this.nodes[i].render();
        }

        for ( i = 0; i < linesLength; i++ ) {
            this.lines[i].render();
        }
    },

    updateLineMode : function () {

        if(this.lineMode === "normal") {
            this.lineMode = "dashes";
            this._setLinesToDashes();

        } else {
            this.lineMode = "normal";
            this._setLinesToNormal();
        }
        this.renderAll();
    },

    _setLinesToDashes : function () {
        var i = 0,
        linesLength = this.lines.length;

        for ( i = 0; i < linesLength; i++ ) {
            this.lines[i].dashes();
        }
    },

    _setLinesToNormal : function () {
        var i = 0,
            linesLength = this.lines.length;

        for ( i = 0; i < linesLength; i++ ) {
            this.lines[i].normal();
        }
    },

    _linkNodesHorizontally : function (nodeA, nodeB) {

        this.lines.push(createLine(nodeA, nodeB, "horizontal"));

        nodeA.addListener(nodeB, "horizontal");
        nodeB.addListener(nodeA, "horizontal");
    },

    _linkNodesVertically : function (nodeA, nodeB) {

        this.lines.push(createLine(nodeA, nodeB, "vertical"));

        nodeA.addListener(nodeB, "vertical");
        nodeB.addListener(nodeA, "vertical");
    }


});