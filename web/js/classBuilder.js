Glenmorangie.namespace("Glenmorangie.stubData");


Glenmorangie.stubData.ClassBuilder = function () {

    var name = "",
        properties = [],
        methods = [],
        interfaces = [],
        id,
        x, y,
        parent = "Object";


    return {
        name : function (classname) {
            name = classname;
            return this;
        },

        extends : function (parentClass) {
            parent = parentClass;
            return this;
        },

        implements : function (interface) {
            interfaces.push(interface);
            return this;
        },

        property : function (property) {
            properties.push(property);
            return this;
        },

        method : function (method) {
            methods.push(method);
            return this;
        },

        id : function (i) {
            id = i;
            return this;
        },

        x : function (xval) {
            x = xval;
            return this;
        },

        y : function (yval) {
            y = yval;
            return this;
        },

        build : function () {

            var classObj = {};

            classObj.name = name;

            classObj.parent = parent;

            if (interfaces.length > 0) {
                classObj.interfaces = interfaces;
            }

            if (properties.length > 0) {
                classObj.properties  = properties;
            }

            if (methods.length > 0) {
                classObj.methods = methods;
            }

            if (x) {
                classObj.x = x;
            }

            if (y) {
                classObj.y = y;
            }

            classObj.id = id;

            return classObj;
        }
    }
};

Glenmorangie.stubData.PropertyBuilder = function () {

    var visibility = "private",
        name = "",
        type = "Object";

    return {

        name : function (propName) {
            name = propName
            return this;
        },

        visibility : function (vis) {
            visibility = vis;
            return this;
        },

        type : function (proptype) {
            type = proptype;
            return this;
        },

        build : function () {

            var property = {};

            property.visibility = visibility;

            property.name = name;

            property.type = type;

            return property;
        }
    };
};


Glenmorangie.stubData.MethodBuilder = function () {
    var visibility = "public",
        name = "",
        returnType = "void",
        args = [];


    return {


        name : function (methodName) {
            name = methodName;
            return this;
        },

        visibility : function (vis) {
            visibility = vis;
            return this;
        },

        returnType: function (type) {
            returnType = type;
            return this;
        },

        argument : function (arg) {
            args.push(arg);
            return this;
        },

        build : function() {

            var method = {};

            method.name = name;

            method.visibility = visibility;

            method.returnType = returnType;

            method.args = args;

            return method;
        }
    }
}

Glenmorangie.stubData.MethodArgBuilder = function () {

    var name = "",
        type = "Object";

    return {

        name : function (argName) {
            name = argName;
            return this;
        },

        type : function (argType) {
            type = argType;
            return this;
        },

        build : function () {
            var arg = {};

            arg.name = name;

            arg.type = type;

            return arg;
        }
    }
}









