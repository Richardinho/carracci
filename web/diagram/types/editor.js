define([
    "BaseType",
    "diagram/types/editorView",
    "events/eventsBus"

    ],

    function (
        BaseType,
        TypeEditorView,
        eventsBus
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
            this.view.$el.on("click", "[data-role=methodArgs]", $.proxy(this.argsClick, this));
            this.view.$el.on("click", "[data-role=add-note]", $.proxy(this.addNote, this));
            this.view.$el.on("click", "[data-role=delete]", $.proxy(this.del, this));

        },

        /*
            open up editor module
        */
        show : function ( stackIndex, model ) {

            this.model = model;
            this.view.model = this.model;

            this.view.render(stackIndex);

        },

        close : function () {

            this.manager.onCloseWidget();
            this.view.hide();

        },

        del : function () {

            //  need to delete all related nodes here.
            this.deleteNotes();
            this.diagramController.deleteType(this.model.id);
            this.model.trigger("delete");
            this.close();
        },

        deleteNotes : function () {

            var notes = this.model.model.notes;

            notes.forEach(function (note) {

                eventsBus.trigger("destroy:" + note);

            });
        },

        addProp : function () {

            this.view.addRowToPropertyTable();
        },

        addNote : function () {

            var id = this.diagramController.createNote(this.model);
            this.model.model.notes.push(id);
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

            var that = this;

            var typeName = $('input[data-role=typeName]', this.view.$el).val();
            var flavor = $('input[data-role=flavor]', this.view.$el).val();

            that.model.model.name = typeName;
            that.model.model.flavor = flavor;
            that.model.model.properties = {};
            that.model.model.methods = {};

            $('[data-role=property-table] tbody tr', this.view.$el).each(function (index, row) {

                if(that._validateRow(row)) {
                    var name = $('input[name=name]', row).val();

                    that.model.model.properties[name] = {};

                    $('input[type=text]', row).each(function (index, input) {

                        that.model.model.properties[name][input.name] = input.value;

                    });
                }
            });

            $('[data-role=method-table] tbody tr', this.view.$el).each(function (index, row) {

                if(that._validateRow(row)) {

                    var name = $('input[name=name]', row).val();

                    that.model.model.methods[name] = {};

                    $('input[type=text]', row).each(function (index, input) {

                        if(input.dataset.role === "methodArgs") {

                            var argsArray = input.value.split(/,/);

                            console.log(argsArray);

                            if(argsArray[0].length > 0) {

                                var args = _.reduce(argsArray, function(memo, value){

                                    var argArray = value.split(/:/);

                                    if(argArray) {
                                        memo[argArray[0]] = {

                                            name : argArray[0],
                                            type : argArray[1]
                                        };
                                    }
                                    return memo;

                                }, {});

                                console.log("editor", args);

                                that.model.model.methods[name]['args'] = args;

                            }
                        } else {

                            that.model.model.methods[name][input.name] = input.value;

                        }
                    });
                }
            });

            this.model.trigger("update");

            this.close();

        },

        _validateRow : function(row) {


            var inputs = row.querySelectorAll('[type=text]:not([data-role=methodArgs])');

            return Array.prototype.every.call(inputs, function (input) {

                return !!input.value;

            });

        }
    });
});

