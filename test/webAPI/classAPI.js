define(['jQuery',
        'BaseType',
        'ClassGuiAPI'], function ($,
                                  BaseType ,
                                  ClassGuiAPI) {

    return BaseType.extend({

        initialize : function (component) {

            this.model = component.ClassBoxModel;
            this.view = component.ClassBoxView;
            this.controller = component.ClassBoxController;

            this.gui = new ClassGuiAPI({
                model : this.model,
                view : component.ClassGuiView,
                controller : component.ClassGuiController
            });
        },

        getGui : function () {
            return this.gui;
        },

        xCood : function () {
            return this.model.get('xCood');
        },

        yCood : function () {
            return this.model.get('yCood');
        },

        move : function (dx, dy) {
            this.model.set({ 'startX': this.xCood() });
            this.model.set({ 'startY': this.yCood() });
            this.model.translate(dx, dy);
        },

        click : function () {
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent('click', true, false);
            this.view.element.node.dispatchEvent(evObj);
        },

        height : function () {
            return this.model.get("height");
        }
    });
});