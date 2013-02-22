Glenmorangie.namespace("Glenmorangie.View");

Glenmorangie.View.ClassBox = Glenmorangie.utils.extend({

    initialize : function (options) {
        this.model = options.model;
        this.svgUtils = options.svgUtils;
        this.element = this._createSvgShape();
        this.model.on("change", this.render, this);
    },

    render : function () {
        this.svgUtils.resetRectangle(this.element, this.model.get("xCood"), this.model.get("yCood"));
    },

    _createSvgShape : function () {
        var x = this.model.get('xCood');
        var y = this.model.get('yCood');
        var width = this.model.get('width');
        var height = this.model.get('height');
        var text = this.svgUtils.createText("blah");
        return this.svgUtils.createRectangle(x, y, width, height);

    },

    formatMethod : function (method) {
        var result = "";

        result += method.visibility;
        result += method.name;
        result += "(";
        for(var arg in method.args) {
            result += arg + ":" + method.args[arg] + ",";
        }
        debugger;
        if(result.charAt(result.length-1) === ",") {
            result = result.substring(0, result.length-1);
        }
        result +="):";
        result += method.returnType;

        return result;
    }


});