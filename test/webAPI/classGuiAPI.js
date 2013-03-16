define(['jQuery',
        'BaseType',
        'PropertiesGuiAPI',
        'MethodsGuiAPI' ], function ($,
                                     BaseType,
                                     PropertiesGuiAPI,
                                     MethodsGuiAPI) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.view = options.view;
            this.controller = options.controller;
            this.properties = new PropertiesGuiAPI(this.view.el);
            this.methods = new MethodsGuiAPI(this.view.el);
        },

        setClassName : function (value) {

            this.view.el.find('.changeClassName input').val(value);
            this.view.el.find('.changeClassName input').trigger("change");
        },

        property : function (index) {
            return this.properties.property(index);
        },

        method : function (index) {
            return this.methods.method(index);
        },

        clickAddProperty : function () {
            this.view.el.find('.addProperty input').click();
        },

        clickAddMethod : function () {
            this.view.el.find('.addMethod input').click();
        }
    });
});