define([
    "BaseType",
    "diagram/connectors/nodes/nodeModel"
    ], function (
        BaseType,
        NodeModel
    ) {

        "use strict";

        return BaseType.extend({

            initialize : function (options) {

                this.selected = false;

                this.artifactType = "connector";

                this.connectorModel = options.connectorModel;

                this.connectorModel.on("node-selected", function() {

                    if(this.selected) {

                        this.connectorModel.fire("deselected", this);
                        this.selected = false;

                    } else {

                        this.connectorModel.fire("selected", this);
                        this.selected = true;

                    }

                }, this);

                this.connectorModel.on("delete", this.detachAll, this);

            },

            changeLineStyle : function () {
                this.connectorModel.alternateLineStyle();
            },

            getName : function () {

                return this.connectorModel.model.name;

            }


        });
    });
