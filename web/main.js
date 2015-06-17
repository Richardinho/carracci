


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
        },

        'backbone' : {

            deps : ['jquery', 'underscore'],

            exports : 'Backbone'
        }

    },

    paths : {
    /* points to lib folder within version2 */
        backbone : "lib/backbone",
        jquery : "lib/jquery-1.8.0",
        underscore : "lib/underscore",
        BaseType : "richardUtils/src/BaseType",
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
        "defaultHelp" : "defaulthelp"
    }
});


require(['bootstrap'], function (bootstrap) {

    bootstrap.start();


});





