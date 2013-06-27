

require.config({

    shim : {

        'jquery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        }

    },

    paths : {
    /* points to lib folder within version2 */
        jquery : "lib/jquery-1.8.0",
        underscore : "lib/underscore",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",

    }
});


require(['jquery',
         'editor/editorView',
         'editor/editorModel',
         'editor/editorController',
         'utility/keymap',
         'diagram/diagramController',
         'diagram/diagramModel',
         'diagram/types/typeView',
         'diagram/types/typeController',
         'utility/idGenerator'],

         function ( $,
                    EditorView,
                    EditorModel,
                    EditorController,
                    keymap,
                    DiagramController,
                    DiagramModel,
                    TypeView,
                    TypeController,
                    idGenerator) {

    $(document).ready(function () {



        var diagramController = new DiagramController({
            diagramModel : new DiagramModel({
                idGenerator : idGenerator
            }),
            TypeView : TypeView,
            TypeController : TypeController
        });

        var editorModel = new EditorModel({
            diagramController : diagramController
        });

        editorModel.setAttributes({

            oldCommands : ["first", "second", "third"],
            currentCommand : "hello world"
        });

        new EditorView({
            el : $('#editor-placeholder'),
            model : editorModel
        });

        new EditorController({
            keymap : keymap,
            model : editorModel
        });


    });
});





