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

            this.model.on("updateLocation", this.updateLocation, this);

            this.svgElement = new Note({

                width : this.model.getWidth()

            });

            this.model.setHeight(this.svgElement.height);



        },

        updateLocation : function () {

            this.svgElement.setCoods(this.model.x, this.model.y);

        },

        render : function () {

            //this.svgElement.redraw(this.model);
        }

    });
});

