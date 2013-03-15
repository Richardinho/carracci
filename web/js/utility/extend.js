define(['componentContainer', 'IDGenerator'],function (componentContainer, IDGenerator) {
    var obj = {};
    obj.extend = function (template) {

        var F = function(options) {

            this.id = IDGenerator.getNextId();

            if(this.initialize && typeof this.initialize === "function") {
                if(options) {
                    this.initialize(options);
                } else {
                    this.initialize(options);
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
    };

    return obj;
});


