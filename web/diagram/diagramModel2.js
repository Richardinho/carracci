define([
        "utility/nodeWrapper",
        "eventNode",
        "diagram/types/typeModel",
        "diagram/connectors/horizontalConnectorModel",
        "diagram/boxHorizontalNodeMediator",
        "diagram/boxVerticalNodeMediator",
        "diagram/connectors/verticalConnectorModel",
        "utility/idGenerator"
        ],
        function (  NodeWrapper,
                    Node,
                    TypeModel,
                    HorizontalConnectorModel,
                    BoxHorizontalNodeMediator,
                    BoxVerticalNodeMediator,
                    VerticalConnectorModel,
                    idGenerator
                    ) {

    return NodeWrapper.extend({

        initialize : function () {

            this.currentDiagram = null;

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

            this.model.on("create", function () {

                console.log("something was created", arguments);
            });


            this.model.on("receiveRequest", function (typeController) {

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

        createDiagram : function (diagramName, node) {
            /*
                only one diagram can exist at a time
                for the moment anyway!
            */
            if(this.currentDiagram) {
                throw {
                    name : "CoexistingDiagramException",
                    message : "You already have already created a diagram"
                }
            }

            if(node) {


                this.rewriteIds(node);

                this.currentDiagram = this.model.children['diagrams'].createChild(diagramName, node, "diagram");

            }

            else {
                this.currentDiagram = this.model.children['diagrams'].createChild(diagramName, {
                    types : {},
                    connectors : {},
                    notes : {}
                }, "diagram");
            }
        },

        deleteDiagram : function (diagramName) {

            this.model.children['diagrams'].deleteChild(diagramName);

            this.currentDiagram = null;
        },

        toJSON : function () {

            return JSON.stringify(this.model.unwrap(),null, 2);
        },


        set : function (contextPath, name, value) {

            var map = {

                "diagram" : "diagrams",
                "type" : "types",
                "property" : "properties",
                "method" : "methods"
            };

            var context = this.model;
            // navigates to the end of the context path
            // by iterating through pairs of artifactname, artifactvalue
            for(var i = 1; i <= contextPath.length; i += 2) {
                var artifact = map[contextPath[i - 1]];
                context = context.children[artifact].children[contextPath[i]];
            }
            context.children[name].set(value);

        },

        createVerticalConnector : function (diagram) {

            var id = idGenerator.nextId(); //todo id system needs a lot of work : at present there are duplicate ids when you load an existing diagram

            var connectorModel = this.model.children['diagrams']
                .children[diagram]
                .children['connectors']
                .createChild(id,{
                    orientation : "vertical",
                    nodes : {

                        top : {
                            xCood : 300, //todo: need to not have these hard coded
                            yCood : 100,
                            attached : false,
                            attachedBox : "",
                            arrow : {
                                style : "blackConnectArrow",
                                direction : "top"
                            }
                        },

                        secondTop : {
                            xCood : 300,
                            yCood : 200,
                            attached : false,
                            attachedBox : "",
                        },

                        secondBottom : {
                            xCood : 400,
                            yCood : 200,
                            attached : false,
                            attachedBox : "",
                        },

                        bottom : {
                            xCood : 400,
                            yCood : 300,
                            attached : false,
                            attachedBox : "",
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
            var id = idGenerator.nextId();
            var connectorModel = this.model.children['diagrams']
                .children[diagram]
                .children['connectors']
                .createChild( id,{
                    orientation : "horizontal",
                    nodes : {

                        left : {
                            xCood : 100,
                            yCood : 100,
                            attached : false,
                            attachedBox : "",
                            arrow : {
                                style : "blackConnectArrow",
                                direction : "left"
                            }
                        },

                        proximal : {
                            xCood : 200,
                            yCood : 100,
                            attached : false,
                            attachedBox : ""
                        },

                        distal : {
                            xCood : 200,
                            yCood : 300,
                            attached : false,
                            attachedBox : ""
                        },

                        right : {
                            xCood : 400,
                            yCood : 300,
                            attached : false,
                            attachedBox : "",
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

        bannerExists : function () {


            return this.currentDiagram && !!this.model.children.diagrams.children[this.currentDiagram.name].children['banner'];

        },

        createBanner : function (diagram, banner) {

            return this.model.children.diagrams.children[diagram].createChild('banner', {

                title : banner.title,
                description : banner.description,
                author : banner.author,
                width   : banner.width,
                fontSize : "12",
                created : banner.created,
                width : 300,
                fontFamily : "arial",
                paddingHorizontal : 12,
                xCood : banner.xCood,
                yCood : banner.yCood

            });

        },

        createNote : function (diagram) {

            var id = idGenerator.nextId();

            return this.model
                .children.diagrams.children[diagram]
                .children['notes'].createChild(id, {

                    text : "",

                    fontSize : "12",

                    width : 300,

                    fontFamily : "arial",

                    paddingHorizontal : 12,

                    xCood : "0",

                    yCood : "0"

                });

        },

        createType : function (diagram) {

            var id = idGenerator.nextId();

            return this.model.children.diagrams.children[diagram].children.types.createChild(id, {
                name : "default name",
                properties : {
                    testProp : {
                        name : "testProp",
                        visibility : "private",
                        type : "String"
                    }

                },
                flavor : "interface",
                methods : {
                    "doIt": {
                      "name": "doIt",
                      "visibility": "public",
                      "returnType": "void",
                      "args": {

                        "foo" : {
                            name : "foo",
                            type : "String"
                        },
                        "bar" : {
                            name : "bar",
                            type : "Integer"
                        }

                      }
                    },
                    "undoit": {
                      "name": "undoit",
                      "visibility": "public",
                      "returnType": "void",
                      "args": {
                          "bar" : {
                              name : "bar",
                              type : "Integer"
                          }
                      }
                    }
                },
                xCood : 700,
                yCood : 400,
                width : 10,
                height : 10,
                notes : {}
            });

        },

        createArg : function (diagram, type, method, name, value) {
            this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type]
                         .children.methods
                         .children[method]
                         .children['args']
                         .createChild(name, {
                            name : name,
                            type : value
                         });

        },

        deleteArg : function (diagram, type, method, name) {

            return this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type]
                         .children.methods
                         .children[method]
                         .children['args']
                         .deleteChild(name);
        },

        getTypeName : function (diagram, type) {

            return this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type].name;

        },

        getConnectors : function (diagramName) {
            return this.model.children['diagrams']
                            .children[diagramName]
                            .children.connectors
                            .children;

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
                    name : methodName,
                    visibility : "public",
                    returnType : "void",
                    args : []
                });
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

        checkPropertyExists : function (diagram , type, propertyName) {

            return !! (this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['properties']
                .children[propertyName]);
        },

        checkMethodExists : function (diagram , type, methodName) {

            return !!this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .children[methodName]
        },

        checkArgExists : function (diagram , type, method, arg) {
             return !! this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .children[method]
                .children['args']
                .children[arg];

        },

        checkTypeExists : function (diagram, type) {

            return !! this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
        },

        checkConnectorExists : function (diagram, connectorId) {

            return !! this.model
                .children['diagrams']
                .children[diagram]
                .children['connectors']
                .children[connectorId];
        },

        checkDiagramExists : function (diagram) {

            return !! this.model
                .children['diagrams']
                .children[diagram];

        },

        getMethod : function (diagram, type, methodName) {

            return this.model.children.diagrams
                        .children[diagram]
                        .children.types
                        .children[type]
                        .children.methods
                        .children[methodName];

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
    });
});