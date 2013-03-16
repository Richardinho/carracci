/*
    container for all diagram components.
 */

define([], function () {

    var root = {};

    return {

        separator : "_",

        createComponentSlot : function (componentName) {
            if(!root[componentName]) {
                root[componentName] = [];
            }
            root[componentName].push({});
            return componentName + this.separator + (root[componentName].length -1);
        },

        store : function (componentId, components) {

            var type = this._getTypeFromId(componentId),
                index = this._getIndexFromId(componentId);

            for(var i=0; i < components.length; i++) {
               var element = components[i];

               root[type][index][element.getType()] = element;
            }
        },

        retrieve : function (id, typeName) {
            var type = this._getTypeFromId(id),
                index = this._getIndexFromId(id);
            return root[type][index][typeName];
        },

        getComponent : function (id) {
            var type = this._getTypeFromId(id),
                index = this._getIndexFromId(id);
            return root[type][index];
        },

        numberOfType : function (type) {

            return root[type].length;
        },

        _getTypeFromId : function (id) {
            return id.substring(0, id.indexOf("_"));
        },

        _getIndexFromId : function (id) {
            return id.substring(id.indexOf("_") + 1, id.length);
        }
    };
});