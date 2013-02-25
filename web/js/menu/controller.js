define(['utility/extend', "underscore" ,"jQuery"], function (BaseType, _, $ ) {
    console.log("menu controller")
    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "showHelp", "showTools");

            this.model = options.model;
            this.view = options.view;

            $(this.view.getHelpElement()).on("click", this.showHelp);
            $(this.view.getToolsElement()).on("click", this.showTools);

        },

        showHelp : function () {
            this.model.showHelpPage();
            return false;
        },

        showTools : function () {
            this.model.showTools();
            return false;
        }
    });
});