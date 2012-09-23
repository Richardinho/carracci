Glenmorangie.namespace("Glenmorangie.module");

Glenmorangie.module.keyHandler = function () {

    $(window).keypress(function (event) {
      currentKey = event.which
    });

    $(window).keyup(function (event) {
      currentKey = null;
    });

}
