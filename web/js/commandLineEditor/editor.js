define(['BaseType'], function (BaseType) {


    /*  take a command and parse it into an array of tokens */

    return BaseType.extend({

        initialize : function (options) {

            this.commands = options.commands;
        },

        process : function (command) {

            var returnVal = this.dispatch(this.parse(command));

            if(returnVal) {
                return returnVal;
            }
        },

        parse : function (command) {

            return command.split(/[\s]+/);
        },

        dispatch : function (commandArray) {

            var verb = commandArray.shift();

            if(this.commands[verb]) {

                return this.commands[ verb ].apply(this.commands, commandArray);

            } else {
                throw {
                    name : "IncorrectCommandError",
                    message : "command does not exist"
                }
            }
        }
    });
});




