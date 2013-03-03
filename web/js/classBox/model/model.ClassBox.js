
define(['ModelElement',
        'Collection',
        'propertyBuilder' ], function (ModelElement,
                                       Collection,
                                       propertyBuilder) {

    return ModelElement.extend({

        initialize : function (options) {

            ModelElement.prototype.initialize.call(this, options);
            this.set({ name : options.name });
            this.set({ properties : new Collection([]) });
            this.set({ id : options.id });
            this.set({ width : options.width });
            this.set({ height : options.height });
        },

        translate : function (dx, dy) {

            this.set({ "XMoved" : dx + this.get("startX") },{ silent : true });
            this.set({ "YMoved" : dy + this.get("startY") },{ silent : true });
            this._fire("change:move");
        },

        updateDimensions : function (height, width) {
            this.set({ "width" : width }, { silent : true });
            this.set({ "height" : height }, { silent : true });
            this.updateCoordinates(this.get("xCood"), this.get("yCood"), true);
            this._fire("change:dimensions");
        },

        deleteProperty : function (index) {
            var properties = this.get('properties');
            properties.delete(index);
            this._fire("change:delete")
        },

        changeClassName : function ( newName) {
            this.set({ name : newName });
            //this._fire("changeText");
        },

        updatePropertyName : function (index, newName) {
            var properties = this.get('properties');
            properties.get(index).name = newName;
            this.set({"properties" : properties}, { silent : true });

            this._fire("changeText", index)
        },

        updatePropertyType : function (index, newType) {
            var properties = this.get('properties');
            properties.get(index).type = newType;
            this.set({"properties" : properties}, { silent : true });

            this._fire("changeText", index)
        },

        getPropertyCollection : function () {
            return this.propCollection;
        },

        getWidth : function () {
            return this.get('width')
        },

        setWidth : function (width) {
            this.set({ "width" : width }, { silent : true});
        },

        setHeight : function (height) {
            this.set({ "height" : height }, { silent : true});
        },

        setXCood : function (xCood) {
            this.set({ "xCood" : xCood });
        },

        addProperty : function (property) {
            if(!property) {
                property = propertyBuilder('').visibility("-").build();
            }
            this.get("properties").add(property);
            this._fire("change:add")
        },

        updatePropertyVisibility : function (index) {
            var properties = this.get('properties'),
                currentVisibility = properties.get(index).visibility,
                symbolIndex = this.symbolMap.toIndex[currentVisibility],
                newIndex = ++symbolIndex % 3,
                newSymbol = this.symbolMap.toSymbol[newIndex];

            properties.get(index).visibility = newSymbol;
            //  this doesn't result in a change event being fired because we've already changed it by
            //  reference.
            // ToDo: Is this an issue also in Backbone?
            this.set({ "properties" : properties }, { silent : true });
            this._fire("change:visibility", index);
        },

        symbolMap : {
            toIndex : { '#' : 0, '-' : 1 , '+' : 2 },
            toSymbol : ['#', '-', '+']
        }

    });
});

