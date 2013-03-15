define(['jQuery',
        'BaseType',
        'PropertiesGuiAPI',
        'MethodsGuiAPI' ], function ($,
                                     BaseType,
                                     PropertiesGuiAPI,
                                     MethodsGuiAPI) {

    return BaseType.extend({

        initialize : function (options) {



            this.id = options.id;
            this.model = options.classBoxModel;
            this.view = options.guiView;
            this.controller = options.guiController;

            this.properties = PropertiesGuiAPI.initialize(this.view.getMyEl());
            this.methods = MethodsGuiAPI.initialize(this.view.getMyEl());
        },

        setClassName : function (name) {

            var inputEl = this.view.getMyEl().find('.changeClassName input');
            inputEl.val(name);
            inputEl.trigger("change");
        },

        clickAddMethod : function () {
            this.view.getMyEl().find('.methods .addMethod input').click();
        },

        clickAddProperty : function () {
            this.view.getMyEl().find('.properties .addProperty input').click();
        },

        property : function (index) {
            return this.properties.property(index);
        },

        method : function(index) {
            return this.methods.method(index);
        },

        propertiesSize : function () {
            return this.properties.size();
        },

        methodsSize : function () {
            return this.methods.size();
        }
    });
});