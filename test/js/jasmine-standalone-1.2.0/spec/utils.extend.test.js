describe("utils.extends", function() {

    describe("When a Type is defined using extend", function () {
        var Type;

        beforeEach(function() {
            Type = Glenmorangie.utils.extend({

                initialize : function (options) {
                    this.bar = options.bar;
                },

                blah : "blah",

                foo : function () {
                    return "foo";
                }
            });
        });

        describe("when an instance of the type is created", function () {
            var obj1,
                obj2,
                spyOnInitialize,
                configObject = { bar : "bar"} ;

            beforeEach(function () {
                spyOnInitialize = spyOn(Type.prototype, "initialize").andCallThrough();
                obj1 = new Type(configObject);
                obj2 = new Type({ bar : "bar for 2" });
            });

            it("initialize method should have been called with config object", function () {
                expect(spyOnInitialize).toHaveBeenCalledWith(configObject);
            });

            it("should be able to call methods defined on the Type", function() {
                expect(obj1.foo()).toBe("foo");
            });

            it("should have properties shared across instances", function () {
                expect(obj1.blah === obj2.blah).toBe(true);
            });

            it("should have properties unique to instances", function () {
                expect(obj1.bar === obj2.bar).toBe(false);
            });

            describe("When a sub type is created from a type", function () {
                var subTypeObj;


                beforeEach(function () {
                    var Subtype = Type.extend({
                        initialize : function (options) {

                        },

                        blub : function (options) {
                            return "blub";
                        },

                    });
                    subTypeObj = new Subtype();

                });

                it("should be able to call methods defined on the type", function () {
                    expect(subTypeObj.blub()).toBe("blub");
                });

                it("should be able to call methods defined on the super type", function () {
                    expect(subTypeObj.foo()).toBe("foo");
                });
            });
        });
    });
});