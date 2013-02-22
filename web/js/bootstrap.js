

require.config({

    shim : {

        'jQuery' : {
            exports : '$'
        }
    },

    paths : {
        jQuery : "lib/jquery-1.8.0",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        keyManager : "node/controller/controller.KeyManager"
    }
});

require([ 'jQuery', 'raphael', 'keyManager' ], function ( $, Raphael, KeyManager ) {

    $(document).ready(function () {

        var can = Raphael(0, 0, 800, 820);

        var circle = can.circle(100, 100, 20);
        circle.attr("fill" , "red");
        circle.attr("stroke", "#fff");

        var keyManager = new KeyManager();
    });
});





