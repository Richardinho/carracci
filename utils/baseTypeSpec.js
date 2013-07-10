define(['core/BaseType'], function(BaseType) {

    describe('BaseType test', function() {
        var foo,
            FooType,
            spyOnInit,
            options = {
                jimJones : "jim"
            };

        beforeEach(function () {

            FooType = BaseType.extend({

                initialize : function () {

                },
                doBlah : function () {
                    return "richard";
                }
            });

            spyOnInit = spyOn(FooType.prototype, "initialize")

            foo = new FooType(options);

        });

        it('should copy properties from template into prototype', function() {

            expect(foo.doBlah()).toEqual('richard');
        });

        it("should call 'initialize()' with options", function() {

            expect(spyOnInit).toHaveBeenCalledWith(options);

        });

        describe("inheritance", function () {

            var BarType,
                bar;

            beforeEach(function () {
                BarType = FooType.extend({
                    doSomething : function () {
                        return this.doBlah();
                    }
                });
                bar = new BarType();

            });
            it("should inherit parent methods", function () {

                expect(bar.doSomething()).toEqual('richard');
            });
        })
    });
});
