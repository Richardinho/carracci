define([
    'BaseType',
    'diagram/types/typeView',
    'diagram/types/typeController',
    'diagram/types/typeModel',
    "diagram/connectors/horizontalConnectorModel",
    "diagram/connectors/verticalConnectorModel",
    "diagram/boxHorizontalNodeMediator",
    "diagram/boxVerticalNodeMediator",
    "underscore",
    "diagram/banner/bannerView",
    "diagram/banner/bannerController",
    "diagram/banner/bannerModel",
    "diagram/note/noteView",
    "diagram/note/noteModel",
    "diagram/note/noteController",
    "diagram/note/noteLineView",
    'diagram/banner/editor'
    ],
    function (
    BaseType,
    TypeView,
    TypeController,
    TypeModel,
    HorizontalConnectorModel,
    VerticalConnectorModel,
    BoxHorizontalNodeMediator,
    BoxVerticalNodeMediator,
    _,
    BannerView,
    BannerController,
    BannerModel,
    NoteView,
    NoteModel,
    NoteController,
    NoteLineView,
    BannerEditor
    )
    {

    /*
        this is a layer in front of the model. it delegates creation and setting of properties
        to the model, but it creates wrapper objects which make it easier for clients to interact
        with the model

        It also handles the destruction of objects. It should probably be called the component manager
        rather than factory.
    */


    return BaseType.extend({
        // question: pass dependencies in through options or in define function?
        initialize : function (options) {

            this.diagramModel = options.diagramModel;
            this.horizontalConnectorFactory = options.horizontalConnectorFactory;
            this.verticalConnectorFactory = options.verticalConnectorFactory;

            this.typeControllerMap = {};
            this.connectorMediators = {};
            this.banner = {};
        },

        createNote : function (diagram, typeModel) {

            var rawNoteModel = this.diagramModel.createNote( diagram  );
            this.createNoteFromModel(rawNoteModel, typeModel);

        },

        deleteNote : function (name) {

            var diagramName = this.diagramModel.currentDiagram.name;

            this.diagramModel.model
                .children['diagrams']
                .children[diagramName]
                .children['notes'].deleteChild(name);

        },

        createNoteFromModel : function (rawNoteModel, typeModel) {

            var model = new NoteModel({
                model : rawNoteModel
            });


            // this connects the note to a type
            new NoteLineView({
                model : model,
                typeModel : typeModel
            });

            var view = new NoteView({

                model : model
            });

            new NoteController({
                model : model,
                view : view
            });


        },

        //  banner should be a 'singleton'
        createBanner : function (diagram, bannerJSON) {

            if(this.bannerEditor) {

                alert("banner already exists");

            } else {

                var rawBannerModel = this.diagramModel.createBanner( diagram , {
                    title : { text : "default title" },
                    description : "default descripiton",
                    author : "default author",
                    width  : "300",
                    created : "richard",
                    xCood : "0",
                    yCood : "0"
                });

                // for meantime just use bannerJSON for 'model' in view
                var bannerModel = new BannerModel({
                    model : rawBannerModel
                });

                var bannerView = new BannerView({

                    model : bannerModel
                });

                var bannerController = new BannerController({

                    view : bannerView,
                    model : bannerModel

                });

                this.bannerEditor = new BannerEditor({

                    model : bannerModel
                });

                this.bannerEditor.open();

            }

        },

        deleteBanner : function () {

            this.diagramModel.model
                .children['diagrams']
                .children[this.diagramModel.currentDiagram.name]
                .deleteChild('banner')

        },

        createType : function ( diagram ) {

            var rawTypeModel = this.diagramModel.createType( diagram );

            var typeModel = new TypeModel({
                diagramModel : this.diagramModel.model,
                model : rawTypeModel
            });

            var typeView = new TypeView({
                model : typeModel,
            });

            var typeController = new TypeController({
                model : typeModel,
                view : typeView
            });

            //this.typeControllerMap[typeName] = typeController;

        },

        deleteType : function (type) {

            //this.typeControllerMap[type].destroy();

            var diagramName = this.diagramModel.currentDiagram.name;

            this.diagramModel.model
                    .children['diagrams']
                    .children[diagramName]
                    .children['types']
                    .deleteChild(type);

        },



        deleteDiagram : function (diagramName) {

            _.each(this.typeControllerMap, function (typeController, key) {
                this.deleteType(key);
            },this);
            _.each(this.connectorMediators, function (mediator, key) {
                this.deleteConnector(key);
            },this);

            this.diagramModel.deleteDiagram(diagramName);
        },

        createDiagram : function (diagramName, node) {

            this.diagramModel.createDiagram(diagramName, node);

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

                    this.typeControllerMap[typeModel.getName()] = tc;

                }

                var notes = this.diagramModel.model
                                .children['diagrams']
                                .children[diagramName]
                                .children['notes']
                                .children;

                for(var note in notes) {


                    this.createNoteFromModel(notes[note]);

                }

                //todo: create banner from json

                var banner =  this.diagramModel.model.children['diagrams']
                                             .children[diagramName]
                                             .children['banner'];


                var bannerJSON = this.diagramModel.model.children['diagrams'].children[diagramName].children.banner.unwrap();

                this.createBanner(diagramName, bannerJSON);


                var connectors = this.diagramModel.getConnectors(diagramName);

                for(var connector in connectors) {

                    if(connectors[connector].children['orientation'].value === "horizontal") {

                        var hcm =  new HorizontalConnectorModel({
                            model : connectors[connector]
                        });
                        var mediator = this.horizontalConnectorFactory.create(hcm);

                        this.connectorMediators[hcm.model.name] = mediator;

                        // check left and right nodes to see if they need to be attached.
                        var leftNode = connectors[connector].children['nodes'].children['left'];
                        var rightNode = connectors[connector].children['nodes'].children['right'];

                        if(rightNode.children['attached'].value) {
                            var box = rightNode.children['attachedBox'].value

                            new BoxHorizontalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "right",
                                typeController : this.typeControllerMap[box],
                                dontMove : true
                            });
                        }

                        if(leftNode.children['attached'].value) {
                            var box = leftNode.children['attachedBox'].value

                            new BoxHorizontalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "left",
                                typeController : this.typeControllerMap[box],
                                dontMove : true
                            });
                        }

                    } else {

                        var vcm =  new VerticalConnectorModel({
                            model : connectors[connector]
                        });

                        var mediator = this.verticalConnectorFactory.create(vcm);

                        this.connectorMediators[vcm.model.name] = mediator;

                        var topNode = connectors[connector].children['nodes'].children['top'];
                        var bottomNode = connectors[connector].children['nodes'].children['bottom'];

                        if(topNode.children['attached'].value) {
                            var box = topNode.children['attachedBox'].value

                            new BoxVerticalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "top",
                                typeController : this.typeControllerMap[box],
                                dontMove : true
                            });
                        }
                        if(bottomNode.children['attached'].value) {
                            var box = bottomNode.children['attachedBox'].value

                            new BoxVerticalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "bottom",
                                typeController : this.typeControllerMap[box],
                                dontMove : true
                            });
                        }
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
            var connectorMediator = this.horizontalConnectorFactory.create(horizontalConnectorModel);
            this.connectorMediators[horizontalConnectorModel.model.name] = connectorMediator;
        },

        createVerticalConnector : function (diagram) {
            var verticalConnectorModel = this.diagramModel.createVerticalConnector(diagram);
            var connectorMediator = this.verticalConnectorFactory.create(verticalConnectorModel);
            this.connectorMediators[verticalConnectorModel.model.name] = connectorMediator;
        },

        deleteConnector : function (connectorId) {

            var diagramName = this.diagramModel.currentDiagram.name;

            this.diagramModel.model
                    .children['diagrams']
                    .children[diagramName]
                    .children['connectors'].deleteChild(connectorId);
        }

    });

});