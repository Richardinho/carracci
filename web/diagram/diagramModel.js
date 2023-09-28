define([
  'BaseType',
  'diagram/boxHorizontalNodeMediator',
  'diagram/boxVerticalNodeMediator',
  'utility/idGenerator',
  'events/eventsBus',
  'diagram/connectors/verticalConnectorBasicJson',
  'diagram/connectors/horizontalConnectorBasicJson',
  'diagram/types/typeJSON',
  'diagram/banner/bannerJSON',
], function(
  BaseType,
  BoxHorizontalNodeMediator,
  BoxVerticalNodeMediator,
  idGenerator,
  eventsBus,
  verticalConnectorBasicJson,
  horizontalConnectorBasicJson,
  typeJSON,
  bannerJSON
) {
  'use strict'

  return BaseType.extend({
    /*
     * This is the model for DiagramModel.
     * sets up event handlers for requests to link up components e.g. nodes and type boxes
     */

    initialize: function() {
      this.currentDiagram = null

      // nodeOrientation is simply a string 'left', 'right' etc.

      eventsBus.on('attachRequest', function(nodeMediator, nodeOrientation) {
        this.requestedNode = {
          nodeMediator: nodeMediator,
          nodeOrientation: nodeOrientation,
        }
      })
      //  todo: make these event names more meaningful
      eventsBus.on('receiveRequest', function(typeController) {
        if (this.requestedNode) {
          //  create mediator

          var orientation = this.requestedNode.nodeOrientation

          if (orientation === 'left' || orientation === 'right') {
            new BoxHorizontalNodeMediator({
              nodeMediator: this.requestedNode.nodeMediator,
              nodeOrientation: this.requestedNode.nodeOrientation,
              typeController: typeController,
            })
          } else {
            new BoxVerticalNodeMediator({
              nodeMediator: this.requestedNode.nodeMediator,
              nodeOrientation: this.requestedNode.nodeOrientation,
              typeController: typeController,
            })
          }
          // null out requested node.
          this.requestedNode = null
        }
      })
    },

    /*
     * creates a vertical connector
     * @returns {Object} object literal with default configuration for vertical connector
     */

    createVerticalConnector: function() {
      var id = idGenerator.nextId() //todo id system needs a lot of work : at present there are duplicate ids when you load an existing diagram

      this.currentDiagram['connectors'][id] = verticalConnectorBasicJson()

      return this.currentDiagram['connectors'][id]
    },

    /*
     *  creates a horizontal connector
     *  @returns {Object} object literal with default configuration for horizontal connector
     */

    createHorizontalConnector: function() {
      var id = idGenerator.nextId()

      this.currentDiagram['connectors'][id] = horizontalConnectorBasicJson()

      return this.currentDiagram['connectors'][id]
    },

    /*
     * deletes a type box from the diagram
     * @param {Number} id - id of type to be deleted
     */

    deleteType: function(id) {
      delete this.currentDiagram['types'][id]
    },

    /**
     * creates a banner
     * @returns {Object}  object literal with default configuration for banner
     */
    createBanner: function() {
      this.currentDiagram['banner'] = bannerJSON()

      return this.currentDiagram['banner']
    },
    /*
     * creates a note
     * @returns {Object} object literal with default configuration for note.
     */
    createNote: function(typeId) {
      var id = idGenerator.nextId()

      this.currentDiagram['notes'][id] = {
        id: id,

        typeId: typeId,

        text: '',

        fontSize: '12',

        width: 300,

        fontFamily: 'arial',

        paddingHorizontal: 12,

        xCood: '0',

        yCood: '0',
      }

      return this.currentDiagram['notes'][id]
    },

    /*
     * deletes a note
     * @param {Number} id - id of note to be deleted
     */

    deleteNote: function(id) {
      delete this.currentDiagram['notes'][id]
    },

    /*
     * creates a type
     * @returns {Object} object literal with default configuration for type.
     */

    createType: function() {
      var id = idGenerator.nextId()

      this.currentDiagram['types'][id] = typeJSON(id)

      return this.currentDiagram['types'][id]
    },

    /*
     * deletes a connector
     * @param {Number} id -id of connector to be deleted
     */

    deleteConnector: function(id) {
      delete this.currentDiagram['connectors'][id]
    },
  })
})
