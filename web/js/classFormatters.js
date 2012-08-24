Glenmorangie.namespace("Glenmorangie.formatters");

Glenmorangie.formatters.formatClassName = function (classObject) {

    var result = classObject.name,
        interfacesLength,
        i;

    if (classObject.parent != undefined && classObject.parent != "Object") {
        result += " extends " + classObject.parent;
    }

    if (classObject.interfaces) {
        result += " implements ";
        for (i = 0; interfacesLength = classObject.interfaces.length, i < interfacesLength; i++) {
            result += classObject.interfaces[i];
            if (i != interfacesLength - 1) {
                result += ", "
            }
        }
    }
    return result;

};

Glenmorangie.formatters.getVisibility = function (visibility)  {
    var vis;

    switch(visibility) {
        case "public" :
            vis = "+";
            break;
        case "protected" :
            vis = "#";
            break;
        case "private" :
            vis = "-";
            break;
    }
    return vis;
}

Glenmorangie.formatters.formatProperty = function (property) {
    var visibility = Glenmorangie.formatters.getVisibility(property.visibility),
        result = "";

    result += visibility + " ";
    result += property.name;
    if (property.type && property.type !== 'Object') {
        result += " : " + property.type;
    }
    return result;

};

Glenmorangie.formatters.formatMethod = function (method) {

    var visibility = Glenmorangie.formatters.getVisibility(method.visibility),
        result = "";

    result += visibility + " ";
    result += method.name;
    result += " (";

    if (method.args && method.args.length > 0) {
        var i,
            args="";
        for (i = 0; i < method.args.length; i++){

            if (typeof method.args[i] === "String") {
                args += method.args[i];
            } else {
                args += method.args[i].name + ":" + method.args[i].type;
            }
            if (i !== (method.args.length -1)) {
                args += ","
            }
        }
        result += args;

    }
    result += ") ";

    result += " : ";
    result += method.returnType;

    return result;




};