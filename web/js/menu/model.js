define(['Model'], function (Model) {

    return Model.extend({

        initialize : function (options) {
            this.helpPage = options.helpPage;
            this.tools = options.tools;
        },

        showHelpPage : function () {
            this.helpPage.setVisible();
        },

        showTools : function () {
            this.tools.setVisible();
        }
    });

});