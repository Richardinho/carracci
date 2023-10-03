define([
  'BaseType',
  'canvg',
  'jquery',
  'menu/controller',
  'diagram/widgetManager',
  'events/eventsBus',
], function(BaseType, canvg, $, MainMenu, WidgetManager, eventsBus) {
  /*
    this type has the role of supplying commands which are called by the editor.
    It delegates to the diagram model for creating the model, and to the component factory
    for creating wrapper objects. It also keeps track through the context path of the users
    current place within the model.
  */

  'use strict'

  return BaseType.extend({
    initialize: function(options) {
      this.diagramModel = options.diagramModel
      this.componentFactory = options.componentFactory

      this.mainMenu = new MainMenu({
        diagramController: this,
      })

      this.widgetManager = new WidgetManager({
        diagramController: this,
      })

      $(document.body).on(
        'click',
        '[data-command]',
        $.proxy(this.handleCommand, this)
      )

      eventsBus.on('dblclick:type', this.showTypeEditor, this)
      eventsBus.on('dblclick:note', this.showNoteEditor, this)
      eventsBus.on('dblclick:connector', this.showConnectorEditor, this)
      eventsBus.on('dblclick:banner', this.showBannerEditor, this)
    },

    handleCommand: function(event) {
      var dataCommand = $(event.currentTarget).data('command')
      var args = dataCommand.split(/\s/)
      this.command(args)
    },

    command: function(args) {
      var command = args[0]

      if (command === 'create' && args[1] === 'type') {
        this.componentFactory.createType()
      }

      if (command === 'create' && args[1] === 'diagram') {
        // todo: create my own prompt box
        var diagramName = window.prompt('what is the name of your diagram?')

        this.componentFactory.createDiagram(null, diagramName)

        this.mainMenu.update(true)
      }

      if (command === 'create' && args[1] === 'banner') {
        var model = this.componentFactory.createBanner()

        this.widgetManager.showBannerEditor(model)
      }

      if (command === 'create' && args[1] === 'connector') {
        if (args[2] === 'horizontal') {
          this.componentFactory.createHorizontalConnector()
        } else {
          this.componentFactory.createVerticalConnector()
        }
      }

      if (command === 'showjson') {
        this.widgetManager.showJson(this.diagramModel.currentDiagram)
      }

      if (command === 'delete' && args[1] === 'diagram') {
        this.mainMenu.update(false)
        eventsBus.trigger('destroy')
        delete this.diagramModel.currentDiagram
      }

      if (command === 'load') {
        this.mainMenu.update(true)
        this.load(args[1])
      }
      if (command === 'export') {
        this.export()
      }

      if (command === 'help') {
        this.widgetManager.showHelp()
      }
    },

    createNote: function(typeModel) {
      return this.componentFactory.createNote(typeModel)
    },

    deleteNote: function(id) {
      this.diagramModel.deleteNote(id)
    },

    deleteType: function(id) {
      this.diagramModel.deleteTypeAndConnectors(id)
    },

    deleteConnector: function(connectorId) {
      this.diagramModel.deleteConnector(connectorId)
    },

    deleteBanner: function() {
      this.diagramModel.deleteBanner()
    },

    bannerExists: function() {
      return this.diagramModel.bannerExists()
    },

    showTypeEditor: function(typeModel) {
      this.widgetManager.showTypeEditor(typeModel)
    },

    setDiagram: function(diagramName) {
      this.command(['load', diagramName])
    },

    showNoteEditor: function(noteModel) {
      this.widgetManager.showNoteEditor(noteModel)
    },

    showConnectorEditor: function(connectorModel) {
      this.widgetManager.showConnectorEditor(connectorModel)
    },

    showBannerEditor: function(bannerModel) {
      this.widgetManager.showBannerEditor(bannerModel)
    },

    /*
      loads diagram by name. Throws an error if there is no such diagram currently loaded.
    */

    load: function(diagramname) {
      var promise = Promise.resolve(
        $.ajax({
          url: 'diagrams/' + diagramname + '.json',
          dataType: 'json',
        })
      )

      promise
        .then(
          $.proxy(function(data) {
            this.componentFactory.createDiagram(data)
          }, this)
        )
        .catch(function(err) {
          //  todo : display some more useful error to user.
          console.log(err)
        })
    },
    //  todo: this not hooked up yet.
    /*
    export: function() {
      //var format = arguments[0];
      var format = 'png'

      switch (format) {
        case 'jpeg':
          console.log('jpeg not yet supported')
          break
        case 'png':
          var canvas = document.createElement('canvas')
          canvas.width = 1000
          canvas.height = 800
          var svg = $('<div>').append($('svg').clone()).html()

          canvg(canvas, svg)

          var dataURL = canvas.toDataURL()

          window.open(dataURL, 'mywindow')
          break

        default:
          return Promise.reject(format + ' is not supported')
      }
      return Promise.resolve('exported to ' + format)
    },
    */
  })
})
