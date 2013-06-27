define(['BaseType'], function (BaseType) {

    return BaseType.extend({

        initialize : function (options) {
            // pass in model through options.
            this.projects = {};
            this.context = this.projects;
            this.contextPath = [];
            this.typeFactory = options.typeFactory;
            this.listeners = [];
        },

        create : function (artifactType, artifactName) {

            var that = this;

            var artifacts = {

                project : function (name) {
                    //  reset project
                    var project = {
                        name : name,
                        diagrams : {}
                    };

                    that.projects[name] = project;

                },

                diagram : function (name) {

                    // should check that context is project
                    that.context.diagrams[name] = {
                        name : name,
                        types : {}
                    }
                },

                type : function (name) {

                    var type = {

                        name : name,
                        kind : "class",
                        properties : {},
                        methods : {}
                    }
                    //  set type into json
                    that.context.types[name] = type;

                    /*
                        create model, and possible also view and controller which will handle
                        the diagram
                    */

                    var typeModel = that.typeFactory.createType(type)

                    /*
                        attach listener to type which will be called whenever the type is updated.
                    */

                    that.listeners.push(typeModel);
                },

                property : function (name) {

                    that.context.properties[name] = {
                        name : name,
                        visibility : "private",
                        type : ""
                    };
                    that.notifyListeners();
                },

                method : function (name) {

                    that.context.methods[name] = {
                        name : name,
                        visibility : "public",
                        returnType : "void",
                        args : {}
                    };
                }
            };

            artifacts[artifactType](artifactName);
        },


        notifyListeners : function () {

            console.log("notify listeners");

            for(var i = 0; i < this.listeners.length; i++) {
                this.listeners[i]._fire("change");
            }

        },

        shift : function () {

        },

        set : function (artifactName, value) {

            this.context[artifactName] = value;

            this.notifyListeners();
        },

        use : function (artifact, name) {

            if(arguments.length < 2) {

                switch (artifact) {

                case "project":
                    if(this.contextPath.length > 2) {
                        this.contextPath = this.contextPath.splice(0,2);
                        this.context = this.projects[this.contextPath[1]];
                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }
                    break;

                case "diagram":
                    if(this.contextPath.length > 4) {
                        this.contextPath = this.contextPath.splice(0,4);
                        this.context = this.projects[this.contextPath[1]]
                                        .diagrams[this.contextPath[3]];
                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }
                    break;

                case "type":
                    if(this.contextPath.length > 6) {
                        this.contextPath = this.contextPath.splice(0,6);
                        this.context = this.projects[this.contextPath[1]]
                                        .diagrams[this.contextPath[3]]
                                        .types[this.contextPath[5]];
                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }
                    break;
                }

            } else {

                switch (artifact) {

                case "project":
                    if(this.projects[name]) {
                        this.contextPath = ['project', name ];
                        this.context = this.projects[this.contextPath[1]];
                    } else {
                        throw {
                            name : "ArtifactDoesNotExistException",
                            message : "project " + name + " does not exist"
                        }
                    }
                    break;
                case "diagram":
                    if(this.contextPath.length === 2) {
                        if(this.context.diagrams[name]) {
                            this.contextPath.push("diagram");
                            this.contextPath.push(name);
                            this.context = this.context.diagrams[name];
                        } else {
                            throw {
                                name : "ArtifactDoesNotExistException",
                                message : "diagram " + name + " does not exist"
                            }
                        }

                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }
                    break;
                case "type" :

                    if(this.contextPath.length === 4) {
                        if(this.context.types[name]) {
                            this.contextPath.push('type');
                            this.contextPath.push(name);
                            this.context = this.context.types[name];
                        } else {
                            throw {
                                name : "ArtifactDoesNotExistException",
                                message : "type " + name + " does not exist"
                            }
                        }
                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }
                    break;

                case "property" :
                    if(this.contextPath.length === 6) {
                        if(this.context.properties[name]) {
                            this.contextPath.push('property');
                            this.contextPath.push(name);
                            this.context = this.context.properties[name];
                        } else {
                            throw {
                                name : "ArtifactDoesNotExistException",
                                message : "property " + name + " does not exist"
                            }
                        }
                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }

                    break;

                case "method" :
                    if(this.contextPath.length === 6) {
                        if(this.context.methods[name]) {
                            this.contextPath.push('method');
                            this.contextPath.push(name);
                            this.context = this.context.methods[name];
                        } else {
                            throw {
                                name : "ArtifactDoesNotExistException",
                                message : "method " + name + " does not exist"
                            }
                        }
                    } else {
                        throw {
                            name : "IncorrectContextException",
                            message : "context path is not in correct state for this operation"
                        }
                    }

                    break;
                }
            }
        },

        show : function (artifactType, artifactName) {

            if(arguments.length === 0) {
                return JSON.stringify(this.projects);
            } else {
                switch (artifactType) {
                case "project" :
                    return this.projects[artifactName];
                }
            }
        },

        help : function () {

        }
    });
});