define([
    "BaseType",
    "menu/view"
    ], function (
        BaseType,
        View
        ) {

            "use strict";

            return BaseType.extend({

                initialize : function (options) {

                    this.diagramController = options.diagramController;

                    this.view = new View();
                },


        });