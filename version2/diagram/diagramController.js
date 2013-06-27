define(['core/BaseType'],function (BaseType) {

    /* show handle processing commands including parsing and delegation, and keeping track of the context */

    return BaseType.extend({

        initialize : function (options) {
            this.diagramModel = options.diagramModel;
            this.TypeView = options.TypeView;
            this.TypeController = options.TypeController;
            this.contextPath = [];
            this.context = this.diagramModel.diagrams;
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

        },

        parseCommand : function (command) {
            return command.split(/[\s]+/);
        },

        _delete : function () {

        },

        use : function () {

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
                    this.contextPath.push(arguments[1])
                    this.context = this.context[arguments[1]];
                } else {
                    this.contextPath = this.contextPath.slice(0,2);
                    this.context = this.diagramModel.diagrams[arguments[1]];
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
                    this.context = this.diagramModel.diagrams[this.contextPath[1]].types[arguments[1]];
                } else {
                    this.contextPath = this.contextPath.slice(0,4);
                    this.context = this.diagramModel.diagrams[this.contextPath[1]].types[this.contextPath[3]];
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
                    this.context = this.diagramModel.diagrams[this.contextPath[1]]
                        .types[this.contextPath[3]]
                        .properties[this.contextPath[5]];
                } else {
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
                    this.context = this.diagramModel.diagrams[this.contextPath[1]]
                        .types[this.contextPath[3]]
                        .methods[this.contextPath[5]];
                } else {
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
            case "diagram" :
                if(this.contextPath.length !== 0) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                this.diagramModel.createDiagram( arguments[1]);



                break;
            case "type" :
                if(this.contextPath.length !== 2) {
                    throw {
                        name : "ContextPathError",
                        message : "context path is: " + this.contextPath
                    }
                }

                var id = this.diagramModel.createType( this.contextPath[1], arguments[1]);

                var typeView = new this.TypeView({
                    model : this.diagramModel,
                    id : id
                });

                new this.TypeController({
                    model : this.diagramModel,
                    view : typeView,
                    id : id
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

                this.diagramModel.fire("updatetype", this.context.id);
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
            if(!this.context[name]) {
                throw {
                    name : "UnknownArtifactError",
                    message : name + " not known : context path is: " + this.contextPath
                }
            } else {
                this.context[name] = value;

                this.diagramModel.set();
            }
        },

        con : function () {

            return this.contextPath;
        },

        show : function () {
            console.log(this.context)
            return "show this"
        }



    });
});