define([
    "BaseType",
    "diagram/banner/editorView"
    ],

    function (
        BaseType,
        BannerEditorView
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

            this.view = new BannerEditorView({
                el : $('#banner-editor'),
                model : this.model
            });

            this.view.$el.on("click", "[data-role=save]", $.proxy(this.save, this));
            this.view.$el.on("click", "[data-role=cancel]", $.proxy(this.cancel, this));


        },

        save : function () {

            var result = {};

            $('input, textarea', this.view.$el).each(function (index, element) {

                result[element.name] = element.value;
            });

            this.model.save(result);

            this.model.broadcast("showbanner");

            this.view.hide();

        },

        cancel : function () {

            this.view.hide();

        },

        open : function () {

            this.view.render();

        }







    });
});

