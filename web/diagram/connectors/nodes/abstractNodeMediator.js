define([
  'BaseType',
  'diagram/connectors/nodes/nodeModel',
  'events/eventsBus',
], function(BaseType, NodeModel, events) {
  'use strict'

  return BaseType.extend({
    initialize: function(options) {
      this.selected = false

      this.artifactType = 'connector'

      this.connectorModel = options.connectorModel

      events.on(
        'destroy',
        function() {
          this.connectorModel.trigger('destroy')
        },
        this
      )

      this.connectorModel.on('destroy', this.destroy, this)
    },

    destroyConnector: function() {
      this.connectorModel.trigger('destroy')
    },

    dblclick: function() {
      events.trigger('dblclick:connector', this.connectorModel)
    },

    changeLineStyle: function() {
      this.connectorModel.alternateLineStyle()
      this.connectorModel.trigger('change:lineStyle')
    },

    getName: function() {
      return this.connectorModel.model.name
    },

    getConnectorId: function() {
      return this.connectorModel.model.id
    },
  })
})
