define([
  'jquery',
  'diagram/diagramController',
  'diagram/diagramModel',
  'diagram/connectors/horizontalConnectorFactory',
  'diagram/connectors/verticalConnectorFactory',
  'diagram/componentFactory',
], function(
  $,
  DiagramController,
  DiagramModel,
  horizontalConnectorFactory,
  verticalConnectorFactory,
  ComponentFactory
) {
  return {
    start: function() {
      $(document).ready(function() {
        var diagramModel = new DiagramModel()

        var componentFactory = new ComponentFactory({
          diagramModel: diagramModel,
          horizontalConnectorFactory: horizontalConnectorFactory,
          verticalConnectorFactory: verticalConnectorFactory,
        })

        var diagramController = new DiagramController({
          diagramModel: diagramModel,
          componentFactory: componentFactory,
        })

        diagramController.setDiagram('builderPattern')
      })
    },
  }
})
