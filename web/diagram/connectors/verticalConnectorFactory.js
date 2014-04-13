define([
    'BaseType',
    'diagram/connectors/nodes/nodeView',
    'diagram/connectors/nodes/nodeController',
    'diagram/connectors/nodes/horizontalNodesMediator',
    'diagram/connectors/lines/lineView',
    'diagram/connectors/nodes/nodeModel',
    'diagram/connectors/nodes/verticalNodesMediator'
    ],
        function (
            BaseType,
            NodeView,
            NodeController,
            HorizontalNodesMediator,
            LineView,
            NodeModel,
            VerticalNodesMediator
        ) {

            "use strict";


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
                    var topArrowView = new NodeView({
                        model : topArrowModel
                    });

                    var secondTopNodeView = new NodeView({
                        model : secondTopNodeModel
                    });

                    var secondBottomNodeView = new NodeView({
                        model : secondBottomNodeModel
                    });

                    var bottomArrowView = new NodeView({
                        model : bottomArrowModel
                    })

                    var verticalArrowMediator = new VerticalNodesMediator({
                        topArrowModel : topArrowModel,
                        secondTopNodeModel : secondTopNodeModel,
                        secondBottomNodeModel : secondBottomNodeModel,
                        bottomArrowModel : bottomArrowModel,
                        connectorModel : model
                    });

                    new NodeController({
                        orientation : "top",
                        model : topArrowModel,
                        mediator : verticalArrowMediator,
                        view : topArrowView
                    });

                    new NodeController({
                        orientation : "secondTop",
                        model : secondTopNodeModel,
                        mediator : verticalArrowMediator,
                        view : secondTopNodeView
                    });

                    new NodeController({
                        orientation : "secondBottom",
                        model : secondBottomNodeModel,
                        mediator : verticalArrowMediator,
                        view : secondBottomNodeView
                    });

                    new NodeController({
                        orientation : "bottom",
                        model : bottomArrowModel,
                        mediator : verticalArrowMediator,
                        view : bottomArrowView
                    });

                    return verticalArrowMediator;

                }
            }

        });