define(['BaseType', 'svgUtilities', 'Collection' ], function (BaseType, svgUtilities, Collection) {

    return BaseType.extend({

        initialize : function (options) {
            this.model = options.model;
            this.svgUtils = svgUtilities;
            this.box = this._createSvgShape();
            this.element = this._createPane();
            this.model.on("change:move", this.render, this);
            this.model.on("changeText", this.renderText, this);
            this.model.on("change:add", this.addProperty, this);
            this.model.on("change:delete", this.deleteProperty, this);
            this.model.on("change:dimensions", this.changeDimensions, this);
            this.model.on("change:visibility", this.renderText, this);
            this.model.on("change:name", this.renderText, this);

        },

        render : function () {

            this.element.transform( "T" + this.model.get("XMoved") +
                                    "," + this.model.get("YMoved") );
            var x = this.element.getBBox().x ;
            var y = this.element.getBBox().y ;
            this.model.set({ xCood : x }, { silent : true });
            this.model.set({ yCood : y }, { silent : true });
            this.box.render();
        },

        changeDimensions : function () {
            this.element.setDimensions(this.model);
        },

        addProperty : function () {
            this.box.recreate();
        },

        deleteProperty : function (index) {
            this.box.recreate();
        },

        renderText : function (index) {
            this.box.recreate();
        },

        _createPane : function () {
            return this.svgUtils.createUmlBoxPane(this.model);
        },

        _createSvgShape : function () {

            var properties = this.model.get("properties").map(function (index, element) {
                return this.formatProperty(element);
            }, this);

            return this.svgUtils.createUmlBoxFoo(this.model);
        },

        formatProperty : function (property) {
            var result = "";

            result += property.visibility;
            result += property.name;
            result +=":";
            result += property.type;

            return result;
        },

        formatMethod : function (method) {
            var result = "";

            result += method.visibility;
            result += method.name;
            result += "(";
            for(var arg in method.args) {
                result += arg + ":" + method.args[arg] + ",";
            }
            if(result.charAt(result.length-1) === ",") {
                result = result.substring(0, result.length-1);
            }
            result +="):";
            result += method.returnType;

            return result;
        }
    });
});

