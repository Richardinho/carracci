define(function() {

    return function (name) {

        var method = { "name" : name, visibility : "-", args : [] , returnType : "void" };

        return {
            visibility : function (visibility) {

                method.visibility = visibility;
                return this;
            },

            name : function (name) {
                method.name = name;
                return this;
            },

            arg : function (name, type) {
                method.args.push({ "name" : name, "type" : type });
                return this;
            },

            args : function (args) {
                method.args = args
                return this;
            },

            returnType : function (returnType) {
                method.returnType = returnType;
                return this;
            },

            build : function () {
                return method;
            }
        }
    };
});