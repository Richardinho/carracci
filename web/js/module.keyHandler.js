Glenmorangie.namespace("Glenmorangie.module");

Glenmorangie.module.currentKey = null;

Glenmorangie.module.keyHandler = function () {

    $(window).keypress(function (event) {
        Glenmorangie.module.currentKey = event.which
    });

    $(window).keyup(function (event) {
        Glenmorangie.module.currentKey = null;
        Glenmorangie.module.askingToAttachNode = false
    });

}
