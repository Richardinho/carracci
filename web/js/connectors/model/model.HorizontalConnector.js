define(['BaseType'], function (extend) {

    return extend.extend({

        initialize : function () {
            this.nodes = [];
            this.lines = null;
            this.lineModels = [];
        },

        changeLine : function () {
            console.log("change line")
            this.lines.each(function (index, lineModel) {
                lineModel.alternateStyle();
            });
        }
    });
});
