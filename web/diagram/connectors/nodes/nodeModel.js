define([
        "utility/nodeWrapper"
        ],

        function (
            NodeWrapper
        ) {

            /*
              should be a wrapper around the 'event node' representing the diagram node.
              should pass through event registration to event node and event firing.
              Should provide setters and accessors for properties on event node
            */

            "use strict";

            return NodeWrapper.extend({

                initialize : function (options) {

                    NodeWrapper.prototype.initialize.call(this, options);

                    //  register event handler on arrow node if it exists. convert into semantic event on the node model
                    if(this.model['arrow']) {

                        this.on("change:style", function () {

                            this.trigger("switchArrowHead");

                        }, this);

                    }
                    this.arrowModel = this.model['arrow']

                    this.arrowHeadStyles = [
                        "whiteArrow",
                        "whiteDiamond",
                        "blackDiamond",
                        "blackConnectArrow",
                        "none"
                    ];
                    this.currentArrowHeadIndex = 0;

                },

                getXCood : function () {

                    return parseInt(this.model['xCood'], 10);
                },

                setXCood : function (x) {

                    this.model['xCood'] = x;
                    this.trigger("change:xCood");
                },

                setYCood : function (y) {

                    this.model['yCood'] = y;
                    this.trigger("change:yCood");
                },

                getYCood : function () {

                    return parseInt(this.model['yCood'], 10);

                },


                getStyle : function () {

                    return this.model['arrow']['style'];
                },

                switchArrowHead : function () {

                    var arrowHead = this.arrowHeadStyles[this.currentArrowHeadIndex];

                    this.model['arrow']['style'] = arrowHead;

                    //todo : possible to do this a bit more succinctly?
                    this.currentArrowHeadIndex = (this.currentArrowHeadIndex + 1) % this.arrowHeadStyles.length;

                    this.trigger('switchArrowHead');

                },

                getDirection : function () {

                    return this.model['arrow']['direction'];
                },

                setArrowDirection : function (direction) {

                    this.model['arrow']['direction'] = direction;
                },

                isAttached : function () {

                    return !! this.model['attached'];
                },

                setAttached : function (value) {

                    this.model['attached'] = value;
                },

                isArrowNode : function () {

                    return !! this.model['arrow'];
                }




            });

        });