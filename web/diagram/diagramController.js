define(['BaseType', 'canvg'],function (BaseType, canvg) {

    /*
        this type has the role of supplying commands which are called by the editor.
        It delegates to the diagram model for creating the model, and to the component factory
        for creating wrapper objects. It also keeps track through the context path of the users
        current place within the model.
     */

    return BaseType.extend({

        initialize : function (options) {

            this.diagramModel = options.diagramModel;

            this.contextPath = [];
            this.componentFactory = options.componentFactory;
        },
        // remove, use, create, export, set, con, show, load, help

        // for editing

        remove : function () {

            var artifact = arguments[0];

            switch(artifact) {

            case  "diagram" :
                if(this.diagramModel.checkDiagramExists(
                    arguments[1]
                )) {

                    this.componentFactory.deleteDiagram(arguments[1]);
                    this.contextPath = [];
                    return Promise.resolve("diagram has been deleted");
                } else {
                    return Promise.reject("this diagram does not exist" + arguments[1]);
                }
                break;
            case  "type" :
                if(this.contextPath.length === 2) {

                    if(this.diagramModel.checkTypeExists(
                        this.contextPath[1],
                        arguments[1]
                    )) {

                        this.componentFactory.deleteType(arguments[1]);
                        return Promise.resolve("type deleted");

                    } else {
                        return Promise.reject("This type does not exist");
                    }
                } else {
                    return Promise.reject("Context path is in incorrect state for this action");
                }

                break;
            case  "property" :
                if(this.contextPath.length === 4) {


                    if( this.diagramModel.checkPropertyExists(
                            this.contextPath[1],
                            this.contextPath[3],
                            arguments[1]
                    )) {

                        this.diagramModel.deleteProperty(
                            this.contextPath[1],
                            this.contextPath[3],
                            arguments[1]
                        ).fire("deleteProperty");

                        return Promise.resolve("deleted property");
                    } else {

                       return Promise.reject("this property does not exist");
                    }

                } else {
                    return Promise.reject("Context path is in incorrect state for this action");
                }
                break;
            case "method" :
                if(this.contextPath.length === 4) {

                    if( this.diagramModel.checkMethodExists(
                            this.contextPath[1],
                            this.contextPath[3],
                            arguments[1]
                    )) {
                        this.diagramModel.deleteMethod(
                            this.contextPath[1],
                            this.contextPath[3],
                            arguments[1]
                        ).fire("deleteMethod");
                        return Promise.resolve("deleted method");
                    } else {

                        return Promise.reject("this method does not exist");
                    }

                } else {
                    return Promise.reject("Context path is in incorrect state for this action");

                }
                break;
            case "arg" :
                if(this.contextPath.length === 6 && this.contextPath[4] === "method") {
                    if(this.diagramModel.checkArgExists(
                            this.contextPath[1],
                            this.contextPath[3],
                            this.contextPath[5],
                            arguments[1]
                    )) {

                        this.diagramModel.deleteArg(
                            this.contextPath[1],
                            this.contextPath[3],
                            this.contextPath[5],
                            arguments[1]).fire("deleteArgs");

                            return Promise.resolve("deleted argument");
                    } else {

                        return Promise.reject("this argument does not exist");
                    }

                } else {
                    return Promise.reject("Context path is in incorrect state for this action");
                }
                break;

             case "connector" :
                if( this.contextPath.length >=2 ) {
                    if(this.diagramModel.checkConnectorExists(
                            this.contextPath[1],
                            arguments[1]
                    )) {

                        this.componentFactory.deleteConnector(arguments[1]);

                        return Promise.resolve("this connector has been deleted");
                    } else {
                        return Promise.reject("this connector does not exist");
                    }
                } else {
                    return Promise.reject("You must be using a diagram to delete a connector");
                }
                break;

             default :

                return Promise.reject("no such artifact type");

            }

            return Promise.resolve("should not get here");
        },

        /* manages the contextPath, extending it or reducing it as needed */
        use : function () {
            //todo: test that each artifact actually exists.
            var artifact = arguments[0];

            switch (artifact) {

            case "diagram" :

                if(arguments.length === 2) {
                    if(this.contextPath.length !== 0) {

                        return Promise.reject("Cannot navigate to diagram context from this point in context tree");
                    }
                    if(this.diagramModel.checkDiagramExists(arguments[1])) {
                        this.contextPath.push("diagram");
                        this.contextPath.push(arguments[1]);
                    }  else {

                        return Promise.reject("diagram does not exist");
                    }
                    return Promise.resolve("context path has been updated: " +  this.contextPath);

                } else {
                    // we want to got towards the root of the context tree
                    if(this.contextPath.length > 2) {
                        this.contextPath = this.contextPath.slice(0,2);
                        return Promise.resolve("context path updated " +  this.contextPath);
                    } else {
                        return Promise.reject("You must supply an artifact type and the name of it");
                    }
                }
                break;
            case "type" :
                if(arguments.length === 2) {

                    if(this.contextPath.length !== 2) {

                        return Promise.reject("Context path is in incorrect state for this action");
                    }

                    if(this.diagramModel.checkTypeExists(
                        this.contextPath[1],
                        arguments[1]
                    )){

                        this.contextPath.push("type");
                        this.contextPath.push(arguments[1])

                        return Promise.resolve("context path has been updated: " + this.contextPath);

                    }  else {

                        return Promise.reject("this artifact does not exist" + arguments[1]);

                    }
                } else if(this.contextPath.length > 4) {

                    this.contextPath = this.contextPath.slice(0,4);
                    return Promise.resolve("context path has been updated: " + this.contextPath);
                } else {

                     return Promise.reject("Context path is in incorrect state for this action");
                }
                break;
            case "property":

                if(arguments.length === 2) {
                    if(this.contextPath.length !== 4) {
                        return Promise.reject("Context path is in incorrect state for this action");
                    }
                    if( this.diagramModel.checkPropertyExists(
                        this.contextPath[1],
                        this.contextPath[3],
                        arguments[1]
                    )) {

                        this.contextPath.push("property");
                        this.contextPath.push(arguments[1]);
                        return Promise.resolve("context path has been updated: " + this.contextPath);

                    } else {
                        return Promise.reject("This property does not exist");
                    }
                } else {

                    return Promise.reject("You must supply type 'property' and a property name");
                }
                break;
            case "method" :
                if(arguments.length === 2) {
                    if(this.contextPath.length !== 4) {
                        return Promise.reject("Context path is in incorrect state for this action");
                    }
                    if( this.diagramModel.checkMethodExists(
                                            this.contextPath[1],
                                            this.contextPath[3],
                                            arguments[1]
                                        )) {

                        this.contextPath.push("method");
                        this.contextPath.push(arguments[1]);
                        return Promise.resolve("context path has been updated: " + this.contextPath);
                    } else {
                        return Promise.reject("This method does not exist");
                    }
                } else {

                    return Promise.reject("You must supply type 'method' and a method name");
                }
                break;
            default :
                throw {
                    name : "UnknownArtifactError",
                    message : artifact + " not known"
                }
            }



        },

        create : function () {

            var artifact = arguments[0];

            switch (artifact) {


            case "connector" :


                if (
                    this.contextPath[1] &&
                    this.diagramModel.checkDiagramExists(this.contextPath[1])
                ) {

                    if(arguments[1] === "horizontal") {

                        this.componentFactory.createHorizontalConnector(this.contextPath[1]);
                        return Promise.resolve("connector created");

                    } else if (arguments[1] === "vertical") {

                        this.componentFactory.createVerticalConnector(this.contextPath[1]);
                        return Promise.resolve("connector created");

                    } else {

                        return Promise.reject("2nd argument must be 'horizontal' or 'vertical'");
                    }

                } else {

                    return Promise.reject("A diagram must exist in order to create a connector");

                }

                break;

            case "diagram" :

                if(this.contextPath.length !== 0) {

                    throw {
                        name : "ContextPathException",
                        message : "context path is: " + this.contextPath
                    }
                }

                if( arguments[1] && arguments[1] !== "") {

                    this.componentFactory.createDiagram(arguments[1]);

                } else {

                    throw {
                        name : "IncorrectArgumentException",
                        message : "You must supply a diagram name"
                    }
                }

                break;

            case "type" :

                if(this.contextPath.length !== 2) {

                    return Promise.reject("Context path is in incorrect state for this action");

                }

                if( arguments[1] && arguments[1] !== "") {

                    this.componentFactory.createType(this.contextPath[1], arguments[1]);

                    return Promise.resolve("type created");

                } else {

                    return Promise.reject("You must provide a type name");
                }
                break;
            case "property":

                if(this.contextPath.length !== 4) {
                    return Promise.reject("Context path is in incorrect state for this action");
                }
                if( arguments[1] && arguments[1] !== "") {

                    this.componentFactory
                        .createProperty(
                            this.contextPath[1],
                            this.contextPath[3],
                            arguments[1]);

                    return Promise.resolve("property created");

                } else {
                    return Promise.reject("You must provide a property name");
                }

                break;
            case "method" :

                if(this.contextPath.length !== 4) {

                    return Promise.reject("Context path is in incorrect state for this action");
                }
                if( arguments[1] && arguments[1] !== "") {

                    this.componentFactory
                        .createMethod(
                            this.contextPath[1],
                            this.contextPath[3],
                            arguments[1]);

                    return Promise.resolve("property created");

                } else {

                    return Promise.reject("You must provide a method name");
                }

                break;

            case "arg" :

                if(this.contextPath.length !== 6 && this.contextPath[4] !== "method") {
                    return Promise.reject("Context path is in incorrect state for this action");
                }

                if(arguments[1] && arguments[2]) {

                    // should we go through the componentFactory for this?
                    this.diagramModel.createArg(
                        this.contextPath[1],
                        this.contextPath[3],
                        this.contextPath[5],
                        arguments[1],
                        arguments[2]
                    );

                    return Promise.resolve("created arg");

                } else {

                    return Promise.reject("You must supply an argument name and value");
                }

                break;

            default :
                return Promise.reject("unknown type");
            }

        },

        export : function () {

            var format = arguments[0];

            switch (format) {

            case "jpeg":
                console.log("jpeg not yet supported")
            break;
            case "png":

                var canvas = document.createElement('canvas');
                canvas.width = 1000;
                canvas.height = 800;
                var svg = $('<div>').append($('svg').clone()).html();

                canvg(canvas,svg );

                var dataURL = canvas.toDataURL()

                window.open(dataURL,'mywindow')
            break;

            default :

                return Promise.reject(format + " is not supported");
            }
            return Promise.resolve("exported to " + format);
        },

        set : function () {

            if(this.contextPath.length < 4) {

                return Promise.reject("no value can be set at this context");
            }

            else if(this.contextPath.length === 4) {

                if(arguments[0] === "flavor") {
                     // todo: need to check that second argument is one of 'interface' or 'abstract'
                    this.diagramModel.set(this.contextPath, arguments[0], arguments[1]);
                    return Promise.resolve("You have set the flavor to : " + arguments[1]);

                } else {

                    return Promise.reject(arguments[0] + " is not a valid property");
                }
            }
            else if(this.contextPath.length === 6) {

                if(this.contextPath[4] === "property") {
                    // at property context
                    if(arguments[0] === "visibility") {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                        return Promise.resolve("you have set visibility");
                    } else if(arguments[0] === "type")  {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                        return Promise.resolve("you have set type");
                    } else {

                        return Promise.reject(arguments[0] + " is not a valid property");
                    }

                } else if(this.contextPath[4] === "method") {

                    if(arguments[0] === "visibility") {

                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1]);
                        return Promise.resolve("you have set visibility");

                    } else if( arguments[0] === "returnType" )  {

                        this.diagramModel.set( this.contextPath, arguments[0], arguments[1] );
                        return Promise.resolve("you have set return type");

                    } else {

                        return Promise.reject(arguments[0] + " is not a valid property");
                    }
                }
            }
        },

        con : function () {

            return this.contextPath.join(" ");
        },

        show : function () {

            return "<pre>" + this.diagramModel.toJSON() + "</pre>"
        },

        /*
            loads diagram by name. Throws an error if there is no such diagram currently loaded.
        */
        load : function (diagram) {
            // check if a diagram is currently loaded.

            if(!this.diagramModel.currentDiagram) {
                //  get json from server
                var that = this;

                var promise = Promise.resolve($.getJSON('/diagrams/' + diagram +'.json'));

                return promise.then(function (data) {

                    that.componentFactory.createDiagram(diagram, data);

                    return "diagram was created";

                }, function (err) {

                    return "diagram not found";

                });


            } else {

                return Promise.reject('You already have a loaded diagram');
            }

        }



    });
});