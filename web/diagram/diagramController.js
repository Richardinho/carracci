define(['core/BaseType', 'canvg'],function (BaseType, canvg) {

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

        remove : function () {

            var artifact = arguments[0];

            switch(artifact) {

            case  "diagram" :
                if(this.contextPath.length === 0) {
                   /* if(this.context[arguments[1]]) {
                        delete this.context[arguments[1]];
                    } else {
                        throw {
                            name : "UnknownArtifactError",
                            message : arguments[1] + " not known : context path is: " + this.contextPath
                        }
                    }*/
                } else {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }
                break;
            case  "type" :

                this.componentFactory.deleteType(arguments[1]);

                break;
            case  "property" :
                if(this.contextPath.length === 4) {
                    /*if(this.context.properties[arguments[1]]) {
                        delete this.context.properties[arguments[1]];
                        this.diagramModel.fire("updatetype", this.context.id);
                    } else {
                        throw {
                            name : "UnknownArtifactError",
                            message : arguments[1] + " not known : context path is: " + this.contextPath
                        }
                    }*/
                } else {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }
                break;
             case "method" :
                console.log("delete method")
                break;

             case "connector" :
                console.log("delete connector")
                this.componentFactory.deleteConnector(arguments[1]);
                //
                break;

            }
        },

        /* manages the contextPath, extending it or reducing it as needed */
        use : function () {
            //todo: test that each artifact actually exists.
            var artifact = arguments[0];

            switch (artifact) {

            case "diagram" :
                if(arguments.length === 2) {
                    if(this.contextPath.length !== 0) {
                        throw {
                            name : "ContextPathError",
                            message : "context path is: " + this.contextPath
                        }
                    }
                    this.contextPath.push("diagram");
                    this.contextPath.push(arguments[1]);
                } else {
                    if(this.contextPath.length > 2) {
                        this.contextPath = this.contextPath.slice(0,2);
                    } else {
                       throw {
                            name : "ContextPathError",
                            message : "context path is: " + this.contextPath
                        }
                    }
                }
                break;
            case "type" :
                if(arguments.length === 2) {
                    if(this.contextPath.length !== 2) {
                        throw {
                            name : "ContextPathError",
                            message : "context path is: " + this.contextPath
                        }
                    }
                    this.contextPath.push("type");
                    this.contextPath.push(arguments[1])
                } else {
                    this.contextPath = this.contextPath.slice(0,4);
                }
                break;
            case "property":
                if(arguments.length === 2) {
                    if(this.contextPath.length !== 4) {
                        throw {
                            name : "ContextPathError",
                            message : "context path is: " + this.contextPath
                        }
                    }

                    this.contextPath.push("property");
                    this.contextPath.push(arguments[1])

                }
                break;
            case "method" :
                if(arguments.length === 2) {
                    if(this.contextPath.length !== 4) {
                        throw {
                            name : "ContextPathError",
                            message : "context path is: " + this.contextPath
                        }
                    }

                    this.contextPath.push("method");
                    this.contextPath.push(arguments[1])
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
                if(arguments[1] === "horizontal") {

                    this.componentFactory.createHorizontalConnector(this.contextPath[1]);

                } else if (arguments[1] === "vertical") {

                    this.componentFactory.createVerticalConnector(this.contextPath[1]);
                }


                break;

            case "diagram" :

                if(this.contextPath.length !== 0) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                this.componentFactory.createDiagram(arguments[1]);

                break;

            case "type" :

                if(this.contextPath.length !== 2) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                this.componentFactory.createType(this.contextPath[1], arguments[1]);

                break;
            case "property":

                if(this.contextPath.length !== 4) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                this.componentFactory.createProperty(this.contextPath[1],this.contextPath[3], arguments[1]);

                break;
            case "method" :

                if(this.contextPath.length !== 4) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                this.componentFactory.createMethod(this.contextPath[1], this.contextPath[3], arguments[1]);

                break;

            default :
                throw {
                    name : "UnknownArtifactError",
                    message : artifact + " not known"
                }
            }

            return "you have created " + artifact + " " + arguments[1];
        },

        export : function () {

            var format = arguments[0];

            switch (format) {

            case "jpeg":
                console.log("jpeg")
            break;
            case "png":
                console.log("png")

                var canvas = document.createElement('canvas');
                canvas.width = 1000;
                canvas.height = 800;
                var svg = $('<div>').append($('svg').clone()).html();

                canvg(canvas,svg );

                var dataURL = canvas.toDataURL()

                window.open(dataURL,'mywindow')
            break;

            default :
                throw {
                    name : "FormatNotSupportedException",
                    message : format + " is not supported"
                }
            }
        },

        set : function () {

            if(this.contextPath.length < 4) {

                throw {

                    name : "ContextPathError",
                    message : "no value can be set at this context"
                }
            }

            else if(this.contextPath.length === 4) {

                if(arguments[0] === "flavor") {

                    this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                } else {
                    throw {

                        name : "ArgumentNotKnown",
                        message : arguments[0] + " is not a valid property"
                    }
                }
            }
            else if(this.contextPath.length === 6) {
                if(this.contextPath[4] === "property") {
                    // at property context
                    if(arguments[0] === "visibility") {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                    } else if(arguments[0] === "type")  {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                    } else {
                        throw {
                            name : "ArgumentNotKnown",
                            message : arguments[0] + " is not a valid property"
                        }
                    }
                } else if(this.contextPath[4] === "method") {

                   if(arguments[0] === "visibility") {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                    } else if(arguments[0] === "returnType")  {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                    } else if(arguments[0] === "args") {
                        this.diagramModel.set(this.contextPath, arguments[0], arguments[1])
                    } else {
                        throw {
                            name : "ArgumentNotKnown",
                            message : arguments[0] + " is not a valid property"
                        }
                    }
                }

            }



        },
        // don't like the name of this, but so we don't have clash with contextPath.
        // todo: have a mapping  to translate between functions in this type and functions called by editor.
        // perhaps an adapter type?
        con : function () {

            return this.contextPath.join(" ");
        },

        show : function () {

            var json =  this.diagramModel.toJSON();
            // todo would be better to return an object here including the message and configuratoin paramers
            // and let the editor format it as it likes.
            return "<pre>" + json + "</pre>"
        },

        load : function (diagram) {
            // check if a diagram is currently loaded.
            if(!this.diagramModel.currentDiagram) {
                //  get json from server
                var that = this;
                $.getJSON('/diagrams/test2.json', function(data) {
                    that.componentFactory.createDiagram(diagram, data);

                });

            } else {

                throw {
                    name : "AttemptToCreateNewDiagramError",
                    message : "You already have an existing diagram. Delete this " +
                                "first before creating a new diagram"
                }
            }

        },

        help : function () {

            var deferred = $.Deferred();

            $.when($.ajax({

                url: "/help/testHelp.html",
                dataType: "html"

            })).then(function (data) {

                deferred.resolve({

                    message : data
                });
            });

            return deferred;
        }



    });
});