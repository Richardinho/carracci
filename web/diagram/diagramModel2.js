define(["core/BaseType",
        "utility/eventNode",
        "diagram/types/typeModel",
        "diagram/connectors/horizontalConnectorModel",
        "diagram/boxHorizontalNodeMediator",
        "diagram/boxVerticalNodeMediator",
        "diagram/connectors/verticalConnectorModel",
        "utility/idGenerator"],
        function (  BaseType,
                    Node,
                    TypeModel,
                    HorizontalConnectorModel,
                    BoxHorizontalNodeMediator,
                    BoxVerticalNodeMediator,
                    VerticalConnectorModel,
                    idGenerator) {

    return BaseType.extend({

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

        toJSON : function () {

            return JSON.stringify(this.model.unwrap(),null, 2);
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

                this.currentDiagram = this.model.children['diagrams'].createChild(diagramName, node);
            }
            else {
                this.currentDiagram = this.model.children['diagrams'].createChild(diagramName, {
                    types : {},
                    connectors : {}
                });
            }
        },

        deleteDiagram : function (diagramName) {
            debugger;
            this.model.children['diagrams'].deleteChild(diagramName);

            this.currentDiagram = null;
        },
        set : function (contextPath, name, value) {

            var map = {

                "diagram" : "diagrams",
                "type" : "types",
                "property" : "properties",
                "method" : "methods"
            };

            var context = this.model;

            for(var i = 1; i <= contextPath.length; i += 2) {
                var artifact = map[contextPath[i - 1]];
                context = context.children[artifact].children[contextPath[i]];
            }
            context.children[name].set(value);

        },

        createVerticalConnector : function (diagram) {

            var id = idGenerator.nextId();
            var connectorModel = this.model.children['diagrams']
                .children[diagram]
                .children['connectors']
                .createChild(id,{
                    orientation : "vertical",
                    nodes : {

                        top : {
                            xCood : 300,
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

        createType : function (diagram, typeName) {

            return this.model.children.diagrams.children[diagram].children.types.createChild(typeName, {

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

        checkPropertyExists : function (diagram , type, propertyName) {
            if( this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['properties']
                .children[propertyName] !== undefined ) {

                return true;
            } else {
                return false;
            }
        },

        checkMethodExists : function (diagram , type, methodName) {
            if( this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type]
                .children['methods']
                .children[methodName] !== undefined ) {

                return true;
            } else {
                return false;
            }
        },

        checkTypeExists : function (diagram, type) {

            if( this.model
                .children['diagrams']
                .children[diagram]
                .children['types']
                .children[type] !== undefined ) {

                return true;
            } else {
                return false;
            }
        },

        checkDiagramExists : function (diagram) {

            if(this.model
                .children['diagrams']
                .children[diagram] !== undefined
            ) {
                return true;
            } else {
                return false;
            }
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
        },

        setPropertyName : function() {

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