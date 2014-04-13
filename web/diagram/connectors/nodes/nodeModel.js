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

                    this.model = options.model;

                    //  register event handler on arrow node if it exists. convert into semantic event on the node model
                    if(this.model.children['arrow']) {

                        this.model.children['arrow'].on("change:style", function () {

                            this.fire("switchArrowHead");

                        }, this);

                    }
                    this.arrowModel = this.model.children['arrow']

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

                    return parseInt(this.model.children['xCood'].value, 10);
                },

                setXCood : function (x) {

                    this.model.children['xCood'].set(x);
                },

                setYCood : function (y) {

                    this.model.children['yCood'].set(y);
                },

                getYCood : function () {

                    return parseInt(this.model.children['yCood'].value, 10);

                },


                getStyle : function () {

                    return this.model.children['arrow'].children['style'].value;
                },

                switchArrowHead : function () {

                    var arrowHead = this.arrowHeadStyles[this.currentArrowHeadIndex];

                    this.model.children['arrow'].children['style'].set(arrowHead);

                    //todo : possible to do this a bit more succinctly?
                    this.currentArrowHeadIndex = (this.currentArrowHeadIndex + 1) % this.arrowHeadStyles.length;

                },

                getDirection : function () {

                    return this.model.children['arrow'].children['direction'].value;
                },

                setArrowDirection : function (direction) {

                    this.model.children['arrow'].children['direction'].set(direction);
                },

                isAttached : function () {

                    return this.model.children['attached'].value;
                },

                setAttached : function (value) {

                    this.model.children['attached'].set(value);
                },

                isArrowNode : function () {

                    return !! this.model.children['arrow'];
                }




            });

        });