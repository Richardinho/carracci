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

     "use strict";

     return BaseType.extend(/** @lends DiagramController.prototype */ {

        /**
        *
        * @augments external:BaseType
        * @constructs
        */
        initialize : function (options) {

            this.diagramModel = options.diagramModel;

            this.componentFactory = options.componentFactory;

            this.mainMenu = new MainMenu({

                diagramController : this
            });
						

            this.widgetManager = new WidgetManager({

                diagramController : this
            });

            eventsBus.on("dblclick:type", this.showTypeEditor, this);
            eventsBus.on("dblclick:note", this.showNoteEditor, this);
            eventsBus.on("dblclick:connector", this.showConnectorEditor, this);
            eventsBus.on("dblclick:banner", this.showBannerEditor, this);

        },

        showTypeEditor : function (typeModel) {

            this.widgetManager.showTypeEditor(typeModel);

        },

				setDiagram : function(diagramName) {
					this.mainMenu.createDiagram(diagramName);					
				},


        showNoteEditor : function (noteModel) {

            this.widgetManager.showNoteEditor(noteModel);

        },

        showConnectorEditor : function (connectorModel) {

            this.widgetManager.showConnectorEditor(connectorModel);
        },

        showBannerEditor : function (bannerModel) {

            this.widgetManager.showBannerEditor(bannerModel);

        },

        command : function (commandObj) {

            var command = commandObj.command,
                args = commandObj.args;

            if(command === "create" && args[0] === "type") {
                this.componentFactory.createType();
            }

            if(command === "create" && args[0] === "diagram") {
                // todo: create my own prompt box
                var diagramName = window.prompt("what is the name of your diagram?");

                this.componentFactory.createDiagram(null,diagramName);

                this.mainMenu.componentModel.diagram = true;

            }

            if (command === "create" && args[0] === "banner") {

                var model = this.componentFactory.createBanner();

                this.widgetManager.showBannerEditor(model);

            }

            if (command === "create" && args[0] === "connector") {

                if(args[1] === "horizontal") {

                    this.componentFactory.createHorizontalConnector();
                }
                else {

                    this.componentFactory.createVerticalConnector();
                }
            }

            if(command === "showjson") {

                this.widgetManager.showJson(this.diagramModel.currentDiagram);

            }

            if (command === "delete" && args[0] === "diagram") {
                this.mainMenu.componentModel.diagram = false;
                eventsBus.trigger("destroy");
                delete this.diagramModel.currentDiagram;

            }

            if(command === "load") {
                this.mainMenu.componentModel.diagram = true;
                this.load(args[0]);

            }
						if(command === 'export') {
							this.export();
						}


        },


        createNote : function (typeModel) {

            return this.componentFactory.createNote(typeModel);
        },

        deleteNote : function (id) {

            this.diagramModel.deleteNote(id);
        },

        deleteType : function (id) {

            this.diagramModel.deleteType(id);

        },

        deleteConnector : function (connectorId) {

            this.diagramModel.deleteConnector(connectorId);
        },
        //  todo: this not hooked up yet.
        export : function () {
            //var format = arguments[0];
						var format = 'png';

            switch (format) {

            case "jpeg":
                console.log("jpeg not yet supported");
            break;
            case "png":

                var canvas = document.createElement('canvas');
                canvas.width = 1000;
                canvas.height = 800;
                var svg = $('<div>').append($('svg').clone()).html();

                canvg(canvas,svg );

                var dataURL = canvas.toDataURL();

                window.open(dataURL,'mywindow');
            break;

            default :

                return Promise.reject(format + " is not supported");
            }
            return Promise.resolve("exported to " + format);
        },


        show : function () {
            //todo shouldn't do presentation here
            return "<pre>" + this.diagramModel.toJSON() + "</pre>";
        },

        bannerExists : function () {

            return this.diagramModel.bannerExists();
        },


        /*
            loads diagram by name. Throws an error if there is no such diagram currently loaded.
        */
        load : function (diagramname) {

            var promise = Promise.resolve($.ajax({

                url : 'diagrams/' + diagramname +'.json',
                dataType : 'json'
            }));

            promise.then($.proxy(function (data) {

                this.componentFactory.createDiagram(data);


            }, this)).catch(function (err) {
                //  todo : display some more useful error to user.
                console.log(err);
            });

        }
    });
});
