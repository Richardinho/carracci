define(['BaseType',
        'ArrowNodeAPI',
        'NodeAPI' ], function (BaseType,
                               ArrowNodeAPI,
                               NodeAPI) {


    return BaseType.extend({

        initialize : function (component) {

            this.top = new ArrowNodeAPI({
                model : component.topArrowNode,
                view : component.topArrowNodeView
            });

            this.bottom = new ArrowNodeAPI({
                model : component.bottomArrowNode,
                view : component.bottomArrowNodeView
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

        getTopArrowNode : function () {
            return this.top;
        },

        getBottomArrowNode : function () {
            return this.bottom;
        },

        getProximalNode : function () {
            return this.proximal;
        },

        getDistalNode : function () {
            return this.distal;
        }
    });
});

