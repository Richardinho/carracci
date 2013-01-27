Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.HorizontalConnector = Glenmorangie.utils.extend({

    initialize : function () {
        this.nodes = [];
        this.lines = [];
        this.lineModels = [];
    },

    updateAll : function () {

        var linesLength = this.lineModels.length;

        for ( i = 0; i < linesLength; i++ ) {
            this.lineModels[i].updateLine();
        }

        this.renderAll();
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
    }




});