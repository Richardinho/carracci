define(["core/BaseType","jquery"],function (BaseType, $) {

    return BaseType.extend({

        initialize: function () {

            this.commands = {};
        },

        // command name must be name of method on context
        addCommand : function (context, commandName) {

            this.commands[commandName] = {
                context : context,
                command : context[commandName]
            };
        },

        /*
            commands has to be an array of function names
            clearly, care has to be taken not to try and
            add two commands of the same name.
        */
        addCommands : function (context, commands) {

            for (var i = 0; i < commands.length; i++) {
                this.addCommand(context, commands[i]);
            }
        },

        processCommand : function (command, args) {

            var deferred = $.Deferred();

            try {

                if(!this.commands[command]) {

                    throw {
                        name : "CommandDoesNotExistException",
                        message : command + " does not exist"
                    }
                }

                var commandObj = this.commands[command];


                var result = commandObj.command.apply(commandObj.context, args);

                if(result && result.resolve) {
                    // if result has a resolve method we assume that it is deferred object.
                    return result;

                } else if(typeof result === "string") {

                    deferred.resolve({
                        message : result
                    });
                    return deferred;

                } else {

                    deferred.resolve({});
                    return deferred;

                }

            } catch(exception) {
                var errorObject = {}

                if(exception.name) {
                    errorObject.name = exception.name;
                }
                if(exception.message) {
                    errorObject.message = exception.message;
                }

                deferred.resolve(errorObject);
                return deferred;
            }

        }

    });
});