define(['core/BaseType',
        'diagram/connectors/nodes/arrowView',
        'diagram/connectors/nodes/arrowController',
        'diagram/connectors/nodes/horizontalNodesMediator',
        'diagram/connectors/lines/lineView'],
        function (
        BaseType,
        ArrowView,
        ArrowController,
        HorizontalNodesMediator,
        LineView) {



    return {

        create : function (horizontalConnectorModel) {


            var model = horizontalConnectorModel;

            // create node views.
            var leftArrowView = new ArrowView({
                model : model.getLeftArrow()
            });

            var proximalArrowView = new ArrowView({
                model : model.getProximalNode()
            })

            new LineView({
                modelA : model.getLeftArrow(),
                modelB : model.getProximalNode(),
                connectorModel : model
            });

            var horizontalArrowMediator = new HorizontalNodesMediator({
                leftArrowModel : model.getLeftArrow(),
                proximalNodeModel : model.getProximalNode()
            });

            new ArrowController({
                orientation : "left",
                mediator : horizontalArrowMediator,
                view : leftArrowView
            });

            new ArrowController({
                orientation : "proximal",
                mediator : horizontalArrowMediator,
                view : proximalArrowView
            });



            // create line views

            // create node controllers

            //  create mediator for nodes
        }
    }

});