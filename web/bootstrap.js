
define([ 'jquery',
         'diagram/diagramController',
         'diagram/diagramModel2',
         'diagram/types/typeView',
         'diagram/types/typeController',
         'utility/idGenerator',
         'diagram/connectors/horizontalConnectorFactory',
         'diagram/connectors/verticalConnectorFactory',
         'diagram/componentFactory',
         'rasmus/rasmusManager'
         ],

         function ( $,
                    DiagramController,
                    DiagramModel,
                    TypeView,
                    TypeController,
                    idGenerator,
                    horizontalConnectorFactory,
                    verticalConnectorFactory,
                    ComponentFactory,
                    RasmusManager
                    ) {

    return {

        start : function () {

            $(document).ready(function () {

                if($('[data-role=rasmus-container]').length) {

                    var diagramModel = new DiagramModel();

                    var componentFactory = new ComponentFactory({
                        diagramModel : diagramModel,
                        horizontalConnectorFactory : horizontalConnectorFactory,
                        verticalConnectorFactory : verticalConnectorFactory
                    })

                    var diagramController = new DiagramController({
                        diagramModel : diagramModel,
                        componentFactory : componentFactory
                    });

                    var rasmus = new RasmusManager({

                        diagramController : diagramController
                    });

                }


            });
        }
    };
});





