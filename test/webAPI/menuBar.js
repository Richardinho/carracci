define(['ToolsDropDownAPI',
        'jQuery',
        'BaseType'], function ( ToolsDropDownAPI,
                                $,
                                BaseType ) {

    return BaseType.extend({

        initialize: function (options) {

            this.el = options.el;
            this.toolsDropDownAPI = new ToolsDropDownAPI({ el : $('#tool-bar') });
        },

        clickOnToolsButton : function () {
            this.el.find('.tools').focus();
        },

        toolsDropDown : function () {
            return this.toolsDropDownAPI;
        }
    });
});