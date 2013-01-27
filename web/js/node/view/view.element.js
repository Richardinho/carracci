Glenmorangie.namespace("Glenmorangie.View");

Glenmorangie.View.Element = Glenmorangie.utils.extend({

    initialize : function (options) {
        this.model = options.model;
        this.element = options.svgUtils.createCircle(this.model.xCood, this.model.yCood);
    },

    render : function() {
        this.element.attr({ "cx" : this.model.xCood });
        this.element.attr({ "cy" : this.model.yCood });
        this.element.toFront();
    }

});
