define(['BaseType'], function (BaseType) {

    return BaseType.extend ({

        initialize : function (options) {

            this.el = options.el;
        },

        isVisible : function () {

            return !this.isHidden();
        },

        isHidden : function () {

            return this.el.find(':first-child').hasClass("hidden");
        },

        clickOnCreateConnector : function () {
            this.el.find('.connector-button').click();
        },

        clickOnCreateVerticalConnector : function () {
            this.el.find('.vertical-connector-button').click();
        },

        clickOnCreateUmlClass : function () {
            this.el.find('.umlClass').click();
        },

        close : function () {
            this.el.find('.close-button').click();
        }


    });
})