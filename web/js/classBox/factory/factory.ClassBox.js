Glenmorangie.namespace("Glenmorangie");

Glenmorangie.ClassBoxFactory = function (options) {

    var x  = options.x,
        y = options.y,
        svgUtils = options.svgUtils,
        length = options.length,
        height = options.height,
        width = options.width,
        keyManager = options.keyManager,
        globalController = options.globalController,
        model,
        view;

    model = new Glenmorangie.Model.ClassBox({ "x" : x, "y": y, className : "List<String>", "height" : height, "width" : width });

    view = new Glenmorangie.View.ClassBox({ "model" : model, "svgUtils" : svgUtils });

    controller = new Glenmorangie.Controller.ClassBox({ "model" : model,
                                                        "view" : view ,
                                                        "keyManager" : keyManager,
                                                        "globalController" : globalController });

    return model;
};