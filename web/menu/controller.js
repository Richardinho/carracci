define([
    "BaseType",
    "menu/view"
    ], function (
        BaseType,
        View
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function (options) {

                    this.diagramController = options.diagramController;
                    this.model = this.diagramController.diagramModel;


                    this.view = new View({

                        el : $('#menu')
                    });

                    this.view.render(this.componentModel.diagram);

                    this.view.$el.on("click", "[data-command]", $.proxy(this.handleClick, this));

                    this.model.on("create", this.handleCreateDiagram, this);
                },

                componentModel : {

                   left    : 0,
                   top     : 0,
                   diagram : false

                },

                handleCreateDiagram : function () {

                    console.log("create diagram apple", arguments);

                    this.componentModel.diagram = true;

                    this.view.render(this.componentModel.diagram);


                },


                handleClick : function (event) {

                    var dataCommand = $(event.currentTarget).data("command");

                    var args = dataCommand.split(/\s/);

                    this.diagramController.command({
                        command : args.shift(),
                        args : args
                    });
                }

            });


        });