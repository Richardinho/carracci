define(["core/BaseType", "jquery"],function (BaseType, $) {

    return BaseType.extend({

        initialize : function (options) {

            this.keymap = options.keymap;
            this.model = options.model;
            this.diagramModel = options.diagramModel;

            var that = this;

            $(document).keydown(function (event) {

                // return key
                if(event.keyCode === 13) {
                    that.model.update();
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