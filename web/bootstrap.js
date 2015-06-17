
define([
    'jquery',
     'diagram/diagramController',
     'diagram/diagramModel',
     'diagram/types/typeView',
     'diagram/types/typeController',
     'utility/idGenerator',
     'diagram/connectors/horizontalConnectorFactory',
     'diagram/connectors/verticalConnectorFactory',
     'diagram/componentFactory'
     ],

     function (
        $,
        DiagramController,
        DiagramModel,
        TypeView,
        TypeController,
        idGenerator,
        horizontalConnectorFactory,
        verticalConnectorFactory,
        ComponentFactory
        ) {

    return {

        start : function () {

            $(document).ready(function () {

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


            });
        }
    };
});





