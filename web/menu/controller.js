define([
    "BaseType",
    "menu/view",
    "events/eventsBus"
    ], function (
        BaseType,
        View,
        eventsBus
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function (options) {
                    console.log("initialize menu controller");
                    this.diagramController = options.diagramController;

                    this.view = new View({

                        el : $('#menu')
                    });

                    this.view.render(this.componentModel.diagram);

                    this.view.$el.on("click", "[data-command]", $.proxy(this.handleClick, this));

                    this.view.render(this.componentModel.diagram);
                },

                componentModel : {

                   left    : 0,

                   top     : 0,

                   diagram : false

                },


                handleClick : function (event) {
                    console.log("handle click on menu");

                    var dataCommand = $(event.currentTarget).data("command");

                    var args = dataCommand.split(/\s/);

                    this.diagramController.command({
                        command : args.shift(),
                        args : args
                    });

                    this.view.render(this.componentModel.diagram);
                }

            });


        });