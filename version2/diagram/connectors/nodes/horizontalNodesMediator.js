define(["core/BaseType",
         ],function (
            BaseType
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.leftArrowModel = options.leftArrowModel;
            this.proximalNodeModel = options.proximalNodeModel;

        },

        update : function (node, x, y) {
            switch(node) {

            case "left" :
                this.updateLeftArrow(x, y);
                break;
            case "proximal" :
                this.updateProximalNode(x, y);
                break;
            }

        },

        updateLeftArrow : function (x, y) {
            this.leftArrowModel.children['xCood'].set(x);
            this.leftArrowModel.children['yCood'].set(y);
            this.proximalNodeModel.children['yCood'].set(y);

        },

        updateProximalNode : function (x, y) {
            this.proximalNodeModel.children['xCood'].set(x);
            this.proximalNodeModel.children['yCood'].set(y);
            this.leftArrowModel.children['yCood'].set(y);

        }




    });
});
