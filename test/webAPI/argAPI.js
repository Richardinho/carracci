define(['jQuery',
        'BaseType' ], function ( $,
                                 BaseType ) {

    return BaseType.extend({

        initialize : function (options) {
            this.el = options.el;
        },

        name : function () {
            return $(this.el).find('.name').val();
        },

        type : function () {
            return $(this.el).find('.type').val();
        },

        deleteArg : function () {
            $(this.el).find('.del').click();
        }
    });
});