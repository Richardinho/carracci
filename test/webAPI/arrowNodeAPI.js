define(['jQuery',
        'BaseType' ], function ($,
                                BaseType ) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.view = options.view;
        },

        coods : function (x, y) {
            this.model.update(x, y);
        },

        xCood : function (newXCood) {

            if(!newXCood) {
                return this.model.get('xCood');
            } else {
                this.model.update(newXCood, this.model.get('yCood'));
            }
        },

        yCood : function (newYCood) {

            if(!newYCood) {
                return this.model.get('yCood');
            } else {
                this.model.update(this.model.get('xCood'), newYCood);
            }
        },

        move : function (dx, dy) {
            this.model.update(this.xCood() + dx, this.yCood() + dy);
        },

        arrowDirection : function () {
            return this.model._getArrowModel().get("direction");
        },

        click : function () {
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent('click', true, false);
            this.view.element.node.dispatchEvent(evObj);
        }
    });
});
