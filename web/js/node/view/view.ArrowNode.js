Glenmorangie.namespace("Glenmorangie.View");

Glenmorangie.View.ArrowNode = Glenmorangie.View.Element.extend({

    initialize : function (options) {

        Glenmorangie.View.Element.prototype.initialize.call(this, options);
        this.arrowView = options.arrowView;
    },

    render : function() {
        Glenmorangie.View.Element.prototype.render.call(this);
    }

});
