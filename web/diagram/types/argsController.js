define([
    "BaseType",
    "diagram/types/argsEditorView"
    ],

    function (
        BaseType,
        ArgsEditorView
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.manager = options.manager;

            this.view = new ArgsEditorView({

                el : options.el
            });

            this.view.$el.on('click', '[data-role=cancel]', $.proxy(this.close, this));
            this.view.$el.on('click', '[data-role=addArgRow]', $.proxy(this.addRow, this));
            this.view.$el.on('click', '[data-role=deleteArg]', $.proxy(this.deleteArg, this));
            this.view.$el.on('click', '[data-role=save]', $.proxy(this.save, this));

        },

        show : function (stackingOrder, el) {

            var left = $(el).position().left;
            var top  = $(el).position().top;

            this.argInput = $(el);
            var value = this.argInput.val();
            var argsArray;

            if(value) {

                var args = value.split(/,/);

                argsArray = _.reduce( args , function (memo, value) {

                    var arr = value.split(/:/);
                    memo.push({ name : arr[0], type : arr[1] });
                    return memo;

                }, []);

            } else {

                argsArray = [{ name : "", type : "" }];
            }
            this.view.show(stackingOrder, argsArray, left, top);
        },

        save : function () {

            var rows = this.view.getRows();

            var result = "";

            rows.each(function (index, row) {

                var inputs = $('input[type=text]', row);
                result += ("," + inputs[0].value + ":" + inputs[1].value);

            });

            this.argInput.val(result.substring(1));

            this.close();


        },

        close : function () {

            this.manager.onCloseWidget();
            this.view.hide();
        },

        deleteArg : function (event) {

            $(event.currentTarget).closest("tr").remove();
        },

        addRow : function () {

            this.view.addRowToTable();

        }
    });
});

