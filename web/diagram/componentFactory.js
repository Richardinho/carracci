define([
  'BaseType',
  'diagram/types/typeView',
  'diagram/types/typeController',
  'diagram/types/typeModel',
  'diagram/connectors/horizontalConnectorModel',
  'diagram/connectors/verticalConnectorModel',
  'diagram/boxHorizontalNodeMediator',
  'diagram/boxVerticalNodeMediator',
  'underscore',
  'diagram/banner/bannerView',
  'diagram/banner/bannerController',
  'diagram/banner/bannerModel',
  'diagram/note/noteView',
  'diagram/note/noteModel',
  'diagram/note/noteController',
  'diagram/note/noteLineView',
  'events/eventsBus',
], function(
  BaseType,
  TypeView,
  TypeController,
  TypeModel,
  HorizontalConnectorModel,
  VerticalConnectorModel,
  BoxHorizontalNodeMediator,
  BoxVerticalNodeMediator,
  _,
  BannerView,
  BannerController,
  BannerModel,
  NoteView,
  NoteModel,
  NoteController,
  NoteLineView,
  events
) {
  /*
    this is a layer in front of the model. it delegates creation and setting of properties
    to the model, but it creates wrapper objects which make it easier for clients to interact
    with the model

    It also handles the destruction of objects. It should probably be called the component manager
    rather than factory.
  */

  return BaseType.extend({
    initialize: function(options) {
      this.diagramModel = options.diagramModel
      this.horizontalConnectorFactory = options.horizontalConnectorFactory
      this.verticalConnectorFactory = options.verticalConnectorFactory

      this.typeControllerMap = {}
      this.connectorMediators = {}
      this.banner = {}
    },

    /**
     *   creates note.
     *   @returns {Number} note model id
     */

    createNote: function(typeModel) {
      //todo: unless there's a good reason not to, consider consolidating this method with the following.
      // gets object literal with config details from diagramModel
      var rawNoteModel = this.diagramModel.createNote(typeModel.model.id)
      this.createNoteFromModel(rawNoteModel, typeModel)
      return rawNoteModel.id
    },

    /*
     *   creates MVC for a note
     */

    createNoteFromModel: function(rawNoteModel, typeModel) {
      var model = new NoteModel({
        model: rawNoteModel,
      })

      // this connects the note to a type
      new NoteLineView({
        model: model,
        typeModel: typeModel,
      })

      var view = new NoteView({
        model: model,
      })

      new NoteController({
        model: model,
        view: view,
      })
    },

    /*
     *  creates MVC for banner
     */

    createBanner: function(rawBannerModel) {
      if (!rawBannerModel) {
        rawBannerModel = this.diagramModel.createBanner()
      }
      if (this.bannerEditor) {
        //  todo: something a bit crappy about this.
        alert('banner already exists')
      } else {
        // for meantime just use bannerJSON for 'model' in view
        var bannerModel = new BannerModel({
          model: rawBannerModel,
        })
        var bannerView = new BannerView({
          model: bannerModel,
        })
        var bannerController = new BannerController({
          view: bannerView,
          model: bannerModel,
        })
        return bannerModel
      }
    },

    /*
     *   creates MVC for type
     */

    createType: function(json) {
      if (!json) {
        json = this.diagramModel.createType()
      }

      var typeModel = new TypeModel({
        model: json,
      })

      var typeView = new TypeView({
        model: typeModel,
      })

      var typeController = new TypeController({
        model: typeModel,
        view: typeView,
      })

      this.typeControllerMap[json.id] = typeController
    },

    /*
     *  Deletes diagram
     */

    deleteDiagram: function(diagramName) {
      _.each(
        this.typeControllerMap,
        function(typeController, key) {
          this.deleteType(key)
        },
        this
      )
      _.each(
        this.connectorMediators,
        function(mediator, key) {
          this.deleteConnector(key)
        },
        this
      )

      this.diagramModel.deleteDiagram(diagramName)
    },

    /*
     *   creates diagram
     */

    createDiagram: function(json, name) {
      if (!json) {
        this.diagramModel.currentDiagram = {
          name: name,
          types: {},
          connectors: {},
          notes: {},
        }
      } else {
        this.diagramModel.currentDiagram = json
        // parse diagram and create types and connectors.
        var types = this.diagramModel.currentDiagram.types

        for (var type in types) {
          this.createType(types[type])
        }
        var notes = this.diagramModel.currentDiagram.notes

        for (var note in notes) {
          var typeModel = this.typeControllerMap[notes[note].typeId].model

          this.createNoteFromModel(notes[note], typeModel)
        }

        events.trigger('createnotes')

        var banner = this.diagramModel.currentDiagram.banner

        this.createBanner(banner)

        var connectors = this.diagramModel.currentDiagram.connectors

        for (var connector in connectors) {
          if (connectors[connector]['orientation'] === 'horizontal') {
            var mediator = this.createHorizontalConnector(connectors[connector])

            var leftNode = connectors[connector]['nodes']['left']
            var rightNode = connectors[connector]['nodes']['right']

            if (rightNode['attached']) {
              var boxid = rightNode['attachedBox']
              new BoxHorizontalNodeMediator({
                nodeMediator: mediator,
                nodeOrientation: 'right',
                typeController: this.typeControllerMap[boxid],
                dontMove: true,
              })
            }

            if (leftNode['attached']) {
              var boxid = leftNode['attachedBox']

              new BoxHorizontalNodeMediator({
                nodeMediator: mediator,
                nodeOrientation: 'left',
                typeController: this.typeControllerMap[boxid],
                dontMove: true,
              })
            }
          } else {
            var mediator = this.createVerticalConnector(connectors[connector])

            var topNode = connectors[connector]['nodes']['top']
            var bottomNode = connectors[connector]['nodes']['bottom']

            if (topNode['attached']) {
              var boxid = topNode['attachedBox']

              new BoxVerticalNodeMediator({
                nodeMediator: mediator,
                nodeOrientation: 'top',
                typeController: this.typeControllerMap[boxid],
                dontMove: true,
              })
            }

            if (bottomNode['attached']) {
              var boxid = bottomNode['attachedBox']

              new BoxVerticalNodeMediator({
                nodeMediator: mediator,
                nodeOrientation: 'bottom',
                typeController: this.typeControllerMap[boxid],
                dontMove: true,
              })
            }
          }
        }
      }
    },

    /*
     *  creates mediator for a horizontal connector
     */

    createHorizontalConnector: function(json) {
      if (!json) {
        json = this.diagramModel.createHorizontalConnector()
      }

      var horizontalConnectorModel = new HorizontalConnectorModel({
        model: json,
      })

      var connectorMediator = this.horizontalConnectorFactory.create(
        horizontalConnectorModel
      )

      this.connectorMediators[horizontalConnectorModel.model.name] =
        connectorMediator

      return connectorMediator
    },

    /*
     *  creates mediator for a vertical connector
     */

    createVerticalConnector: function(json) {
      if (!json) {
        json = this.diagramModel.createVerticalConnector()
      }

      var verticalConnectorModel = new VerticalConnectorModel({
        model: json,
      })

      var connectorMediator = this.verticalConnectorFactory.create(
        verticalConnectorModel
      )

      this.connectorMediators[verticalConnectorModel.model.name] =
        connectorMediator

      return connectorMediator
    },
  })
})
