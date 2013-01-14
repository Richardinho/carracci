Glenmorangie.namespace("Glenmorangie.utils");

Glenmorangie.utils.extend = function (template) {

    var F = function(options) {

        if(this.initialize && typeof this.initialize === "function") {
            if(options) {
                this.initialize(options);
            } else {
                this.initialize();
            }

        }
    }

    var Proxy = function () {};
    Proxy.prototype = this.prototype;
    F.prototype = new Proxy();

    for(obj in template) {
        if(template.hasOwnProperty(obj)) {
            F.prototype[obj] = template[obj];
        }
    }

    F.extend = this.extend;

    return F;


}