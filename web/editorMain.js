
var rasmusPath = "./rasmus/app/scripts/editor/";
var processPath = "./rasmus/app/scripts/processes/";

require.config({

    baseUrl : "../",

    shim : {

        'underscore' : {
            exports : '_'
        }
    },

    paths : {

        "BaseType"                  :  "./web/richardUtils/src/BaseType",
        "Model"                     :  "./web/richardUtils/src/Model",
        "jquery"                    :  "./web/lib/jquery-1.8.0",
        "underscore"                :  "./web/lib/underscore",
        "editor/events"             :  rasmusPath + "events",
        "editor/editorView"         :  rasmusPath + "editorView",
        "editor/editorModel"        :  rasmusPath + "editorModel",
        "editor/editorController"   :  rasmusPath + "editorController",
        "editor/internalCommands"   :  rasmusPath + "internalCommands",
        "editor/externalCommands"   :  "./web/externalCommands",
        "editor/editor"             :  rasmusPath + "editor",
        "processes/defaultProcess"  :  processPath + "defaultProcess",
        "processes/process"         :  processPath + "process",
        "processes/create"          :  processPath + "create",
        "processes/max"             :  processPath + "max",
        "processes/min"             :  processPath + "min",
        "commandLineParser"         :  processPath + "commandLineParser"

    }

});


require([ 'jquery', 'editor/editor', 'processes/create' ], function ( $, Editor, Create) {


   var editor = new Editor({

        processes : [ Create ]

    });


});
