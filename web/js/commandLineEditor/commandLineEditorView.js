define([ 'BaseType', 'underscore', 'jQuery' ], function ( BaseType, _, $ ) {

    return BaseType.extend({

        initialize : function (options) {
            this.el = options.el;
            this.render();
        },

        render : function () {
            this.el.html(this.template())
        },

        template : _.template($('#command-line-editor-template').html())

    });
});


