define([
    'BaseType',
    'diagram/connectors/nodes/nodeView',
    'diagram/connectors/nodes/nodeController',
    'diagram/connectors/nodes/horizontalNodesMediator',
    'diagram/connectors/lines/lineView',
    'diagram/connectors/nodes/nodeModel'
    ],
        function (
            BaseType,
            ArrowView,
            NodeController,
            HorizontalNodesMediator,
            LineView,
            NodeModel
            ) {

                "use strict";


                return {

                    create : function (horizontalConnectorModel) {

                        var model = horizontalConnectorModel;

                        var leftArrowModel = new NodeModel({
                            model : model.getLeftArrow()
                        });

                        var proximalNodeModel = new NodeModel({
                            model : model.getProximalNode()
                        });

                        var distalNodeModel = new NodeModel({
                            model : model.getDistalNode()
                        });

                        var rightArrowModel = new NodeModel({
                            model : model.getRightArrow()
                        });


                        // create lines first so they appear below nodes. (crude, I know!)
                        new LineView({
                            modelA : leftArrowModel,
                            modelB : proximalNodeModel,
                            connectorModel : model
                        });

                        new LineView({
                            modelA : proximalNodeModel,
                            modelB : distalNodeModel,
                            connectorModel : model
                        });

                        new LineView({
                            modelA :distalNodeModel,
                            modelB :rightArrowModel,
                            connectorModel : model
                        });

                        // create node views.
                        var leftArrowView = new ArrowView({
                            model : leftArrowModel
                        });

                        var proximalArrowView = new ArrowView({
                            model : proximalNodeModel
                        });

                        var distalArrowView = new ArrowView({
                            model : distalNodeModel
                        });

                        var rightArrowView = new ArrowView({
                            model : rightArrowModel
                        })

                        var horizontalArrowMediator = new HorizontalNodesMediator({
                            leftArrowModel : leftArrowModel,
                            proximalNodeModel : proximalNodeModel,
                            distalNodeModel : distalNodeModel,
                            rightArrowModel : rightArrowModel,
                            connectorModel : model
                        });

                        new NodeController({
                            orientation : "left",
                            model : leftArrowModel,
                            mediator : horizontalArrowMediator,
                            view : leftArrowView
                        });

                        new NodeController({
                            orientation : "proximal",
                            model : proximalNodeModel,
                            mediator : horizontalArrowMediator,
                            view : proximalArrowView
                        });

                        new NodeController({
                            orientation : "distal",
                            model : distalNodeModel,
                            mediator : horizontalArrowMediator,
                            view : distalArrowView
                        });

                        new NodeController({
                            orientation : "right",
                            model : rightArrowModel,
                            mediator : horizontalArrowMediator,
                            view : rightArrowView
                        });

                        return  horizontalArrowMediator;

                    }
                }

            });