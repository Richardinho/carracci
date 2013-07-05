define(["core/BaseType", "jquery"],function (BaseType, $) {

    return BaseType.extend({

        initialize : function (options) {

            this.keymap = options.keymap;
            this.model = options.model;
            this.diagramModel = options.diagramModel;
            this.view = options.view;
            this.commands = options.commands;

            var that = this;

            $(document).keydown(function (event) {

                // return key
                if(event.keyCode === 13) {
                    that.enterCommand();
                }

                //  backspace
                else if(event.keyCode === 8) {

                    that.model.backspace();
                }
                //  alt key
                else if(that.excludeKey(event.keyCode)) {
                    return true; // don't swallow event
                }

                else {
                    var char = that.getChar(event);
                    that.model.appendChar(char);
                }

                return false;

            });

        },

        enterCommand : function () {

            // this should get the command from the view
            var commandArray = this.parseCommand(this.view.getCurrentCommand());

            // handle any commands that pertain to the editor before
            // passing onto the commands object.

            var that = this;

            if(!this.handleEditorCommand(commandArray)) {

                var ca = commandArray.slice(0);

                var command = commandArray.shift();

                $.when(
                    /*  all commands must return a deferred object with resolved data of the form

                        {
                            error : true|undefined,
                            message : ""|undefined,
                            name : "" | undefined  // for errors

                        }

                    */

                    this.commands.processCommand(command, commandArray)

                    ).then( function(response){
                        // handle response from command
                        that.handleResponse(response, ca);

                    });


            }

            /* it should parse it to see if its an editor related command (e.g. min )
            or if it should be passed onto the diagram controller
            */

            //this.model.update();

        },

        formatError : function (error) {
            var result = []

            if(error.name) {
                result.push(error.name);
            }
            if(error.message) {
                result.push(error.message);
            }
            return result.join(":")
        },

        /*
            should take response from executing a command and update the editor.
        */
        handleResponse : function (response, commandArray) {

            var oldCommand;
            var message;

            if(response.error) {

                message = this.formatError(response);

            } else if(response.message) {

                message = response.message;
            }
            oldCommand = commandArray.join(" ");
            this.model.update(oldCommand, message);

        },

        handleEditorCommand : function (commandArray) {
            var command = commandArray[0];

            switch(command) {

            case "min" :
                this.minimize();
                return true;
                //this.handleResponse({}, commandArray);
            case "max" :
                this.maximize();
                return true;
               // this.handleResponse({}, commandArray);
            default :
                return false;
            }
        },

        minimize : function () {

            this.model.setMinHeight();
        },

        maximize : function () {

            this.model.setMaxHeight();
        },

        parseCommand : function (command) {
            return command.split(/[\s]+/);
        },
        // these keys should do their default behaviour.
        excludeKey : function (keyCode) {
            if(

                keyCode === 116 || // f5
                keyCode == 16 // shift
            ) {
                return true;
            }

        },

        getChar : function (event) {

            var prefix = event.shiftKey ? "s" : "_";

            var char = this.keymap[prefix + event.keyCode];

            if (char !== undefined ) {
                return char;
            } else {
                return "";
            }

        }
    });
});