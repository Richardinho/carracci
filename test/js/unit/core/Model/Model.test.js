require(['Model'], function (Model) {

    describe("Model", function () {
        var model;

        beforeEach(function () {
        });

        describe("When properties are set on the Model", function () {
            beforeEach(function () {
                model = new Model();
                model.set({ foo : "foo", bar : "bar"});
            });
            it("should retrieve with get(), properties set on model with set()", function () {
                expect(model.get("foo")).toBe("foo");
                expect(model.get("bar")).toBe("bar");
            });
        });

        describe("When a model property is set to a new value", function () {

            var result,
                spyOnFire;

            beforeEach(function () {

                spyOnFire = spyOn(Model.prototype, "_fire").andCallThrough();
                model = new Model();

                model.on("change:foo", function (fooValue) {
                    result = fooValue;
                }, null);

            });

            describe("When no options are passed", function () {
                beforeEach(function () {
                    model.set({ foo : "blah"});
                });
                it("should fire 'change:foo' event", function () {
                    expect(spyOnFire).toHaveBeenCalledWith("change:foo", "blah");
                });
                it("should call registered handlers", function () {
                    expect(result).toBe("blah");
                });
            });

            describe("When { silent : true } is passed as an option", function () {

                beforeEach(function () {
                    model.set({ foo : "blah"}, { silent : true });
                });
                it("should not call handler", function () {
                    expect(result).not.toBe("blah");
                });
                it("should not fire 'change:foo' event", function () {
                    expect(spyOnFire).not.toHaveBeenCalled();
                });
            });

            afterEach(function () {
                result = null;
            });

        });
    });
});


/*

            describe("When handler is registered only for 'change' event", function () {
                var result;
                describe("When 'change:foo' event is fired", function () {
                    beforeEach(function () {
                        model.on("change", function (fooValue) {
                            result = this.get("foo")
                        });
                        model.set({ foo : "hello"});
                    }, null);

                    it("should call handler", function () {
                        expect(result).toBe("hello");
                    });

                });
            });
        });

    });*/
