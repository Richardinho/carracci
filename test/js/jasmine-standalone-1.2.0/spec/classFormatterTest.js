

describe("Class formatters", function() {
    var argObj,
        fooProp,
        barMethod,
        builtObject;

    beforeEach(function () {

        argObj = Glenmorangie.stubData.MethodArgBuilder()
            .name("hello")
            .type("Integer")
            .build();

        fooProp = Glenmorangie.stubData.PropertyBuilder()
            .name("foo")
            .visibility("public")
            .type("String")
            .build();

        barMethod = Glenmorangie.stubData.MethodBuilder()
            .name("bar")
            .visibility("protected")
            .returnType("List")
            .argument(argObj)
            .build();

        builtObject = Glenmorangie.stubData.ClassBuilder()
            .name("ArrayList")
            .extends("AbstractList")
            .implements("List")
            .implements("Collection")
            .property(fooProp)
            .method(barMethod)
            .build();
        });


    describe ("class name formatter", function () {
        describe ("class with parent and interfaces", function () {
            var formattedName;
            beforeEach( function () {
                formattedName = Glenmorangie.formatters.formatClassName(builtObject);
            });

            it("should format class name with parent and interfaces", function () {
                expect(formattedName).toEqual("ArrayList extends AbstractList implements List, Collection");
            });
        });

        describe ("class name with default parent and no interfaces ", function () {
            var builtObject,
                formattedName;

            beforeEach( function () {
                builtObject = Glenmorangie.stubData.ClassBuilder()
                    .name("ArrayList")
                    .build();
                formattedName = Glenmorangie.formatters.formatClassName(builtObject);
            });

            it("should format name without parent or interfaces", function () {
                expect(formattedName).toEqual("ArrayList");
            });
        });

        describe ("class name with default parent with an interface ", function () {
            var builtObject,
                formattedName;

            beforeEach( function () {
                builtObject = Glenmorangie.stubData.ClassBuilder()
                    .name("ArrayList")
                    .implements("List")
                    .build();
                formattedName = Glenmorangie.formatters.formatClassName(builtObject);
            });

            it("should format name without parent and with an interface", function () {
                expect(formattedName).toEqual("ArrayList implements List");
            });
        });

        describe ("class name with supplied parent", function () {
            var builtObject,
                formattedName;

            beforeEach( function () {
                builtObject = Glenmorangie.stubData.ClassBuilder()
                    .name("ArrayList")
                    .extends("AbstractList")
                    .build();
                formattedName = Glenmorangie.formatters.formatClassName(builtObject);
            });

            it("should format name with parent", function () {
                expect(formattedName).toEqual("ArrayList extends AbstractList");
            });
        });

    });

    describe ("property formatter", function () {
        describe ("format property object", function () {
            var property;
            beforeEach( function () {
                property = Glenmorangie.formatters.formatProperty(builtObject.properties[0]);
            });

            it("format name", function () {
                expect(property).toEqual("+foo:String");
            });
        });

        describe ("format property object without type", function () {
            var property,
                formattedProperty;
            beforeEach( function () {
                property = Glenmorangie.stubData.PropertyBuilder()
                    .name("foo")
                    .build();
                formattedProperty = Glenmorangie.formatters.formatProperty(property);
            });

            it("format name", function () {
                expect(formattedProperty).toEqual("-foo");
            });
        });
    });

    describe ("method formatter", function () {
        describe ("method formatter", function () {
            var method;
            beforeEach( function () {
                method = Glenmorangie.formatters.formatMethod(builtObject.methods[0]);
            });

            it("format name", function () {
                expect(method).toEqual("#bar(hello:Integer):List");
            });

        });

        describe ("formatted method with two arguments, one with a default type", function () {
            var method,
                arg1,
                arg2,
                formattedMethod;

            beforeEach( function () {

                arg1 = Glenmorangie.stubData.MethodArgBuilder()
                    .name("hello")
                    .type("Integer")
                    .build();

                arg2 = Glenmorangie.stubData.MethodArgBuilder()
                    .name("foo")
                    .build();

                method = Glenmorangie.stubData.MethodBuilder()
                    .name("bar")
                    .visibility("public")
                    .returnType("List")
                    .argument(arg1)
                    .argument(arg2)
                    .build();

                formattedMethod = Glenmorangie.formatters.formatMethod(method);
            });

            it("should format method with two args, one having default type Object", function () {
                expect(formattedMethod).toEqual("+bar(hello:Integer,foo:Object):List");
            });
        });

        describe ("formatted method with all defaults", function () {
            var method,
                arg1,
                arg2,
                formattedMethod;

            beforeEach( function () {

                method = Glenmorangie.stubData.MethodBuilder()
                    .name("bar")
                    .build();

                formattedMethod = Glenmorangie.formatters.formatMethod(method);
            });

            it("should format method with all defaults", function () {
                expect(formattedMethod).toEqual("+bar():void");
            });
        });
    });




});