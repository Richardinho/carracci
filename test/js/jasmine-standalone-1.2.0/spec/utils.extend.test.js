describe("utils.extends", function() {

    var Type, Subtype, Subtype2, spyOnInitialize;

    beforeEach(function () {
        Type = Glenmorangie.utils.extend({

            initialize : function (options) {
                this.bar = options.bar;
            },

            blah : function () {
                return "blah";
            },

            foo : function () {
                return "this is super class foo"
            },
        });

        Subtype = Type.extend({
            initialize : function (options) {
                Type.prototype.initialize.call(this, options);
            },

            blub : function (options) {
                return "blub";
            },

            foo : function () {
                return "this is sub class foo";
            }
        });

        Subtype2 = Type.extend({
            initialize : function (options) {
                Subtype.prototype.initialize.call(this, options);
            },
        });

        spyOnInitialize = spyOn(Type.prototype, "initialize").andCallThrough();
    });

    describe("when an instance of the type is created", function () {
        var obj1,
            configObject = { bar : "bar"} ;

        beforeEach(function () {

            obj1 = new Type(configObject);
            obj2 = new Type({ bar : "foo"});
        });

        it("initialize method should have been called with config object", function () {
            expect(spyOnInitialize).toHaveBeenCalledWith(configObject);
        });

        it("should be able to call methods defined on the Type", function() {
            expect(obj1.foo()).toBe("this is super class foo");
        });

        it("should have properties shared across instances", function () {
            expect(obj1.blah === obj2.blah).toBe(true);
        });

        it("should have properties unique to instances", function () {
        console.log(obj1.bar, obj2.bar)
            expect(obj1.bar).not.toBe(obj2.bar);
        });
    });

    describe("Child type", function () {

        var subTypeObj;

        beforeEach(function () {
            subTypeObj = new Subtype({ bar : "foo"});
        });

        it("should have called initialize method of super type", function () {
            expect(spyOnInitialize).toHaveBeenCalledWith({ bar : "foo"});
        });

        it("should have set properties in config object into 'this' ", function () {
            expect(subTypeObj.bar).toBe("foo");
        });

        it("should inherit methods from super type", function () {
            expect(subTypeObj.blah()).toBe("blah");
        });

        it("should be able to call methods defined on the type", function () {
            expect(subTypeObj.foo()).toBe("this is sub class foo");
        });

        it("should be able to call overridden methods from the super type", function () {
            expect(Type.prototype.foo.call(subTypeObj)).toBe("this is super class foo");
        });
    });
    describe("grandchild type", function () {
        var subTypeObj2;

        beforeEach(function () {
            subTypeObj2 = new Subtype2({ bar : "charlie"});
        });

        it("should inherit methods from grand parent type", function () {
            expect(subTypeObj2.blah()).toBe("blah");
        });

        it("should have set properties in config object into 'this' ", function () {
            expect(subTypeObj2.bar).toBe("charlie");
        });
    });
});