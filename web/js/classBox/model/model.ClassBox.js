
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
            this._fire("moveClass");
        },

        updateDimensions : function (height, width) {
            this.set({ "width" : width }, { silent : true });
            this.set({ "height" : height }, { silent : true });
            this.updateAssociatedComponents();
            this._fire("updateDimensions");
        },

        deleteArgument : function (data) {
            var data = this._getArgAndMethodDataAsObj(data);
            var methods = this.get('methods');
            var method = methods.get(data.methodIndex);
            method.args.splice(parseInt(data.argIndex, 10), 1);
            this._fire("updateClass");
        },

        updateArgumentName : function (data, name) {
            this._updateArgument(data, "name", name);
        },

        updateArgumentType : function (data, type) {
            this._updateArgument(data, "type", type);
        },

        _updateArgument : function (data, prop, propVal) {

            var data = this._getArgAndMethodDataAsObj(data),
                methods = this.get('methods'),
                method = methods.get(data.methodIndex);

            method.args[data.argIndex][prop] = propVal;
            this._fire("updateClass");
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
            this._fire("updateClass")
        },

        _deleteProperty : function (index) {
            var properties = this.get('properties');
            properties.delete(index);
            this._fire("updateClass")
        },

        changeClassName : function ( newName) {
            this.set({ name : newName });
            this._fire("updateClass");
        },

        updateMethodName : function (data, newName) {
            var methods = this.get('methods');
            var data = this._extractData(data);
            methods.get(data.index).name = newName;
            this._fire("updateClass", data.index)
        },

        updateMethodReturnType : function (data, newReturnType) {
            var methods = this.get('methods');
            var data = this._extractData(data);
            methods.get(data.index).returnType = newReturnType;
            this._fire("updateClass", data.index)
        },

        updatePropertyName : function (index, newName) {
            var properties = this.get('properties');
            var data = this._extractData(index);
            properties.get(data.index).name = newName;
            this._fire("updateClass", data.index)
        },

        updatePropertyType : function (index, newType) {
            var properties = this.get('properties');
            var data = this._extractData(index);
            properties.get(data.index).type = newType;
            this._fire("updateClass", data.index)
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
            this._fire("updateClass")
        },

        addArgument : function (data) {
            var methods = this.get('methods');
            var data = this._extractData(data);
            if(!methods.get(data.index).args) {
                methods.get(data.index).args = [];
            }
            methods.get(data.index).args.push({ name : "foo", type:"Object" })
            this._fire("updateClass");

        },

        addMethod : function (method) {
            if(!method) {
                method = methodBuilder('').visibility('+').returnType('void').build();
            }
            this.get("methods").add(method);
            this._fire("updateClass")
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

        _getArgAndMethodDataAsObj : function (data) {
            var a = data.split(':');
            return {
                methodIndex : a[0].slice(-1),
                argIndex : a[1].slice(-1)
            }
        },

        _updateMethodVisibility : function (index) {
            var methods = this.get("methods"),
                currentVisibility = methods.get(index).visibility,
                symbolIndex = this.symbolMap.toIndex[currentVisibility],
                newIndex = ++symbolIndex % 3,
                newSymbol = this.symbolMap.toSymbol[newIndex];
            methods.get(index).visibility = newSymbol;

            this._fire("updateClass", index);
        },

        _updatePropertyVisibility : function (index) {
            var properties = this.get("properties"),
                currentVisibility = properties.get(index).visibility,
                symbolIndex = this.symbolMap.toIndex[currentVisibility],
                newIndex = ++symbolIndex % 3,
                newSymbol = this.symbolMap.toSymbol[newIndex];
            properties.get(index).visibility = newSymbol;

            this._fire("updateClass", index);
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

