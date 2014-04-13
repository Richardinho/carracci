define([
    'BaseType',
    'diagram/types/editor',
    "diagram/types/argsController",
    "modalEditor/controller"

    ],function (
        BaseType,
        TypeEditor,
        ArgsController,
        NotesController
        ) {

        "use strict";


        return BaseType.extend({

            initialize : function (options) {

                this.stackingOrderIndex = 0;

                this.typeEditor = new TypeEditor({
                    manager : this,
                    diagramController : options.diagramController
                });

                this.argsController = new ArgsController({
                    el : $('#args-editor'),
                    manager : this
                });

                this.notesController = new NotesController({
                    manager : this
                });

                this.$overlay = $('#overlay');
                this.$overlay.hide();


            },

            getOverlayIndex : function () {

                return this.stackingOrderIndex;
            },

            getWidgetIndex : function () {

                return this.stackingOrderIndex * 2;
            },

            showTypeEditor : function (typeModel) {

                this.stackingOrderIndex++;
                this._showOverlay();
                this.typeEditor.show(this.getWidgetIndex(),typeModel );
            },

            showArgsEditor : function (el, controller) {
                this.stackingOrderIndex++;
                this._showOverlay();
                this.argsController.show(this.getWidgetIndex(), el, controller);

            },

            onCloseWidget : function () {

                this.stackingOrderIndex--;
                this._showOverlay();
            },

            showNoteEditor : function (noteModel) {
                this.stackingOrderIndex++;
                this._showOverlay();
                this.notesController.show(this.getWidgetIndex(), noteModel);
            },

            _showOverlay : function () {

                if(this.getOverlayIndex()) {
                    this.$overlay.show();
                    this.$overlay.css({ zIndex : this.getOverlayIndex() });
                } else {

                    this.$overlay.hide();
                }

            }


        });
    });