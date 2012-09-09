Glenmorangie.namespace("Glenmorangie.utils");

Glenmorangie.utils.getClassId = function (event) {
    return $(event.target).attr('data-class-id');
}

Glenmorangie.utils.getPropertyId = function (event) {
    return $(event.target).attr('data-property-id');
}

Glenmorangie.utils.getMethodId = function (event) {
    return $(event.target).attr('data-method-id');
}

Glenmorangie.utils.getArgumentId = function (event) {
    return $(event.target).attr('data-arg-id');
}

Glenmorangie.utils.formatVisibility = function (visibility, label) {
    if (visibility === label) {
        return "checked='checked'";
    } else {
        return "";
    }
}

