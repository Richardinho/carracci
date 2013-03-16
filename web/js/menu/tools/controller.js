
define(['BaseType',
        'underscore',
        'jQuery',
        'ClassBoxFactory',
        'connectorFactory'], function (BaseType,
                                       _,
                                       $,
                                       ClassBoxFactory,
                                       connectorFactory) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "closeTools", "createUmlClass", "createConnectorClass");

            this.model = options.model;
            this.view = options.view;

            $(this.view.getCloseButton()).live('click', this.closeTools);
            $(this.view.getUmlClassButton()).live('click', this.createUmlClass)
            $(this.view.getConnectorButton()).live('click', this.createConnectorClass)
        },

        closeTools : function () {
            this.model.setInvisible();
            return false;
        },

        createUmlClass : function () {
            ClassBoxFactory({ x : 0, y : 0, "height" : 70, "width" : 100 });
        },

        createConnectorClass : function () {

            connectorFactory({
                x1 : 40,
                y1 : 30,
                x2 : 240,
                y2 : 350
            });
        }
    });
});