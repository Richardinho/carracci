define(['jQuery',
        'BaseType'], function ($,
                               BaseType ) {

    return BaseType.extend({

        initialize : function (options) {

            this.id = options.classId;
            this.model = options.classBoxModel;
            this.view = options.classBoxView;
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