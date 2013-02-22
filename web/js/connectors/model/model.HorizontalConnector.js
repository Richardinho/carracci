define(['utility/extend'], function (extend) {

    return extend.extend({

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
});
