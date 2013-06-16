
/*  take a command and parse it into an array of tokens */

var commandLineEditor = function () {

    var project;
    var context;
    var contextPath;

    var commands = {

        create : function (artifactType, artifactName) {

            var artifacts = {

                project : function (name) {
                    //  reset project
                    project = {};
                    project.name = name;
                },

                diagram : function (name) {
                    // create diagram if it doesn't already exist. refactor this later.
                    if(!project.diagrams) {
                        project.diagrams = {};
                    }
                    project.diagrams[name] = {
                        name : name ,
                        types : {}
                    };

                },

                type : function (name) {
                    context.types[name] = {
                        name : name,
                        kind : "class",
                        options : {},
                        members : {}
                    }
                },

                interface : function (name) {
                    context.types[name] = {
                        name : name,
                        kind : "interface",
                        options : {},
                        members : {}
                    }

                },

                property : function (name) {
                    if(!context.members.properties) {
                        context.members.properties = {};
                    }
                    context.members.properties[name] = {
                        name : name,
                        visibility : "private",
                        type : "String"
                    };

                },
                method : function (name) {
                    if(!context.members.methods) {
                        context.members.methods = {};
                    }
                    context.members.methods[name] = {
                        name : name,
                        visibility : "public",
                        returnType : "void",
                        args : {}
                    };
                }

            };

            artifacts[artifactType](artifactName);
        },


        shift : function () {},
        use : function () {},
        show : function () {},
        help : function () {}
    }


    return {


        parse : function (command) {

            return command.split(/[\s]+/);
        },

        dispatch : function (commandArray) {

            var commandName = commandArray.shift();

            switch(commandName) {

            case "create" :
                this.create.apply(this, commandArray);
            }
        },

        create : function (artifactType, artifactName) {
            commands.create(artifactType, artifactName);
        },

        shift : function (parentArtifact) {

            switch(parentArtifact) {

            case "diagram" :
                contextPath.splice(2);
                context = project.diagrams[ contextPath[1] ];
                break;

            case "type" :
                contextPath.splice(3);
                context = project.diagrams[contextPath[1]].types[contextPath[3]];
                break;


            }


        },

        use : function (artifactType, artifactName) {
            //"diagram", "barDiagram", "type", "MyClass", "method", "myMethod"
            if(arguments.length > 2) {

                function changeContext() {

                    var bar = Array.prototype.splice.call(arguments, 0, 2);

                    console.log("bar", bar);

                    switch(bar[0]) {

                    case  "diagram" :
                        context = project.diagrams[bar[1]];
                        break;
                    case  "type" :
                        context = context.types[bar[1]];
                        break;
                    case  "method" :
                        context = context.members.methods[bar[1]];
                        break;
                    }

                    if(arguments.length >= 2) {
                        changeContext.apply(null, arguments);
                    }
                }

                changeContext.apply(null, arguments);

            } else {

                switch(artifactType) {

                case "project" :
                    context = project;
                    contextPath = [];
                    break;
                case "diagram" :

                    contextPath = ["diagrams", artifactName];
                    context = project.diagrams[ artifactName ];
                    break;

                case "type" :
                    console.log("use type one : ", context)
                    contextPath.push("types", artifactName);
                    context = project.diagrams[contextPath[1]].types[artifactName];
                    console.log("use type two : ", context)
                    break;

                case "method" :

                    context = context.members.methods[artifactName];
                    break;
                }
            }

        },

        show : function () {

            return JSON.stringify(project, null, " ");
        },

        context : function () {

            return context;
        },

        project : function () {

            return project;
        },

        help : function (command) {
            switch(command) {

            case "create" :
                return "the create command is used to create artifacts";
            }
        }


    }


};
