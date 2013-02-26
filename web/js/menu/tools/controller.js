
define(['utility/extend',
        'underscore',
        'jQuery',
        'ClassBoxFactory'], function (BaseType, _, $, ClassBoxFactory) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "closeTools", "createUmlClass");

            this.model = options.model;
            this.view = options.view;

            $(this.view.getCloseButton()).live('click', this.closeTools);
            $(this.view.getUmlClassButton()).live('click', this.createUmlClass)
        },

        closeTools : function () {
            this.model.setInvisible();
            return false;
        },

        createUmlClass : function () {
            ClassBoxFactory({ x : 240, y : 130, "height" : 70, "width" : 100 });
        }
    });
});