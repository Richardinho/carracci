define([
  'BaseType',
  'diagram/types/editor',
  'diagram/types/argsController',
  'modalEditor/controller',
  'diagram/connectors/editorController',
  'diagram/banner/editor',
  'diagram/viewer/viewerController',
  'text!/diagram/help.html',
], function(
  BaseType,
  TypeEditor,
  ArgsController,
  NotesController,
  ConnectorEditorController,
  BannerEditorController,
  ViewerController,
  helpPage
) {
  'use strict'

  return BaseType.extend({
    /*
     * manages gui components
     */
    initialize: function(options) {
      this.stackingOrderIndex = 0

      this.typeEditor = new TypeEditor({
        manager: this,
        diagramController: options.diagramController,
      })

      this.argsController = new ArgsController({
        el: $('#args-editor'),
        manager: this,
      })

      this.notesController = new NotesController({
        manager: this,
        diagramController: options.diagramController,
      })

      this.connectorEditorController = new ConnectorEditorController({
        manager: this,
        diagramController: options.diagramController,
      })

      this.bannerEditorController = new BannerEditorController({
        manager: this,
        diagramController: options.diagramController,
      })

      this.viewerController = new ViewerController({
        manager: this,
      })

      this.$overlay = $('#overlay')
      this.$overlay.hide()
    },

    getOverlayIndex: function() {
      return this.stackingOrderIndex
    },

    getWidgetIndex: function() {
      return this.stackingOrderIndex * 2
    },

    showJson: function(diagram) {
      this.stackingOrderIndex++
      this._showOverlay()

      var template = _.template('<pre><%= html %></pre>')

      this.viewerController.show(
        this.getWidgetIndex(),
        template({ html: JSON.stringify(diagram, null, 2) })
      )
    },

    showHelp: function() {
      this.stackingOrderIndex++
      this._showOverlay()

      var template = _.template(helpPage)

      this.viewerController.show(this.getWidgetIndex(), template())
    },

    showTypeEditor: function(typeModel) {
      this.stackingOrderIndex++
      this._showOverlay()
      this.typeEditor.show(this.getWidgetIndex(), typeModel)
    },

    showArgsEditor: function(el, controller) {
      this.stackingOrderIndex++
      this._showOverlay()
      this.argsController.show(this.getWidgetIndex(), el, controller)
    },

    showConnectorEditor: function(connectorModel) {
      this.stackingOrderIndex++
      this._showOverlay()
      this.connectorEditorController.show(this.getWidgetIndex(), connectorModel)
    },

    showBannerEditor: function(bannerModel) {
      this.stackingOrderIndex++
      this._showOverlay()
      this.bannerEditorController.show(this.getWidgetIndex(), bannerModel)
    },

    onCloseWidget: function() {
      this.stackingOrderIndex--
      this._showOverlay()
    },

    showNoteEditor: function(noteModel) {
      this.stackingOrderIndex++
      this._showOverlay()
      this.notesController.show(this.getWidgetIndex(), noteModel)
    },

    /*
     * todo: this has a misleading name as it can also hide the overlay
     */

    _showOverlay: function() {
      if (this.getOverlayIndex()) {
        this.$overlay.show()
        this.$overlay.css({ zIndex: this.getOverlayIndex() })
      } else {
        this.$overlay.hide()
      }
    },
  })
})
