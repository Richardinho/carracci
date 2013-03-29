define(['BaseType', 'svgUtilities', 'Collection' ], function (BaseType, svgUtilities, Collection) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.svgUtils = svgUtilities;

            this.box = this._createSvgShape();
            this.element = this._createPane();

            this.model.on("moveClass", this.render, this);
            this.model.on("updateDimensions", this.changeDimensions, this);
            this.model.on("updateClass", this.changeBox, this);
        },

        render : function () {

            this.element.transform( "T" + this.model.get("XMoved") +
                                    "," + this.model.get("YMoved") );

            var x = this.element.getBBox().x ;
            var y = this.element.getBBox().y ;

            this.model.updateCoordinates(x, y, true);
            this.box.render();
        },

        changeBox : function () {
            this.box.recreate();
        },

        changeDimensions : function () {
            this.element.setDimensions(this.model);
        },

        _createPane : function () {
            return this.svgUtils.createUmlBoxPane(this.model);
        },

        _createSvgShape : function () {
            return this.svgUtils.createUmlBoxFoo(this.model);
        },

        getType : function () {
            return "ClassBoxView";
        }
    });
});

