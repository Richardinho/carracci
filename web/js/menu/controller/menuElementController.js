define(['BaseType', 'underscore', 'jQuery'], function (BaseType, _, $) {

    return BaseType.extend({

        initialize : function (options) {
            this.model = options.model;
            this.view = options.view;

            _.bindAll(this, "open", "close");

            this.view.getButtonElement().on("focus", this.open);
            this.view.getButtonElement().on("blur", this.close);

            this._attachEventsToSubItems();

        },

        open : function () {
            this.model.open();
        },

        close : function () {
            this.model.close();
        },

        _attachEventsToSubItems : function () {
            if(this.model.items) {

                var dropdown = this.view._getDropdown();

                $.each(this.model.items, function (index, item) {
                    dropdown.find('.' + item.name).on("click", item.callback);
                });
            }
        }



    });

});