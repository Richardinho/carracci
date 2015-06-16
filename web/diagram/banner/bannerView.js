define([
    "BaseType",
    "utility/banner"

    ],

        function (
            BaseType,
            Banner
        ) {


    return BaseType.extend({


        initialize : function (options) {

            this.model = options.model;

            this.svgElement = new Banner({
                author            : this.model.getAuthor(),
                fontFamily        : this.model.getFontFamily(),
                description       : this.model.getDescription(),
                paddingHorizontal : this.model.getPaddingHorizontal(),
                titleFontSize     : this.model.getTitleFontSize(),
                titleFontFamily   : this.model.getTitleFontFamily(),
                width             : this.model.getWidth(),
                titleText         : this.model.getTitleText(),
                xCood             : this.model.getXCood(),
                yCood             : this.model.getYCood()
            });


            this.svgElement.hide();
            this.model.height = this.svgElement.height;

            this.model.on("update:position", this.updateLocation, this);
            this.model.on("selected", this.select, this);
            this.model.on("deselected", this.deselect, this);
            this.model.on("change", this.render, this);

            this.model.on('destroy', this.destroy, this);

            this.model.on('showbanner', this.show, this);

            this.show();
        },

        updateLocation : function () {

            this.svgElement.setCoods(this.model.getXCood(), this.model.getYCood());

        },

        show : function () {

            this.svgElement.show();

        },

        destroy : function () {
            this.model.off();
            this.svgElement.destroy();

        },

        deselect : function () {

           this.svgElement.setDeselected();

        },

        select : function () {



            this.svgElement.setSelected();
        },

        render : function () {

            var author = this.model.getAuthor(),
                fontFamily = this.model.getFontFamily(),
                description = this.model.getDescription(),
                paddingHorizontal = this.model.getPaddingHorizontal(),
                titleFontSize = this.model.getTitleFontSize(),
                titleFontFamily = this.model.getFontFamily(),
                width = this.model.getWidth(),
                titleText = this.model.getTitleText(),
                fontSize = 12;

            this.svgElement.redraw(
                author,
                fontFamily,
                description,
                paddingHorizontal,
                titleFontSize,
                titleFontFamily,
                width,
                titleText,
                fontSize
            );
        }

    });
});

