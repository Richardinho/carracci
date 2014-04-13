define([
    'BaseType',
    'canvg',
    'modalEditor/controller',
    'jquery',
    'menu/controller',
    'diagram/banner/editor',
    'diagram/types/editor',
    'diagram/show/view',
    'diagram/widgetManager',
    'events/eventsBus'

    ],function (
        BaseType,
        canvg,
        ModalEditor,
        $,
        MainMenu,
        BannerEditor,
        TypeEditor,
        Show,
        WidgetManager,
        eventsBus
        ) {

    /*
        this type has the role of supplying commands which are called by the editor.
        It delegates to the diagram model for creating the model, and to the component factory
        for creating wrapper objects. It also keeps track through the context path of the users
        current place within the model.
     */

    return BaseType.extend({

        initialize : function (options) {

            this.diagramModel = options.diagramModel;

            this.contextPath = [];
            this.componentFactory = options.componentFactory;
            this.selected = [];

            this.mainMenu = new MainMenu({

                diagramController : this
            });


            this.widgetManager = new WidgetManager({

                diagramController : this
            });

            eventsBus.on("dblclick:type", this.showTypeEditor, this);
            eventsBus.on("dblclick:note", this.showNoteEditor, this);

        },

        showTypeEditor : function (typeModel) {

            this.widgetManager.showTypeEditor(typeModel);

        },

        showNoteEditor : function (noteModel) {

            this.widgetManager.showNoteEditor(noteModel);

        },
        // remove, use, create, export, set, con, show, load, help

        // for editing

        createBanner : function(bannerModel) {

            this.componentFactory.createBanner(this.contextPath[1], bannerModel);

        },

        command : function (commandObj) {

            var command = commandObj.command,
                args = commandObj.args,
                diagramName = this.contextPath[1];

            if(command === "create" && args[0] === "type") {
                this.componentFactory.createType(diagramName);
            }

            if(command === "create" && args[0] === "diagram") {

                var diagramName = window.prompt("what is the name of your diagram?");

                this.componentFactory.createDiagram(diagramName);

                this.use('diagram', diagramName);
            }

            if (command === "create" && args[0] === "banner") {

                //this.bannerEditor.open();

                this.componentFactory.createBanner(diagramName);

            }

            if (command === "create" && args[0] === "connector") {

                if(args[1] === "horizontal") {

                    console.log("create horizontal conenctor");
                    this.componentFactory.createHorizontalConnector(diagramName);
                }
                else {

                    console.log("create vertical conncetor");
                    this.componentFactory.createVerticalConnector(diagramName);
                }

            }

        },

        removeBanner : function (bannerModel) {

            this.componentFactory.removeBanner(this.contextPath[1], bannerModel);

        },

        createNote : function (typeModel) {

            this.componentFactory.createNote(this.contextPath[1], typeModel);
        },

        deleteNote : function (name) {

            this.componentFactory.deleteNote(name);

        },


        /* manages the contextPath, extending it or reducing it as needed */
        use : function () {
            //todo: test that each artifact actually exists.
            var artifact = arguments[0];

            switch (artifact) {

            case "diagram" :

                if(arguments.length === 2) {
                    if(this.contextPath.length !== 0) {

                        return Promise.reject("Cannot navigate to diagram context from this point in context tree");
                    }
                    if(this.diagramModel.checkDiagramExists(arguments[1])) {
                        this.contextPath.push("diagram");
                        this.contextPath.push(arguments[1]);
                    }  else {

                        return Promise.reject("diagram does not exist");
                    }
                    return Promise.resolve("context path has been updated: " +  this.contextPath);

                } else {
                    // we want to got towards the root of the context tree
                    if(this.contextPath.length > 2) {
                        this.contextPath = this.contextPath.slice(0,2);
                        return Promise.resolve("context path updated " +  this.contextPath);
                    } else {
                        return Promise.reject("You must supply an artifact type and the name of it");
                    }
                }
                break;
            case "type" :
                if(arguments.length === 2) {

                    if(this.contextPath.length !== 2) {

                        return Promise.reject("Context path is in incorrect state for this action");
                    }

                    if(this.diagramModel.checkTypeExists(
                        this.contextPath[1],
                        arguments[1]
                    )){

                        this.contextPath.push("type");
                        this.contextPath.push(arguments[1])

                        return Promise.resolve("context path has been updated: " + this.contextPath);

                    }  else {

                        return Promise.reject("this artifact does not exist" + arguments[1]);

                    }
                } else if(this.contextPath.length > 4) {

                    this.contextPath = this.contextPath.slice(0,4);
                    return Promise.resolve("context path has been updated: " + this.contextPath);
                } else {

                     return Promise.reject("Context path is in incorrect state for this action");
                }
                break;
            case "property":

                if(arguments.length === 2) {
                    if(this.contextPath.length !== 4) {
                        return Promise.reject("Context path is in incorrect state for this action");
                    }
                    if( this.diagramModel.checkPropertyExists(
                        this.contextPath[1],
                        this.contextPath[3],
                        arguments[1]
                    )) {

                        this.contextPath.push("property");
                        this.contextPath.push(arguments[1]);
                        return Promise.resolve("context path has been updated: " + this.contextPath);

                    } else {
                        return Promise.reject("This property does not exist");
                    }
                } else {

                    return Promise.reject("You must supply type 'property' and a property name");
                }
                break;
            case "method" :
                if(arguments.length === 2) {
                    if(this.contextPath.length !== 4) {
                        return Promise.reject("Context path is in incorrect state for this action");
                    }
                    if( this.diagramModel.checkMethodExists(
                                            this.contextPath[1],
                                            this.contextPath[3],
                                            arguments[1]
                                        )) {

                        this.contextPath.push("method");
                        this.contextPath.push(arguments[1]);
                        return Promise.resolve("context path has been updated: " + this.contextPath);
                    } else {
                        return Promise.reject("This method does not exist");
                    }
                } else {

                    return Promise.reject("You must supply type 'method' and a method name");
                }
                break;
            default :
                throw {
                    name : "UnknownArtifactError",
                    message : artifact + " not known"
                }
            }
        },

        diagramExists : function() {

            return  this.contextPath[1] && this.diagramModel.checkDiagramExists(this.contextPath[1]);
        },


        export : function () {

            var format = arguments[0];

            switch (format) {

            case "jpeg":
                console.log("jpeg not yet supported")
            break;
            case "png":

                var canvas = document.createElement('canvas');
                canvas.width = 1000;
                canvas.height = 800;
                var svg = $('<div>').append($('svg').clone()).html();

                canvg(canvas,svg );

                var dataURL = canvas.toDataURL()

                window.open(dataURL,'mywindow')
            break;

            default :

                return Promise.reject(format + " is not supported");
            }
            return Promise.resolve("exported to " + format);
        },

        con : function () {

            return this.contextPath.join(" ");
        },

        show : function () {
            //todo shouldn't do presentation here
            return "<pre>" + this.diagramModel.toJSON() + "</pre>"
        },

        bannerExists : function () {

            return this.diagramModel.bannerExists();
        },

        typeExists : function(type) {

            return this.diagramModel.checkTypeExists(this.contextPath[1],type);
        },

        /*
            loads diagram by name. Throws an error if there is no such diagram currently loaded.
        */
        load : function (diagram) {
            // check if a diagram is currently loaded.

            if(!this.diagramModel.currentDiagram) {
                //  get json from server
                var that = this;

                var promise = Promise.resolve($.getJSON('/diagrams/' + diagram +'.json'));

                return promise.then(function (data) {

                    that.componentFactory.createDiagram(diagram, data);

                    that.use('diagram', diagram);

                    return "diagram was created";

                }, function (err) {

                    return "diagram not found";

                });

            } else {

                return Promise.reject('You already have a loaded diagram');
            }
        }
    });
});