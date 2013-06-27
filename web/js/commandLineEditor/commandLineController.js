define(['BaseType',
        'underscore',
        'jQuery',
        'commandEditor' ], function ( BaseType, _, $, commandEditor ) {


    return BaseType.extend({

        initialize : function (options) {

            var keymap = options.keymap;
            var that = this;

            this.editor = new commandEditor({
                commands : options.commands
            });

            $(document).keydown(function (event) {

                var objDiv = document.getElementById("command-editor");

                objDiv.scrollTop = objDiv.scrollHeight;

                var $currentCommands = $('#command-editor .current-commands');
                var $oldCommands =  $('#command-editor .old-commands');

                if(event.keyCode === 13 && event.ctrlKey) {

                    console.log("command line controller keydown")

                    var command = $currentCommands.html();
                    var comm = command.replace(/<br>/g, '');

                    try {

                        $oldCommands.append(formatCommand(command));
                        that.processCommand(command);

                    } catch(error) {

                        $oldCommands.append(formatError(error));

                    }

                    $currentCommands.text("");



                } else if(event.keyCode === 13 && !event.ctrlKey) {

                    var command = $currentCommands.append(' <br>')

                } else if(event.keyCode === 8) {

                    var text = $currentCommands.text();
                    text = text.substring(0, text.length -1);
                    $currentCommands.text(text);
                }

                else {
                    $currentCommands.append(getChar(event));
                }

                function getChar(event){

                     var prefix = event.shiftKey ? "s" : "_";
                      return keymap[prefix + event.keyCode];

                }

                function formatCommand(command) {

                    console.log("format command", command)
                    return "<div class='command'>" + command + "</div>";

                }

                function formatError(error) {
                    return "<div class='error'>" + error.name + " " + error.message + "</div>";
                }
                return false;

            });
        },

        processCommand : function (command) {

            console.log("commandLineController : process command()", command)

            console.log(this.editor.process(command));
        }



    });
});