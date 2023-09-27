define(function() {

    return function (id) {

        return {

            name : "default name",

            id : id,

            properties : {

                testProp : {
                    name : "testProp",
                    visibility : "private",
                    type : "String"
                }

            },

            flavor : "interface",

            methods : {
                "doIt": {
                    "name": "doIt",

                    "visibility": "public",

                    "returnType": "void",

                    "args": [{
                        name : "foo",
                        type : "String"
                     },{
                        name : "bar",
                        type : "Integer"
                    }]
                },
                "undoit": {
                    "name": "undoit",
                    "visibility": "public",
                    "returnType": "void",
                    "args": [{
                        name : "hello",
                        type : "Integer"
                     }]
                }
            },
            xCood : 700,
            yCood : 400,
            width : 10,
            height : 10,
            notes : []
        };

    };

});
