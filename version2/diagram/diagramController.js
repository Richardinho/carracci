define(['core/BaseType'],function (BaseType) {

    /* show handle processing commands including parsing and delegation, and keeping track of the context */

    return BaseType.extend({

        initialize : function (options) {

            this.diagramModel = options.diagramModel;
            this.TypeView = options.TypeView;
            this.TypeController = options.TypeController;
            this.horizontalConnectorFactory = options.horizontalConnectorFactory;
            this.verticalConnectorFactory = options.verticalConnectorFactory;

            this.contextPath = [];

        },

        process : function (command) {

            var commandArray = this.parseCommand(command);

            var verb = commandArray.shift();

            if(verb === "delete") {
                verb = "_delete";
            }

            if(this[verb]) {
                return this[verb].apply(this, commandArray);
            } else {
                throw {
                    name : "UnknownCommandError",
                    message : verb + " does not exist"
                }
            }
        },

        foo : function () {
            this.create('diagram','foo');
            this.use('diagram','foo');
            this.create('type','Bar');

            this.create('connector', 'vertical');

        },



        parseCommand : function (command) {
            return command.split(/[\s]+/);
        },

        _delete : function () {

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
                if(this.contextPath.length === 2) {
                   /* if(this.context.types[arguments[1]]) {

                        this.diagramModel.deleteType(
                            this.contextPath[1],
                            arguments[1],
                            this.context.types[arguments[1]].id
                        );
                        this.diagramModel.fire("deletetype", id);

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


            }
        },

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

        typecache : function () {

            console.log(this.diagramModel.typeCache);
        },

        create : function () {

            var artifact = arguments[0];

            switch (artifact) {

            case "connector" :
                if(arguments[1] === "horizontal") {

                    var horizontalConnectorModel = this.diagramModel.createHorizontalConnector(this.contextPath[1]);

                    //  this factory creates all the necessary node and line controllers and views
                    this.horizontalConnectorFactory.create(horizontalConnectorModel);

                } else if (arguments[1] === "vertical") {

                    var verticalConnectorModel = this.diagramModel.createVerticalConnector(this.contextPath[1]);
                    this.verticalConnectorFactory.create(verticalConnectorModel)


                }


                break;

            case "diagram" :

                if(this.contextPath.length !== 0) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }
                this.diagramModel.createDiagram( arguments[1] );

                break;

            case "type" :

                if(this.contextPath.length !== 2) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }
                // create type should return the type itself.
                var typeModel = this.diagramModel.createType( this.contextPath[1], arguments[1] );

                var typeView = new this.TypeView({
                    model : typeModel,
                });

                new this.TypeController({
                    model : typeModel,
                    view : typeView
                });

                break;
            case "property":

                if(this.contextPath.length !== 4) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                this.diagramModel.createProperty(this.contextPath[1],
                                                 this.contextPath[3],
                                                 arguments[1]);

                break;
            case "method" :

                if(this.contextPath.length !== 4) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }
                this.diagramModel.createMethod(  this.contextPath[1],
                                                 this.contextPath[3],
                                                 arguments[1]);
                break;

            default :
                throw {
                    name : "UnknownArtifactError",
                    message : artifact + " not known"
                }
            }
        },

        set : function (name, value) {
           /* if(!this.context[name]) {
                throw {
                    name : "UnknownArtifactError",
                    message : name + " not known : context path is: " + this.contextPath
                }
            } else {
                this.context[name] = value;
                var id = this.diagramModel.diagrams[this.contextPath[1]].types[this.contextPath[3]].id;
                console.log("set id : ", id);
                this.diagramModel.fire("updatetype", id);
            }*/
        },

        con : function () {

            return this.contextPath;
        },

        show : function () {

        }



    });
});