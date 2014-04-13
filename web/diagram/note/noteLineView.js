define([
    "BaseType",
    "utility/notePath"

    ],

        function (
            BaseType,
            NotePath
        ) {


    return BaseType.extend({


        initialize : function (options) {

            this.model = options.model;
            this.typeModel = options.typeModel;

            this.width = this.model.getWidth(); // cache this
            this.height = this.model.height;

            var x1 = this._calculateX1();
            var y1 = this._calculateY1();

            var x2 = this._calculateX2();
            var y2 = this._calculateY2();

            this.svgElement = new NotePath({

                x1 : x1,
                y1 : y1,
                x2 : x2,
                y2 : y2
            });

            this.model.on("change", this.update, this);
            this.model.on("delete", this.destroy, this);
            this.typeModel.on("move", this.update, this);
        },

        destroy : function () {

            this.typeModel.off("move", this.update);
            this.svgElement.destroy();
        },

        _calculateX1 : function () {

            return this.typeModel.getXCood() + (this.typeModel.getWidth() / 2);

        },

        _calculateY1 : function () {

            return this.typeModel.getYCood() + (this.typeModel.getHeight() / 2);
        },

        _calculateX2 : function () {

            return this.model.getXCood() + (this.width / 2)
        },
        _calculateY2 : function () {

            return this.model.getYCood() + (this.model.height / 2);
        },

        update : function () {

            this.svgElement.update(this._calculateX1(), this._calculateY1(), this._calculateX2(), this._calculateY2());
        }

    });
});

