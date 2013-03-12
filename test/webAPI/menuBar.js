define(['ToolsDropDownAPI', 'jQuery'], function (ToolsDropDownAPI, $) {

    var toolsDropDownAPI;
    return {



        initialize: function () {
            this.el = $('#menu');
            toolsDropDownAPI = ToolsDropDownAPI.initialize($('#tool-bar'));
            return this;
        },

        clickOnToolsButton : function () {
            this.el.find('#tools').click();
        },

        toolsDropDown : function () {
            return toolsDropDownAPI;
        }
    }
});