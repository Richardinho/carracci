
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
            ClassBoxFactory({ name : "List", id : "blahClass", x : 0, y : 0,
                properties :  [{ name : "foo", visibility : "+", type : "String" },
                    { name : "bar", visibility : "#", type : "int" }] });
        },

        createConnectorClass : function () {

            connectorFactory({
                leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                rightNode : { x  : 225, y : 110 , arrows : ['diamond'] }
                });
        }
    });
});