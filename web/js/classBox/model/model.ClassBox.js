define(['ModelElement',
        'Collection',
        'propertyBuilder' ], function (ModelElement,
                                       Collection,
                                       propertyBuilder) {

    return ModelElement.extend({

        initialize : function (options) {

            ModelElement.prototype.initialize.call(this, options);
            this.set({ properties : [] })
        },

        update : function (x, y) {
            this.updateCoordinates(x, y);
        },

        getPropertyCollection : function () {
            return this.propCollection;
        },

        getWidth : function () {
            return this.get('width')
        },

        setWidth : function (width) {
            this.set({ "width" : width });
        },

        setXCood : function (xCood) {
            this.set({ "xCood" : xCood });
        },

        addProperty : function (property) {
            if(!property) {
                property = propertyBuilder('').visibility("-").build();
            }
            this.get("properties").push(property);
            this._fire("add")
        },

        getProperties : function () {
        },

        updatePropertyVisibility : function (index) {
            var properties = this.get('properties'),
                currentVisibility = properties[index].visibility,
                symbolIndex = this.symbolMap.toIndex[currentVisibility],
                newIndex = ++symbolIndex % 3,
                newSymbol = this.symbolMap.toSymbol[newIndex];

            properties[index].visibility = newSymbol;
            //  this doesn't result in a change event being fired because we've already changed it by
            //  reference.
            // ToDo: Is this an issue also in Backbone?
            this.set({ "properties" : properties });
            this._fire("change")
        },

        symbolMap : {
            toIndex : { '#' : 0, '-' : 1 , '+' : 2 },
            toSymbol : ['#', '-', '+']
        }

    });
});

