define(['BaseType',
        'diagram/connectors/nodes/arrowView',
        'diagram/connectors/nodes/arrowController',
        'diagram/connectors/nodes/horizontalNodesMediator',
        'diagram/connectors/lines/lineView',
        'diagram/connectors/nodes/nodeModel',
        'diagram/connectors/nodes/verticalNodesMediator'],
        function (
        BaseType,
        ArrowView,
        ArrowController,
        HorizontalNodesMediator,
        LineView,
        NodeModel,
        VerticalNodesMediator) {



    return {

        create : function (verticalConnectorModel) {


            var model = verticalConnectorModel;

            var topArrowModel = new NodeModel({
                model : model.getTopArrow()
            });

            var secondTopNodeModel = new NodeModel({
                model : model.getSecondTopNode()
            });

            var secondBottomNodeModel = new NodeModel({
                model : model.getSecondBottomNode()
            });

            var bottomArrowModel = new NodeModel({
                model : model.getBottomArrow()
            });


            // create lines first so they appear below nodes. (crude, I know!)
            new LineView({
                modelA : topArrowModel,
                modelB : secondTopNodeModel,
                connectorModel : model
            });

            new LineView({
                modelA : secondTopNodeModel,
                modelB : secondBottomNodeModel,
                connectorModel : model
            });

            new LineView({
                modelA :secondBottomNodeModel,
                modelB :bottomArrowModel,
                connectorModel : model
            });

            // create node views.
            var topArrowView = new ArrowView({
                model : topArrowModel
            });

            var secondTopArrowView = new ArrowView({
                model : secondTopNodeModel
            });

            var secondBottomArrowView = new ArrowView({
                model : secondBottomNodeModel
            });

            var bottomArrowView = new ArrowView({
                model : bottomArrowModel
            })

            var verticalArrowMediator = new VerticalNodesMediator({
                topArrowModel : topArrowModel,
                secondTopNodeModel : secondTopNodeModel,
                secondBottomNodeModel : secondBottomNodeModel,
                bottomArrowModel : bottomArrowModel,
                connectorModel : model
            });

            new ArrowController({
                orientation : "top",
                model : topArrowModel,
                mediator : verticalArrowMediator,
                view : topArrowView
            });

            new ArrowController({
                orientation : "secondTop",
                model : secondTopNodeModel,
                mediator : verticalArrowMediator,
                view : secondTopArrowView
            });

            new ArrowController({
                orientation : "secondBottom",
                model : secondBottomNodeModel,
                mediator : verticalArrowMediator,
                view : secondBottomArrowView
            });

            new ArrowController({
                orientation : "bottom",
                model : bottomArrowModel,
                mediator : verticalArrowMediator,
                view : bottomArrowView
            });

            return verticalArrowMediator;

        }
    }

});