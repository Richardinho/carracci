define(['ViewElement'], function (ViewElement) {

    //ToDo: This doesn't seem to do much, maybe just get rid and use superclass instead?
    return ViewElement.extend({

        initialize : function (options) {
            _.bindAll(this, "destroy");
            ViewElement.prototype.initialize.call(this, options);
            //this.arrowView = options.arrowView;
        },

        render : function() {
            ViewElement.prototype.render.call(this);
        },

        getType : function () {
            return this.model.name + "ArrowNodeView";
        },

        destroy : function () {
            ViewElement.prototype.destroy.call(this);
        }

    });

});


