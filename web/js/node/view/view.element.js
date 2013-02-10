Glenmorangie.namespace("Glenmorangie.View");

Glenmorangie.View.Element = Glenmorangie.utils.extend({

    initialize : function (options) {
        this.model = options.model;
        this.element = options.svgUtils.createCircle(this.model.get('xCood'), this.model.get('yCood'));
        this.model.on("change", this.render, this);

    },

    render : function() {
        this.element.attr({ "cx" : this.model.get('xCood') });
        this.element.attr({ "cy" : this.model.get('yCood') });
        this.element.toFront();
    }

});
