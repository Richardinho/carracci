define(['utility/extend', "underscore"], function (BaseType, _) {

    return BaseType.extend({

        initialize : function (options) {
            _.bindAll(this, "getHelpElement");
            this.el = options.el;
        },

        getHelpElement : function () {
            return this.el.find('#help-button');
        },


        getToolsElement : function () {
            return this.el.find('#tools');
        }





    });
});