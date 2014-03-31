define([
    'BaseType',
    'text!mainCarracciHelp.html',
    'text!annibale.html',
    'text!commands/export/help.html',
    'text!commands/load/help.html',
    'text!commands/export/help.html'
    ], function (
        BaseType,
        MainHelp,
        annibale,
        contextHelp,
        loadHelp,
        exportHelp
        ) {

            "use strict";

            return BaseType.extend({

                getHelp : function () {


                    return MainHelp + contextHelp + loadHelp + exportHelp + annibale;

                }

            });


        });