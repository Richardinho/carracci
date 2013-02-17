Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.HorizontalConnector = Glenmorangie.utils.extend({

    initialize : function () {
        this.nodes = [];
        this.lines = null;
        this.lineModels = [];
    },

    changeLine : function () {

        this.lines.each(function (index, lineModel) {
            lineModel.alternateStyle();
        });
    }
});