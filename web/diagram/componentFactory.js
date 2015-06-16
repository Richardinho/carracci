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
    'diagram/banner/editor',
    "events/eventsBus"
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
        BannerEditor,
        events
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

        createNote : function (typeModel) {

            var rawNoteModel = this.diagramModel.createNote(typeModel.model.id);
            this.createNoteFromModel(rawNoteModel, typeModel);
            return rawNoteModel.id;

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
        createBanner : function (rawBannerModel) {

            if(!rawBannerModel) {

                rawBannerModel = this.diagramModel.createBanner();

            }

            if(this.bannerEditor) {

                alert("banner already exists");

            } else {

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

                return bannerModel;

            }
        },

        createType : function (json) {



            if(!json) {

                json = this.diagramModel.createType();

            }

            var typeModel = new TypeModel({
                model : json
            });


            var typeView = new TypeView({
                model : typeModel,
            });

            var typeController = new TypeController({
                model : typeModel,
                view : typeView
            });

            this.typeControllerMap[json.id] = typeController;

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

        createDiagram : function (json, name) {

            if(!json) {

                this.diagramModel.currentDiagram =  {
                    name: name,
                    types : {},
                    connectors : {},
                    notes : {}
                }
            } else {

                this.diagramModel.currentDiagram = json;
                // parse diagram and create types and connectors.
                var types = this.diagramModel.currentDiagram.types;

                for(var type in types) {

                    this.createType(types[type]);

                }
                var notes = this.diagramModel.currentDiagram.notes;

                for(var note in notes) {
                    var typeModel = this.typeControllerMap[notes[note].typeId].model;

                    this.createNoteFromModel(notes[note], typeModel);
                }

                events.trigger("createnotes");

                var banner =  this.diagramModel.currentDiagram.banner;

                this.createBanner(banner);

                var connectors = this.diagramModel.currentDiagram.connectors;

                for(var connector in connectors) {

                    if(connectors[connector]['orientation'] === "horizontal") {

                        var mediator = this.createHorizontalConnector(connectors[connector]);

                        var leftNode = connectors[connector]['nodes']['left'];
                        var rightNode = connectors[connector]['nodes']['right'];

                        if(rightNode['attached']) {
                            var boxid = rightNode['attachedBox'];
                            new BoxHorizontalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "right",
                                typeController : this.typeControllerMap[boxid],
                                dontMove : true
                            });
                        }

                        if(leftNode['attached']) {
                            var boxid = leftNode['attachedBox'];

                            new BoxHorizontalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "left",
                                typeController : this.typeControllerMap[boxid],
                                dontMove : true
                            });
                        }

                    } else {

                        var mediator = this.createVerticalConnector (connectors[connector]);

                        var topNode = connectors[connector]['nodes']['top'];
                        var bottomNode = connectors[connector]['nodes']['bottom'];

                        if(topNode['attached']) {
                            var boxid = topNode['attachedBox'];

                            new BoxVerticalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "top",
                                typeController : this.typeControllerMap[boxid],
                                dontMove : true
                            });
                        }

                        if(bottomNode['attached']) {
                            var boxid = bottomNode['attachedBox'];

                            new BoxVerticalNodeMediator({
                                nodeMediator : mediator,
                                nodeOrientation : "bottom",
                                typeController : this.typeControllerMap[boxid],
                                dontMove : true
                            });
                        }

                    }


                }
                /*
                var notes = this.diagramModel.model.notes;

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
                */

            }
        },

        createHorizontalConnector : function (json) {
            if(!json) {

                json = this.diagramModel.createHorizontalConnector();
            }
            var horizontalConnectorModel =  new HorizontalConnectorModel({
                model : json
            });

            var connectorMediator = this.horizontalConnectorFactory.create(horizontalConnectorModel);
            this.connectorMediators[horizontalConnectorModel.model.name] = connectorMediator;
            console.log("connector mediator",connectorMediator);
            return connectorMediator;
        },

        createVerticalConnector : function (json) {

            if(!json) {

                json = this.diagramModel.createVerticalConnector();
            }

            var verticalConnectorModel =  new VerticalConnectorModel({
                model : json
            });
            var connectorMediator = this.verticalConnectorFactory.create(verticalConnectorModel);
            this.connectorMediators[verticalConnectorModel.model.name] = connectorMediator;
            return connectorMediator;
        }



    });

});