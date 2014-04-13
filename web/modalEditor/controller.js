define([
    "BaseType",
    'underscore',
    'modalEditor/view'
        ],

        function (
            BaseType,
             _ ,
             View
        ) {

        "use strict";

        return BaseType.extend({

            initialize : function (options) {

                this.manager = options.manager;
                this.diagramController = options.diagramController;

                this.view = new View({

                    el : $('#modalEditor')
                });

               this.view.$el.on("click","[data-role=cancel]", $.proxy(this.close, this));
               this.view.$el.on("click","[data-role=save]", $.proxy(this.save, this));
               this.view.$el.on("click","[data-role=delete]", $.proxy(this.del, this));
            },

            show : function (widgetIndex, model) {

                this.model = model;
                this.view.model = this.model;
                //this.json = this.model.toJSON();

                this.view.render(widgetIndex);

            },

            close : function () {

                this.manager.onCloseWidget();
                this.view.hide();
            },

            del : function () {

                this.diagramController.deleteNote(this.model.getName());

                this.close();

            },

            save : function () {

                var contents = this._getContents();

                this.model.setText(contents);

                this.close();

            },

            _getContents : function () {

                return this.view.getTextAreaContents();
            }



        });
    });

