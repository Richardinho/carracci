define(['core/BaseType',
        'diagram/connectors/nodes/arrowView',
        'diagram/connectors/nodes/arrowController',
        'diagram/connectors/nodes/horizontalNodesMediator',
        'diagram/connectors/lines/lineView',
        'diagram/connectors/nodes/nodeModel'],
        function (
        BaseType,
        ArrowView,
        ArrowController,
        HorizontalNodesMediator,
        LineView,
        NodeModel) {



    return {

        create : function (horizontalConnectorModel) {


            var model = horizontalConnectorModel;


            // create lines first so they appear below nodes. (crude, I know!)
            new LineView({
                modelA : new NodeModel({
                    model : model.getLeftArrow()
                }),
                modelB : new NodeModel({
                    model : model.getProximalNode()
                }),
                connectorModel : model
            });

            new LineView({
                modelA : new NodeModel({
                    model : model.getProximalNode()
                }),
                modelB : new NodeModel({
                    model : model.getDistalNode()
                }),
                connectorModel : model
            });

            new LineView({
                modelA : new NodeModel({
                    model : model.getDistalNode()
                }),
                modelB : new NodeModel({
                    model : model.getRightArrow()
                }),
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