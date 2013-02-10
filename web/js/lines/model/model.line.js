Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.Line = Glenmorangie.Model.extend({


    initialize : function (options) {
        Glenmorangie.Model.prototype.initialize.call(this, options);
        this.set({ svgUtils : options.svgUtils});
        this.nodeA = options.nodeA;
        this.nodeB = options.nodeB;
        this.set({ style : "normal" });

        this.update();

        this.nodeA.on('change', this.update, this);
        this.nodeB.on('change', this.update, this);
    },

    update : function () {
        this.set({ x1 : this.nodeA.get('xCood') });
        this.set({ y1 : this.nodeA.get('yCood') });
        this.set({ x2 : this.nodeB.get('xCood') });
        this.set({ y2 : this.nodeB.get('yCood') });
    },

    getPointsArray : function () {
        return [ { x : this.get('x1'), y : this.get('y1')}, { x : this.get('x2'), y : this.get('y2')} ];
    },

    alternateStyle : function () {
        if(this.get("style") === 'normal') {
            this.set({ style : "dashes" });
        } else {
            this.set({ style : "normal" });
        }
    }



});