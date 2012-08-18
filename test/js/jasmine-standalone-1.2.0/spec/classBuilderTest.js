describe("Class builders", function() {

    describe("Class object", function () {
        describe("when a class object is built with supplied values", function () {

            var builtObject,
                fooProp,
                barMethod;

            beforeEach(function () {

                fooProp = Glenmorangie.stubData.PropertyBuilder()
                    .name("foo")
                    .visibility("public")
                    .type("String")
                    .build();

                barMethod = Glenmorangie.stubData.MethodBuilder()
                    .name("bar")
                    .visibility("protected")
                    .returnType("List")
                    .argument("String: arg1")
                    .build();

                builtObject = Glenmorangie.stubData.ClassBuilder()
                    .name("ArrayList")
                    .extends("AbstractList")
                    .implements("List")
                    .implements("Collection")
                    .property("bar")
                    .property(fooProp)
                    .method("add()")
                    .method(barMethod)
                    .build();
            });

            it("should have a name", function () {
                expect(builtObject.name).toEqual("ArrayList");
            });

            it("should have a parent", function () {
                expect(builtObject.parent).toEqual("AbstractList");
            });

            it("should have interfaces", function () {
                expect(builtObject.interfaces).toEqual(["List", "Collection"]);
            });

            it("should have properties", function () {
                expect(builtObject.properties[0]).toEqual("bar");
                expect(builtObject.properties[1].name).toEqual("foo");
                expect(builtObject.properties[1].type).toEqual("String");
                expect(builtObject.properties[1].visibility).toEqual("public");
            });

            it ("should have methods specified as strings", function () {
                expect(builtObject.methods[0]).toEqual("add()");
            });

            it ("should have methods specified as objects", function () {
                expect(builtObject.methods[1].name).toEqual("bar");
            })
        });

        describe("when a class object is built with default values", function () {

            var builtObject;

            beforeEach(function () {
                builtObject = Glenmorangie.stubData.ClassBuilder()
                    .build();
            });

            it("should have default name", function () {
                expect(builtObject.name).toEqual("");
            });

            it("should have default parent", function () {
                expect(builtObject.parent).toEqual("Object")
            });

            it("should not have interfaces", function () {
                expect(builtObject.interfaces).not.toBeDefined();
            });

            it("should not have properties", function () {
                expect(builtObject.properties).not.toBeDefined();
            });

            it ("should not have methods ", function () {
                expect(builtObject.methods).not.toBeDefined();
            });
        });


    });


    describe ("property object", function () {
        describe("when a property object is built with all values supplied", function () {
            var builtObject;

            beforeEach(function () {
                builtObject = Glenmorangie.stubData.PropertyBuilder()
                    .name("foo")
                    .visibility("public")
                    .type("String")
                    .build();
            });
                           Glenmorangie.stubData.ClassBuilder
            it("should have a name", function () {
                expect(builtObject.name).toEqual("foo");
            });

            it("should have a type", function () {
                expect(builtObject.type).toEqual("String");
            });

            it("should have visibility", function () {
                expect(builtObject.visibility).toEqual("public");
            });

        });

       describe("when a property object is built with default values", function () {
            var builtObject;

            beforeEach(function () {
                builtObject = Glenmorangie.stubData.PropertyBuilder()
                    .build();
            });

            it("should have default name", function () {
                expect(builtObject.name).toEqual("");
            });

            it("should have a default type", function () {
                expect(builtObject.type).toEqual("Object");
            });

            it("should have default visibility", function () {
                expect(builtObject.visibility).toEqual("private");
            });

        });
    });

    describe("method object", function () {

        describe("when method object is built with all values supplied", function () {
            var builtObject,
                argObj;

            beforeEach(function () {

                argObj = Glenmorangie.stubData.MethodArgBuilder()
                    .name("hello")
                    .type("Integer")
                    .build();

                builtObject = Glenmorangie.stubData.MethodBuilder()
                    .name("foo")
                    .visibility("protected")
                    .returnType("List")
                    .argument("String:blah")
                    .argument(argObj)
                    .build();
            });

            it("should have a name", function () {
                expect(builtObject.name).toEqual("foo");
            });

            it("should have visibility", function () {
                expect(builtObject.visibility).toEqual("protected");
            });

            it("should have return type", function () {
                expect(builtObject.returnType).toEqual("List");
            });

            it("should have arguments", function () {
                expect(builtObject.args[0]).toEqual("String:blah");
                expect(builtObject.args[1].name).toEqual("hello");
                expect(builtObject.args[1].type).toEqual("Integer");
            });
        });


        describe("when method object is built with default values ", function () {
                var builtObject,
                    argObj;

            beforeEach(function () {
                builtObject = Glenmorangie.stubData.MethodBuilder()
                    .build();
            });

            it("should have default name", function () {
                expect(builtObject.name).toEqual("");
            });

            it("should have default visibility", function () {
                expect(builtObject.visibility).toEqual("public");
            });

            it("should have default return type", function () {
                expect(builtObject.returnType).toEqual("void");
            });

            it("should have no arguments", function () {
                expect(builtObject.args).not.toBeDefined();
            });
        });

        describe("when argument object is built with default values", function () {

            var argObj;

            beforeEach(function () {
                argObj = Glenmorangie.stubData.MethodArgBuilder()
                    .build();
            });

            it("should have default name", function () {
                expect(argObj.name).toEqual("");
            });

            it("should have default type", function () {
                expect(argObj.type).toEqual("Object");
            })

        })
    });
});