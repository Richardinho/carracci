define(['core/Model'], function(Model) {

    describe('Model test', function() {

        var Foo,
            foo;

        beforeEach(function () {
            Foo = Model.extend({

                initialize : function () {
                    Model.prototype.initialize();
                },

                blah : function () {

                }
            });

            foo = new Foo();

            foo.set("hello", "world");

            foo.setAttributes({
                bar : "bar",
                coo : "coo"
            });

        });

        it('should get attributes set on model', function() {
            expect(foo.get("hello")).toBe("world");
            expect(foo.get("coo")).toBe("coo");
            expect(foo.get("bar")).toBe("bar");
        });

        describe("event handling", function () {
            var context = {
                    leonardo : "leonardo"
                },
                result,
                resultData;

            beforeEach(function () {

                foo.on("anEvent", function (data) {
                    result = this.leonardo;
                    resultData = data;
                }, context);

                foo.fire("anEvent", "this is data passed by fire")

            });

            it("should pass data from fire() method to event handler", function () {
                expect(resultData).toBe("this is data passed by fire");
            })
            it("should refer to context object through 'this' keyword", function () {
                expect(result).toBe("leonardo");
            });
        });
    });
});
