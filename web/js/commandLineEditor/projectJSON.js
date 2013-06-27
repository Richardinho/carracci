define([ 'BaseType', 'underscore', 'jQuery' ], function ( BaseType, _, $ ) {

    return BaseType.extend({

        initialize : function (options) {
            console.log("project json view")
            this.el = options.el;
            this.render();

        },

        render : function () {

        }
    });
});


