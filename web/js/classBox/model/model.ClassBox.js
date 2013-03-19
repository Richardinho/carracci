
define(['ModelElement',
        'Collection',
        'propertyBuilder',
        'methodBuilder'], function (ModelElement,
                                       Collection,
                                       propertyBuilder,
                                       methodBuilder ) {

    return ModelElement.extend({

        initialize : function (options) {

            ModelElement.prototype.initialize.call(this, options);
            this.set({ name : options.name });
            this.set({ properties : new Collection([])});
            this.set({ methods : new Collection([])});
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
            //  hack to get node on right edge to reposition itself
            //this.updateCoordinates(this.get("xCood"), this.get("yCood"), true);
            this.updateAssociatedComponents();
            // this is for the benefit of this models view.
            this._fire("change:dimensions");
        },

        deleteMember : function (index) {
            var data = this._extractData(index);

            if(data.text === "method") {
                this._deleteMethod(data.index);
            } else {
                this._deleteProperty(data.index);
            }
        },

        _deleteMethod : function (index) {
            var methods = this.get('methods');
            methods.delete(index);
            this._fire("change:delete")
        },

        _deleteProperty : function (index) {
            var properties = this.get('properties');
            properties.delete(index);
            this._fire("change:delete")
        },

        changeClassName : function ( newName) {
            this.set({ name : newName });
            //this._fire("changeText");
        },

        updateMethodName : function (data, newName) {
            var methods = this.get('methods');
            var data = this._extractData(data);
            methods.get(data.index).name = newName;
            this.set({"methods" : methods}, { silent : true });

            this._fire("changeText", data.index)
        },

        updateMethodReturnType : function (data, newReturnType) {
            var methods = this.get('methods');
            var data = this._extractData(data);
            methods.get(data.index).returnType = newReturnType;
            this.set({"methods" : methods}, { silent : true });

            this._fire("changeText", data.index)
        },

        updatePropertyName : function (index, newName) {
            var properties = this.get('properties');
            var data = this._extractData(index);
            properties.get(data.index).name = newName;
            this.set({"properties" : properties}, { silent : true });

            this._fire("changeText", data.index)
        },

        updatePropertyType : function (index, newType) {
            var properties = this.get('properties');
            var data = this._extractData(index);
            properties.get(data.index).type = newType;
            this.set({"properties" : properties}, { silent : true });

            this._fire("changeText", data.index)
        },

        getPropertyCollection : function () {
            return this.propCollection;
        },

        getWidth : function () {
            return this.get('width')
        },

        getHeight : function () {
            return this.get('height');
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

        addMethod : function (method) {
            if(!method) {
                method = methodBuilder('').visibility('+').returnType('void').build();
            }
            this.get("methods").add(method);
            this._fire("change:add")
        },

        updateVisibility : function (index) {

            var data = this._extractData(index);

            if(data.text === "method") {
                this._updateMethodVisibility(data.index);
            } else {
                this._updatePropertyVisibility(data.index);
            }

        },

        _extractData : function (data) {

            return {
                text : data.slice(0, -1),
                index : data.slice(-1)
            }
        },

        _updateMethodVisibility : function (index) {
            var methods = this.get("methods"),
                currentVisibility = methods.get(index).visibility,
                symbolIndex = this.symbolMap.toIndex[currentVisibility],
                newIndex = ++symbolIndex % 3,
                newSymbol = this.symbolMap.toSymbol[newIndex];
            methods.get(index).visibility = newSymbol;

            this.set({ "methods" : methods }, { silent : true });
            this._fire("change:visibility", index);
        },

        _updatePropertyVisibility : function (index) {
            var properties = this.get("properties"),
                currentVisibility = properties.get(index).visibility,
                symbolIndex = this.symbolMap.toIndex[currentVisibility],
                newIndex = ++symbolIndex % 3,
                newSymbol = this.symbolMap.toSymbol[newIndex];
            properties.get(index).visibility = newSymbol;

            this.set({ "properties" : properties }, { silent : true });
            this._fire("change:visibility", index);
        },

        symbolMap : {
            toIndex : { '#' : 0, '-' : 1 , '+' : 2 },
            toSymbol : ['#', '-', '+']
        },

        getType : function () {
            return "ClassBoxModel";
        }

    });
});

