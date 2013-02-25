define(['utility/extend', 'underscore', 'jQuery'], function (BaseType, _, $) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "closeHelpPage", "changePage");
            this.model = options.model;

            this.view = options.view;
            $(this.view.getCloseButton()).live('click', this.closeHelpPage);
            $(this.view.getPageLink()).live('click', this.changePage);

        },

        closeHelpPage : function () {
            this.model.setInvisible();
            return false;
        },

        changePage : function (event) {
            var page = $(event.currentTarget).data("page");
            this.model.setPage(page);
        }



    });
});