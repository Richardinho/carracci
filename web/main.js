

require.config({

    shim : {

        'jquery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        },

        'jqueryUICustom' : ['jquery'],

        'canvg' : {

            deps : ['rgbColor'],

            exports : 'canvg'
        }

    },

    paths : {
    /* points to lib folder within version2 */
        jquery : "lib/jquery-1.8.0",
        underscore : "lib/underscore",
        BaseType : "richardUtils/src/BaseType",
        eventNode : "richardUtils/src/eventNode",
        Model : "richardUtils/src/Model",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        jqueryUICustom : "lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min",
        canvg : "lib/canvg-1.2/canvg",
        rgbColor : "lib/canvg-1.2/rgbcolor",
        'editor/editorView'        : 'rasmus/app/scripts/editor/editorView'       ,
        'editor/editorModel'       : 'rasmus/app/scripts/editor/editorModel'      ,
        'editor/editorController'  : 'rasmus/app/scripts/editor/editorController' ,
        'editor/events'            : 'rasmus/app/scripts/editor/events'           ,
        'processes/defaultProcess' : 'rasmus/app/scripts/processes/defaultProcess',
        'processes/builtIn/max'    : 'rasmus/app/scripts/processes/builtIn/max'   ,
        'processes/builtIn/min'    : 'rasmus/app/scripts/processes/builtIn/min'   ,
        'processes/builtIn/help'   : 'rasmus/app/scripts/processes/builtIn/help',
        "processes/process"        : 'rasmus/app/scripts/processes/process',
        "commandLineParser"        : 'rasmus/app/scripts/processes/commandLineParser',
        "maxhelp"                  : "rasmus/app/scripts/processes/builtin/helpfiles/maxhelp.htm",
        "editorTemplate"           : "rasmus/app/scripts/templates/editorTemplate.htm",
        "commandsTemplate"         : "rasmus/app/scripts/templates/commandsTemplate.htm",
        "displayTemplate"          : "rasmus/app/scripts/templates/displayTemplate.htm"
    }
});


require(['bootstrap'], function (bootstrap) {

    bootstrap.start();


});





