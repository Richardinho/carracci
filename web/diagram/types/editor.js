define([
    "BaseType",
    "diagram/types/editorView"

    ],

    function (
        BaseType,
        TypeEditorView
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.manager = options.manager;
            this.diagramController = options.diagramController;

            this.view = new TypeEditorView({
                el : $('#type-editor')
            });

            this.view.$el.on("click", "[data-role=save]", $.proxy(this.save, this));
            this.view.$el.on("click", "[data-role=cancel]", $.proxy(this.close, this));
            this.view.$el.on("click", "[data-role=add-prop]", $.proxy(this.addProp, this));
            this.view.$el.on("click", "[data-role=add-method]", $.proxy(this.addMethod, this));
            this.view.$el.on("click", "[data-role=deleteprop]", $.proxy(this.deleteProp, this));
            this.view.$el.on("click", "[data-role=deletemethod]", $.proxy(this.deleteMethod, this));
            this.view.$el.on("click", "[data-role=methodArgs]", $.proxy(this.argsClick, this))
            this.view.$el.on("click", "[data-role=add-note]", $.proxy(this.addNote, this))

        },

        /*
            open up editor module
        */
        show : function ( stackIndex, model ) {

            this.model = model;
            this.view.model = this.model;
            this.json = this.model.toJSON();

            this.view.render(stackIndex);

        },

        close : function () {

            this.manager.onCloseWidget();
            this.view.hide();

        },

        del : function () {

            // to impolement. when type is deleted
        },

        addProp : function () {

            this.view.addRowToPropertyTable();
        },

        addNote : function () {

            this.diagramController.createNote(this.model)
            this.close();
        },

        addMethod : function () {

            this.view.addRowToMethodTable();
        },

        deleteProp : function (event) {

            $(event.currentTarget).closest("tr").remove();
        },

        deleteMethod : function (event) {

            $(event.currentTarget).closest("tr").remove();
        },


        argsClick : function (event) {

            this.manager.showArgsEditor(event.target, this);

        },

        save : function () {

            var result = this.json;

            result.properties = {};
            result.methods = {};

            $('[data-role=property-table] tbody tr', this.view.$el).each(function (index, row) {

                var name = $('input[name=name]', row).val();

                result.properties[name] = {};

                $('input[type=text]', row).each(function (index, input) {

                    result.properties[name][input.name] = input.value;

                });
            });

            $('[data-role=method-table] tbody tr', this.view.$el).each(function (index, row) {

                var name = $('input[name=name]', row).val();

                result.methods[name] = { };

                $('input[type=text]', row).each(function (index, input) {


                    if(input.dataset.role === "methodArgs") {

                        var argsArray = input.value.split(/,/);

                        var args = _.reduce(argsArray, function(memo, value){

                            var argArray = value.split(/:/);

                            memo[argsArray[0]] = {

                                name : argsArray[0],
                                type : argsArray[1]
                            }

                            return memo;

                        }, {})

                        result.methods[name]['args'] = args;
                    } else {

                        result.methods[name][input.name] = input.value;

                    }
                });
            });

            this.model.save(result);

            this.close();

        }
    });
});

