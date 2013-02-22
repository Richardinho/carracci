/*

require.config({

    shim : {
        'jQuery' : {
            exports : '$'
        },

        'raphael' : {
            exports : 'Raphael'
        }
    },

    paths : {

        jQuery : "lib/jquery-1.8.0",
        raphael : "lib/raphael"
    }
});
*/
require(['lib/jquery-1.8.0'], function () {
    $(document).ready(function () {
        $('#foo').click(function () {


        });
        /*require(["lib/raphael"], function () {

            *//*    $(document).ready(function () {

             //var can = Raphael(0, 0, 800, 820);
             })*//*
        });*/
    });
});




