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

            return BaseType.extend(/** @lends MenuController.prototype */{

                /**
                 *
                 *   controller for menu. Handles clicks on menu items and delegates to
                 *   DiagramController the carrying out of commands.
                 *
                 * @augments external:BaseType
                 * @constructs
                 */
                initialize : function (options) {

                    this.diagramController = options.diagramController;

                    this.view = new View({

                        el : $('#menu')
                    });

                    this.view.render(this.componentModel.diagram);

                    this.view.$el.on("click", "[data-command]", $.proxy(this.handleClick, this));

                    this.view.render(this.componentModel.diagram);
                },
                //  todo: check what this does
                componentModel : {

                   left    : 0,

                   top     : 0,

                   diagram : false

                },

                /**
                 *  click handler when user clicks on a menu item. works out command to
                 *  be carried out and sends this command to DiagramController to be executed
                 *  then renders diagram view
                 */
                handleClick : function (event) {

                    //  works out command from data stored in DOM on element
                    var dataCommand = $(event.currentTarget).data("command");
                    var args = dataCommand.split(/\s/);

                    this.diagramController.command({
                        command : args.shift(),
                        args : args
                    });
                    //  todo: should this be done here?
                    this.view.render(this.componentModel.diagram);
                },
								createDiagram : function(diagramName) {
								    this.diagramController.command({
                        command : 'load',
                        args :[diagramName] 
                    });
                    //  todo: should this be done here?
                    this.view.render(this.componentModel.diagram);
									

								}
            });
        });
