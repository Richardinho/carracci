define(['BaseType',
        'ArrowNodeAPI',
        'NodeAPI' ], function (BaseType,
                               ArrowNodeAPI,
                               NodeAPI) {


    return BaseType.extend({

        initialize : function (component) {

            this.right = new ArrowNodeAPI({
                model : component.rightArrowNode,
                view : component.rightArrowNodeView
            });

            this.left = new ArrowNodeAPI({
                model : component.leftArrowNode,
                view : component.leftArrowNodeView
            });

            this.proximal = new NodeAPI({
                model : component.proximalNode,
                view : component.proximalNodeView
            });

            this.distal = new NodeAPI({
                model : component.distalNode,
                view : component.distalNodeView
            });
        },

        getLeftArrowNode : function () {
            return this.left;
        },

        getRightArrowNode : function () {
            return this.right;
        },

        getProximalNode : function () {
            return this.proximal;
        },

        getDistalNode : function () {
            return this.distal;
        }
    });
});

