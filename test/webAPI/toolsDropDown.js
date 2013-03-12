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

        close : function () {
            this.el.find('.close-button').click();
        }


    }
})