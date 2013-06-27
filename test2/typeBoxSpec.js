define(['utility/typeBox'], function(TypeBox) {

    describe('typeBox', function() {

        var typeBox = new TypeBox({
                model : {
                    properties : {},
                    methods : {}
                }
            });

        describe("property formatting", function () {

            var props;

            beforeEach(function () {

                var propertyObjectArray = {

                    foo : {
                        name : "foo",
                        visibility : "private",
                        type : "String"
                    },
                    bar : {
                        name : "bar",
                        visibility : "private",
                        type : "Collection"
                    },
                    blah : {
                        name : "blah",
                        visibility : "private",
                        type : "int"
                    }
                };

                props = typeBox.formatProperties(propertyObjectArray);

            });

            it('should format properties', function() {
                expect(props).toEqual([
                    "-foo:String",
                    "-bar:Collection",
                    "-blah:int"
                ]);
            });
        });

        describe("method formatting", function () {

            var methods;

            beforeEach(function () {

                var methodObjectArray = {

                    fooMethod : {
                        name : "fooMethod",
                        visibility : "public",
                        returnType : "String",
                        args : [
                            { name : "arg1", type : "int" },
                            { name : "arg2", type : "char" },
                        ]
                    },

                    barMethod : {
                        name : "barMethod",
                        visibility : "public",
                        returnType : "String",
                        args : [

                        ]
                    }
                };

                methods = typeBox.formatMethods(methodObjectArray);
            });

            it('should format methods', function() {
                expect(methods).toEqual([
                    "+fooMethod(arg1:int,arg2:char):String",
                    "+barMethod():String"
                ]);
            });

        });
    });
});
