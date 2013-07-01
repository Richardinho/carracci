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


            // create lines first so they appear below nodes. (crude, I know!)
            new LineView({
                modelA : model.getLeftArrow(),
                modelB : model.getProximalNode(),
                connectorModel : model
            });

            new LineView({
                modelA : model.getProximalNode(),
                modelB : model.getDistalNode(),
                connectorModel : model
            });


            new LineView({
                modelA : model.getDistalNode(),
                modelB : model.getRightArrow(),
                connectorModel : model
            });


            // create node views.
            var leftArrowView = new ArrowView({
                model : model.getLeftArrow()
            });

            var proximalArrowView = new ArrowView({
                model : model.getProximalNode()
            });

            var distalArrowView = new ArrowView({
                model : model.getDistalNode()
            });

            var rightArrowView = new ArrowView({
                model : model.getRightArrow()
            })

            var horizontalArrowMediator = new HorizontalNodesMediator({
                leftArrowModel : model.getLeftArrow(),
                proximalNodeModel : model.getProximalNode(),
                distalNodeModel : model.getDistalNode(),
                rightArrowModel : model.getRightArrow(),
                connectorModel : model
            });

            new ArrowController({
                orientation : "left",
                model : model.getLeftArrow(),
                mediator : horizontalArrowMediator,
                view : leftArrowView
            });

            new ArrowController({
                orientation : "proximal",
                model : model.getProximalNode(),
                mediator : horizontalArrowMediator,
                view : proximalArrowView
            });

            new ArrowController({
                orientation : "distal",
                model : model.getDistalNode(),
                mediator : horizontalArrowMediator,
                view : distalArrowView
            });

            new ArrowController({
                orientation : "right",
                model : model.getRightArrow(),
                mediator : horizontalArrowMediator,
                view : rightArrowView
            });



            // create line views

            // create node controllers

            //  create mediator for nodes
        }
    }

});