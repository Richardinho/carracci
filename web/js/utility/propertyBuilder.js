define(function() {

    return function( name ) {

        var property = { "name" : name, visibility : "-", type : "String" };

        return {

            visibility : function (visibility) {

                property.visibility = visibility;
                return this;
            },

            name : function (name) {
                property.name = name;
                return this;
            },

            type : function (type) {
                property.type = type;
                return this;
            },

            build : function () {
                return property;
            }
        }
    };
});

