define(['utility/extend', 'svgUtilities', 'Collection' ], function (BaseType, svgUtilities, Collection) {

    return BaseType.extend({

        initialize : function (options) {
            this.model = options.model;
            this.svgUtils = svgUtilities;
            this.element = this._createSvgShape();
            this.model.on("change", this.render, this);
            this.model.on("changeText", this.setProperty, this);
        },

        render : function () {
            this.element.transform( "T" + this.model.get("tempX") +
                                    "," + this.model.get("tempY") );

        },

        setClassName : function () {

        },

        setProperty : function (index) {
            var prop = this.formatProperty(this.model.get("properties").get(index));
            this.element[index + 1].attr({"text" : prop });
        },

        setMethod : function () {

        },

        _createSvgShape : function () {
            var x = this.model.get('xCood');
            var y = this.model.get('yCood');
            var width = this.model.get('width');
            var height = this.model.get('height');
            var that = this;
            var properties = this.model.get("properties").map(function (index, element) {
                return that.formatProperty(element);
            });

            return this.svgUtils.createUmlBox(x, y, width, height, properties);
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

