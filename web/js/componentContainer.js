/*
    container for all diagram components.
 */

define(['IDGenerator'], function (IDGenerator) {

    var root = {};

    return {

        separator : "_",

        createComponentSlot : function (componentName) {
            if(!root[componentName]) {
                root[componentName] = {}
            }

            var id = IDGenerator.getNextId();

            root[componentName][id] = {};

            return componentName + this.separator + id;
        },

        store : function (componentId, components) {

            var type = this._getTypeFromId(componentId),
                id = this._getIndexFromId(componentId);

            for(var i=0; i < components.length; i++) {
               var element = components[i];

               root[type][id][element.getType()] = element;
            }
        },

        removeComponent : function (id) {
            var type = this._getTypeFromId(id),
                index = this._getIndexFromId(id);
            delete root[type][id];
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
            if(root[type]) {
                return root[type].length;
            } else {
                return 0;
            }
        },

        _getTypeFromId : function (id) {
            return id.substring(0, id.indexOf("_"));
        },

        _getIndexFromId : function (id) {
            return id.substring(id.indexOf("_") + 1, id.length);
        }
    };
});