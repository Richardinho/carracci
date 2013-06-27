define(["core/BaseType", "jquery"],function (BaseType, $) {

    return BaseType.extend({

        initialize : function (options) {

            this.keymap = options.keymap;
            this.model = options.model;

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

                else {
                    var char = that.getChar(event);
                    that.model.appendChar(char);
                }

                return false;

            });
        },

        getChar : function (event) {

            var prefix = event.shiftKey ? "s" : "_";

            return this.keymap[prefix + event.keyCode];

        }
    });
});