define([
    "BaseType",
    "utility/note"

    ],

        function (
            BaseType,
            Note
        ) {


    return BaseType.extend({


        initialize : function (options) {

            this.model = options.model;

            this.model.on("change", this.updateLocation, this);
            this.model.on("change:text", this.updateText, this);

            this.svgElement = new Note({

                width : this.model.getWidth(),
                height : this.model.height,
                text : this.model.getText()

            });

            this.model.setHeight(this.svgElement.height);

            this.model.on("delete", this.destroy, this);

        },

        destroy : function () {

            this.svgElement.destroy();

        },

        updateLocation : function () {
            console.log("update location of note");
            this.svgElement.setCoods(this.model.getXCood(), this.model.getYCood());

        },

        updateText : function () {


            console.log("update text");
            this.svgElement.resetText(this.model.getText());
        }

    });
});

