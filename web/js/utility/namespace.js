var Glenmorangie = Glenmorangie || {};


Glenmorangie.namespace = function(nsString) {

    var parts = nsString.split('.'),
        parent = Glenmorangie,
        i;


    //  strip redundant leading global
    if (parts[0] === "Glenmorangie") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i+= 1) {
        //  create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;

}

