define([ 'jquery' ], function ($) {

    "use strict";

    var externalCommands = function(options) {


        var blah = {


            foobar : function (args) {


                console.log("this is foobar", args);
            }
        }

        var foo = {


            sync : function (args) {

                console.log("running sync ", args)

            },

            async : function () {

                console.log("runnin async")

                setTimeout(function () {

                    console.log("timeout completed")

                }, 5000);
            },

            save : function () {}
        };


        return {

            sync : {

                editor : true,

                command : function (args) {

                    this.sync(args)

                    return {

                        message : "this is sync command"
                    }
                },

                context : foo

            },

            async : {

                editor : true,

                command : function (args) {

                    var def = $.Deferred();

                    setTimeout(function () {

                        def.resolve({

                            message : "deferred has been resolved: " + args

                        });

                    }, 5000);

                    return def.promise();
                },

                context : foo
            },

            create : {

                editor : false,

                command : function () {

                    var returnObj = {

                        message : "this is create",

                        editor : false


                    }

                    switch( arguments[0] ) {

                        case "diagram" :

                            returnObj.editor = true;

                        break;

                        case "box" :
                            console.log("box");
                        break;

                        case "connector" :
                            console.log("connector")
                        break;
                    }
                }
            },

            edit : {

                editor : false,

                command : function () {


                    switch(arguments[0]) {

                        case "diagram" :
                            console.log("edit diagram")
                        break;

                        case "box" :
                            console.log("edit box");
                        break;

                        case "connector" :
                            console.log("edit connector");
                        break;
                    }
                }

            },

            show : {

                editor : false,

                command : function () {


                    switch(arguments[0]) {

                        case "" :

                        break;
                    }
                }
            },

            save : {


                editor : false,

                command : function () {

                    console.log("save");
                },

                context : foo
            },

            load : {

                editor : false,

                command : function () {

                    console.log("load")
                }
            },

            examples : {


                editor : false,

                command : function () {

                    console.log("examples")
                }
            },

            export : {

                editor : false,

                command : function () {

                    console.log("export")
                }
            },

            del : {

                editor : false,

                command : function () {

                    console.log("delete")
                }
            }




        };
    }

    return externalCommands;


});