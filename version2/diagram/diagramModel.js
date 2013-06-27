define(["core/Model"],function (Model) {

    return Model.extend({

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.idGenerator = options.idGenerator;

            this.diagrams = {};

            this.typeCache = {};

        },

        createDiagram : function (diagramName) {

            this.diagrams[diagramName] = {
                name : diagramName,
                types : {},
                connectors : {}
            }
        },

        createType : function (diagram, typeName) {

            var id = this.idGenerator.nextId();

            this.diagrams[diagram].types[typeName] = {
                name : typeName,
                properties : {
                    testProp : {
                        name : "testProp",
                        visibility : "private",
                        type : "String"
                    },

                    blahProp : {
                        name : "blahProp",
                        visibility : "private",
                        type : "Collection"
                    }
                },
                flavor : "interface",
                methods : {
                    fooMethod : {
                        name : "fooMethod",
                        visibility : "public",
                        returnType : "String",
                        args : [
                            {name : "arg1", type : "int" },
                            {name : "arg2", type : "char" }
                        ]
                    },
                    barMethod : {
                        name : "barMethod",
                        visibility : "public",
                        returnType : "void",
                        args : []
                    }

                },
                xCood : 700,
                yCood : 400,
                id : id
            }

            this.typeCache[id] = this.diagrams[diagram].types[typeName];

            return id;
        },

        createProperty : function (diagram, type, propertyName) {

            this.diagrams[diagram].types[type].properties[propertyName] = {

                name : propertyName,
                visibility : "private",
                type : "Object"
            }
        },

        deleteProperty : function (diagram, type, propertyName) {

            delete this.diagrams[diagram].types[type].properties[propertyName];
        },

        createMethod : function (diagram, type, methodName) {

            this.diagrams[diagram].types[type].methods[methodName] = {

                name : methodName,
                visibility : "public",
                returnType : "void",
                args : []
            }

        },

        setPropertyVisibility : function (diagram, type, propertyName, value) {
            this.diagrams[diagram].types[type].properties[propertyName].visibility = value;
        },

        setPropertyName : function (diagram, type, propertyName, value) {
            this.diagrams[diagram].types[type].properties[propertyName].name = value;
        },

        moveType : function (id, x, y) {
            var type = this.typeCache[id];
            type.xCood = x;
            type.yCood = y;

            this.fire("movetype", id);
        },

        getTypeCoods : function (id) {
            var type = this.typeCache[id];
            return { x : type.xCood, y : type.yCood };
        },

        getType : function (id) {
            return this.typeCache[id];
        },

        deleteMethod : function (diagram, type, methodName) {

            delete this.diagrams[diagram].types[type].methods[methodName];
        },



    });
});