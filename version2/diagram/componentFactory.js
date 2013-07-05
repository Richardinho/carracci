define([
    'core/BaseType',
    'diagram/types/typeView',
    'diagram/types/typeController',
    'diagram/types/typeModel',
    "diagram/connectors/horizontalConnectorModel",
    "diagram/boxHorizontalNodeMediator"
    ],
    function (
    BaseType,
    TypeView,
    TypeController,
    TypeModel,
    HorizontalConnectorModel,
    BoxHorizontalNodeMediator
    )
    {

    /*
        this is a layer in front of the model. it delegates creation and setting of properties
        to the model, but it creates wrapper objects which make it easier for clients to interact
        with the model
    */

    // should I keep track of these objects and destroy them later, or will they be automatically garbage collected?
    return BaseType.extend({
        // question: pass dependencies in through options or in define function?
        initialize : function (options) {

            this.diagramModel = options.diagramModel;
            this.horizontalConnectorFactory = options.horizontalConnectorFactory;
            this.verticalConnectorFactory = options.verticalConnectorFactory;
        },

        createType : function (diagram, typeName) {

            var rawTypeModel = this.diagramModel.createType( diagram, typeName );

            var typeModel = new TypeModel({
                diagramModel : this.diagramModel.model,
                model : rawTypeModel
            });

            var typeView = new TypeView({
                model : typeModel,
            });

            new TypeController({
                model : typeModel,
                view : typeView
            });
        },

        createDiagram : function (diagramName, node) {

            this.diagramModel.createDiagram(diagramName, node);
            var typeControllerMap = {}
            //  if  we are passing in already created json
            if(node) {
                // parse diagram and create types and connectors.
                var types = this.diagramModel.model
                                .children['diagrams']
                                .children[diagramName]
                                .children['types']
                                .children;

                for(var type in types) {

                    var typeModel = new TypeModel({
                        diagramModel : this.diagramModel.model,
                        model : types[type]
                    });

                    var typeView = new TypeView({
                        model : typeModel,
                    });

                    var tc = new TypeController({
                        model : typeModel,
                        view : typeView
                    });

                    typeControllerMap[typeModel.getName()] = tc;

                }

                var connectors = this.diagramModel.getConnectors(diagramName);

                for(var connector in connectors) {

                    if(connectors[connector].children['orientation'].value === "horizontal") {

                        var hcm =  new HorizontalConnectorModel({
                            model : connectors[connector]
                        });
                        var mediator = this.horizontalConnectorFactory.create(hcm);

                        // check left and right nodes to see if they need to be attached.
                        var leftNode = connectors[connector].children['nodes'].children['left'];

                        if(leftNode.children['attached'].value) {

                            console.log("attach left node", leftNode.children['attached'])
                        }

                        var rightNode = connectors[connector].children['nodes'].children['right'];

                        if(rightNode.children['attached'].value) {
                            var box = rightNode.children['attachedBox'].value

                            new BoxHorizontalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "right",
                                typeController : typeControllerMap[box],
                                dontMove : true
                            });
                        }

                        if(leftNode.children['attached'].value) {
                            var box = leftNode.children['attachedBox'].value

                            new BoxHorizontalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "left",
                                typeController : typeControllerMap[box],
                                dontMove : true
                            });
                        }

                    } else {

                       // this.verticalConnectorFactory.create(connectors[connector])
                    }
                }

            }
        },

        createProperty : function(diagram, type, propertyName) {
            this.diagramModel.createProperty(diagram, type, propertyName);
        },

        createMethod : function (diagram, type, methodName) {
            this.diagramModel.createMethod(diagram, type, methodName);
        },

        createHorizontalConnector : function (diagram) {
            var horizontalConnectorModel = this.diagramModel.createHorizontalConnector(diagram);
            this.horizontalConnectorFactory.create(horizontalConnectorModel);
        },

        createVerticalConnector : function (diagram) {
            var verticalConnectorModel = this.diagramModel.createVerticalConnector(diagram);
            this.verticalConnectorFactory.create(verticalConnectorModel)
        }

    });

});