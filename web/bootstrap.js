
define([ 'jquery',
         'diagram/diagramController',
         'diagram/diagramModel2',
         'diagram/types/typeView',
         'diagram/types/typeController',
         'utility/idGenerator',
         'diagram/connectors/horizontalConnectorFactory',
         'diagram/connectors/verticalConnectorFactory',
         'diagram/componentFactory',
         'editor/editor',
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
                    EditorModule,
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



                /*
                var editor = new EditorModule({

                    placeholder : $('#editor-placeholder'),
                    commandObject : diagramController,
                    commands : [
                        'help',
                        'create',
                        'use',
                        'con',
                        'set',
                        'remove',
                        'show',
                        'load',
                        'export'
                    ],
                    preferences : {

                        width : 300,
                        height : 500,
                        backgroundColor : "red",
                        style : "default" // might specify a particular css prefix
                    }

                }); */
            });
        }
    };
});





