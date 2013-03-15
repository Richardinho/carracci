define([], function () {

    return {

        initialize : function (el) {

            this.el = el;
            return this;
        },

        isVisible : function () {

            return !this.isHidden();
        },

        isHidden : function () {

            return this.el.find(':first-child').hasClass("hidden");
        },

        clickOnCreateConnector : function () {
            this.el.find('.connector').click();
        },

        clickOnCreateUmlClass : function () {
            this.el.find('.umlClass').click();
        },

        close : function () {
            this.el.find('.close-button').click();
        }


    }
})