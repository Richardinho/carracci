define(['utility/extend', 'svgUtilities', 'Collection' ], function (BaseType, svgUtilities, Collection) {

    return BaseType.extend({

        initialize : function (options) {
            this.model = options.model;
            this.svgUtils = svgUtilities;
            this.element = this._createSvgShape();
            this.model.on("change", this.render, this);
            this.model.on("changeText", this.renderText, this);
            this.model.on("changeBlah", this.renderText, this);
            this.model.on("add", this.addProperty, this);
            this.model.on("change", this.deleteProperty, this);

        },

        render : function () {
            this.element.transform( "T" + this.model.get("tempX") +
                                    "," + this.model.get("tempY") );
        },

        addProperty : function () {
            this.element.addProperty("blahblah");
        },

        deleteProperty : function (index) {
            this.element.deleteProperty(index);
        },

        renderText : function (index) {
            var prop = this.formatProperty(this.model.get("properties").get(index));
            this.element.updateProperty(index, prop);
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

