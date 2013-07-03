define(["core/BaseType",
        "utility/eventNode",
        "diagram/types/typeModel",
        "diagram/connectors/horizontalConnectorModel",
        "diagram/boxHorizontalNodeMediator",
        "diagram/boxVerticalNodeMediator",
        "diagram/connectors/verticalConnectorModel"],
        function (  BaseType,
                    Node,
                    TypeModel,
                    HorizontalConnectorModel,
                    BoxHorizontalNodeMediator,
                    BoxVerticalNodeMediator,
                    VerticalConnectorModel) {

    return BaseType.extend({

        initialize : function () {

            this.model = new Node({
                diagrams : {}
            });

            // nodeOrientation is simply a string 'left', 'right' etc.
            this.model.on("attachRequest", function (nodeMediator, nodeOrientation) {

                this.requestedNode = {
                    nodeMediator : nodeMediator,
                    nodeOrientation : nodeOrientation
                }
            });

            this.model.on("receiveRequest", function (typeController) {
                console.log("receive request")
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
                        console.log("box vertical mediator creation")
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

        createDiagram : function (diagramName, node) {

            if(node) {
                this.model.children['diagrams'].createChild(diagramName, node);
            }
            else {
                this.model.children['diagrams'].createChild(diagramName, {
                    types : {},
                    connectors : {}
                });
            }
        },

        createVerticalConnector : function (diagram) {
            var connectorModel = this.model.children['diagrams']
                .children[diagram]
                .children['connectors']
                .createChild("blah",{
                    orientation : "vertical",
                    nodes : {

                        top : {
                            xCood : 300,
                            yCood : 100,
                            attached : false,
                            arrow : {
                                style : "blackConnectArrow",
                                direction : "top"
                            }
                        },

                        secondTop : {
                            xCood : 300,
                            yCood : 200,
                            attached : false
                        },

                        secondBottom : {
                            xCood : 400,
                            yCood : 200,
                            attached : false
                        },

                        bottom : {
                            xCood : 400,
                            yCood : 300,
                            attached : false,
                            arrow : {
                                style : "whiteArrow",
                                direction : "bottom"
                            }
                        }

                    },
                    lineStyle : "solid"

                });
            return new VerticalConnectorModel({
                model : connectorModel
            });

        },

        createHorizontalConnector : function (diagram) {
            /*
                question: how should this connector be labelled?
                Once created, should the user
                be able to interact with it via the editor?
            */

            var connectorModel = this.model.children['diagrams']
                .children[diagram]
                .children['connectors']
                .createChild("blah",{
                    orientation : "horizontal",
                    nodes : {

                        left : {
                            xCood : 100,
                            yCood : 100,
                            attached : false,
                            arrow : {
                                style : "blackConnectArrow",
                                direction : "left"
                            }
                        },

                        proximal : {
                            xCood : 200,
                            yCood : 100,
                            attached : false
                        },

                        distal : {
                            xCood : 200,
                            yCood : 300,
                            attached : false
                        },

                        right : {
                            xCood : 400,
                            yCood : 300,
                            attached : false,
                            arrow : {
                                style : "whiteArrow",
                                direction : "right"
                            }
                        }

                    },
                    lineStyle : "solid"

                });
            return new HorizontalConnectorModel({
                model : connectorModel
            });

        },

        createType : function (diagram, typeName) {

           var typeModel = this.model.children.diagrams.children[diagram].children.types.createChild(typeName, {

                properties : {
                    testProp : {
                        name : "testProp",
                        visibility : "private",
                        type : "String"
                    },

                    blahProp : {
                        name : "blahProp",
                        visibility : "private",
                        type : "Collection"
                    }
                },
                flavor : "interface",
                methods : {
                    fooMethod : {
                        name : "fooMethod",
                        visibility : "public",
                        returnType : "String",
                        args : [
                            {name : "arg1", type : "int" },
                            {name : "arg2", type : "char" }
                        ]
                    },
                    barMethod : {
                        name : "barMethod",
                        visibility : "public",
                        returnType : "void",
                        args : []
                    }

                },
                xCood : 700,
                yCood : 400,
                width : 10,
                height : 10

            });

            return new TypeModel({
                diagramModel : this.model,
                model : typeModel
            });

        },

        getTypeName : function (diagram, type) {

            return this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type].name;

        },

        createProperty : function (diagram, type, propertyName) {
            this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type]
                        .children.properties
                        .createChild(propertyName, {
                            name : propertyName,
                            visibility : "private",
                            type : "Object"
                        });

        },

        getProperty : function (diagram, type, propertyName) {

            return this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type]
                        .children.properties
                        .children[propertyName];


        },

        createMethod : function (diagram, type, methodName) {

            this.model.children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .createChild(methodName, {
                    visibility : "public",
                    returnType : "void",
                    args : []
                });
        },

        getMethod : function (diagram, type, methodName) {
            return this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type]
                        .children.methods
                        .children[methodName];

        },

        /* deletes specified method and returns it */
        deleteMethod : function (diagram, type, methodName) {

            return  this.model.children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .deleteChild(methodName);

        },

        deleteProperty : function (diagram, type, propertyName) {

            return  this.model.children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['properties']
                .deleteChild(propertyName);
        },

        setMethodVisibility : function (diagram, type, methodName, visibility) {

            this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .children[methodName]
                .children['visibility']
                .set(visibility)
        },

        getMethodVisibility : function(diagram, type, methodName) {

            return this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .children[methodName]
                .children['visibility'].value;
        },

        getPropertyVisibility : function(diagram, type, propertyName) {

            return this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['properties']
                .children[propertyName]
                .children['visibility'].value;
        },

        getPropertyType : function(diagram, type, propertyName) {

            return this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['properties']
                .children[propertyName]
                .children['type'].value;
        }


        /*


        deleteType : function (diagram, type, id) {

            delete this.diagrams[diagram].types[type];
            delete this.typeCache[id]
        },

        setPropertyVisibility : function (diagram, type, propertyName, value) {
            this.diagrams[diagram].types[type].properties[propertyName].visibility = value;
        },

        setPropertyName : function (diagram, type, propertyName, value) {
            this.diagrams[diagram].types[type].properties[propertyName].name = value;
        },

*/



    });
});