define([
        "BaseType",
        "eventNode",
        "diagram/types/typeModel",
        "diagram/connectors/horizontalConnectorModel",
        "diagram/boxHorizontalNodeMediator",
        "diagram/boxVerticalNodeMediator",
        "diagram/connectors/verticalConnectorModel",
        "utility/idGenerator",
        "events/eventsBus",
        "diagram/connectors/verticalConnectorBasicJson",
        "diagram/connectors/horizontalConnectorBasicJson",
        "diagram/types/typeJSON",
        "diagram/banner/bannerJSON"
        ],
        function (
            BaseType,
            Node,
            TypeModel,
            HorizontalConnectorModel,
            BoxHorizontalNodeMediator,
            BoxVerticalNodeMediator,
            VerticalConnectorModel,
            idGenerator,
            eventsBus,
            verticalConnectorBasicJson,
            horizontalConnectorBasicJson,
            typeJSON,
            bannerJSON
            ) {

                "use strict";

                return BaseType.extend({

                    initialize : function () {

                        this.currentDiagram = null;

                        // nodeOrientation is simply a string 'left', 'right' etc.

                        eventsBus.on("attachRequest", function (nodeMediator, nodeOrientation) {

                            this.requestedNode = {
                                nodeMediator : nodeMediator,
                                nodeOrientation : nodeOrientation
                            };
                        });

                        eventsBus.on("receiveRequest", function (typeController) {

                            if(this.requestedNode) {
                                //  create mediator

                                var orientation = this.requestedNode.nodeOrientation;

                                if(orientation === "left" || orientation === "right") {

                                    new BoxHorizontalNodeMediator({
                                        nodeMediator : this.requestedNode.nodeMediator,
                                        nodeOrientation : this.requestedNode.nodeOrientation,
                                        typeController : typeController
                                    });

                                } else {

                                    new BoxVerticalNodeMediator({
                                        nodeMediator : this.requestedNode.nodeMediator,
                                        nodeOrientation : this.requestedNode.nodeOrientation,
                                        typeController : typeController
                                    });
                                }
                                // null out requested node.
                                this.requestedNode = null;
                            }
                        });

                    },

                    rewriteIds : function (json) {


                        var connectorsQuantity = Object.keys(json.connectors).length;
                        var notesQuantity = Object.keys(json.notes).length;

                        idGenerator.reset(connectorsQuantity + notesQuantity);

                    },


                    createVerticalConnector : function () {

                        var id = idGenerator.nextId(); //todo id system needs a lot of work : at present there are duplicate ids when you load an existing diagram

                        this.currentDiagram['connectors'][id] = verticalConnectorBasicJson();

                        return this.currentDiagram['connectors'][id];

                    },

                    createHorizontalConnector : function () {

                        var id = idGenerator.nextId();

                        this.currentDiagram['connectors'][id] = horizontalConnectorBasicJson();

                        return this.currentDiagram['connectors'][id];

                    },

                    deleteType : function (id) {

                        delete this.currentDiagram['types'][id];
                    },


                    createBanner : function () {

                        this.currentDiagram['banner'] = bannerJSON();

                        return this.currentDiagram['banner'];

                    },

                    createNote : function (typeId) {

                        var id = idGenerator.nextId();

                        this.currentDiagram['notes'][id] = {

                            id : id,

                            typeId : typeId,

                            text : "",

                            fontSize : "12",

                            width : 300,

                            fontFamily : "arial",

                            paddingHorizontal : 12,

                            xCood : "0",

                            yCood : "0"

                        };

                        return this.currentDiagram['notes'][id];

                    },

                    deleteNote : function(id) {

                        delete this.currentDiagram['notes'][id];

                    },

                    createType : function () {

                        var id = idGenerator.nextId();

                        this.currentDiagram['types'][id] = typeJSON(id);

                        return this.currentDiagram['types'][id];

                    },

                    deleteConnector : function (id) {

                        delete this.currentDiagram['connectors'][id];
                    }


                });
            });