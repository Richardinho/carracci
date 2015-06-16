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

            console.log("create new note view");
            this.model = options.model;

            this.model.on("update:position", this.updateLocation, this);
            this.model.on("save", this.update, this);

            this.svgElement = new Note({

                width : this.model.getWidth(),
                height : this.model.height,
                text : this.model.getText(),
                xCood : this.model.getXCood(),
                yCood : this.model.getYCood()

            });

            this.model.setHeight(this.svgElement.height);

            this.model.on("destroy", this.destroy, this);

        },

        destroy : function () {
            this.model.off("update:position", this.updateLocation, this);
            this.model.off("save", this.update, this);
            this.model.off("destroy", this.destroy, this);

            this.svgElement.destroy();

        },

        updateLocation : function () {

            this.svgElement.setCoods(this.model.getXCood(), this.model.getYCood());

        },

        update : function (text, width) {

            this.svgElement.update(this.model.getText(), this.model.get('width'));
            this.model.setHeight(this.svgElement.height);

        }



    });
});

