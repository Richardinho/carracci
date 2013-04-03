define(['BaseType'], function (BaseType) {

    return BaseType.extend({

        initialize : function () {
            this.lines = null;
        },

        changeLine : function () {
            this.lines.each(function (index, lineModel) {
                lineModel.alternateStyle();
            });
        }
    });
});
