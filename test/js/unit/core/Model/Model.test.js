require(['Model'], function (Model) {

    describe("Model", function () {
        var model,
            spyOnFire;

        beforeEach(function () {
            spyOnFire = spyOn(Model.prototype, "_fire").andCallThrough();
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

        describe("When a handler is registered against a specific property e.g. 'change:foo' ", function () {
            describe("When the property is changed on the model", function () {
                var result;

                beforeEach(function () {

                    model = new Model();

                    model.on("change:foo", function (fooVal) {
                        result = fooVal;
                    }, null);

                    model.set({ foo : "foo" }, { silent : false });
                });
                // Todo: this is wrong: the handler should query the model directly.
                it("should pass the new value to the handler function", function () {
                    expect(result).toBe("foo");
                });
            });
        });

        /*
            var contextObject = {}; // opportunity to pass more data in from somewhere.

            model.on("change:foo", function (model) {
                result = model.get('anyProperty');
            }, contextObject);


        */

        describe("context object", function () {
            describe("When a context object provided", function () {
                var contextObject,
                    result;

                beforeEach(function () {

                    contextObject = { bar : "bar" };
                    model = new Model();

                    model.on("change:foo", function (fooVal) {
                        result = this.bar;
                    }, contextObject);

                    model.set({ foo : "foo" }, { silent : false });
                });
                it("should set 'this' to context object within handler function", function () {
                    expect(result).toBe("bar");
                });
            });

            describe("When no context object is provided", function () {
                var result;

                beforeEach(function () {

                    model = new Model();

                    model.blah = "blah"

                    model.on("change:foo", function (fooVal) {
                        result = this.blah;
                    });

                    model.set({ foo : "foo" }, { silent : false });
                });
                it("should set 'this' to be the Model object within handler function", function () {
                    expect(result).toBe("blah");
                });
            });
        });

        describe("When handler is registered only for general 'change' event", function () {
            var result = null;

            beforeEach(function () {
                model.on("change", function (fooValue) {
                    result = fooValue;
                }, null);
            });

            describe("When 'bar' property is set", function () {
                beforeEach(function () {
                    model.set({ bar : "changeBarEvent"});
                });

                it("should call handler registered on general 'change' event", function () {
                    expect(result).toBe("changeBarEvent");
                });
            });

            describe("When 'foo' property is set", function () {
                beforeEach(function () {
                    model.set({ foo : "changeFooEvent"});
                });

                it("should call handler registered on general 'change' event", function () {
                    expect(result).toBe("changeFooEvent");
                });
            });
        });

        describe("Options", function () {

            var result = null;

            beforeEach(function () {

                model = new Model();

                model.on("change:foo", function (fooValue) {
                    result = fooValue;
                }, null);

            });

            afterEach(function () {
                result = null;
            });

            describe("When no options are passed", function () {
                beforeEach(function () {
                    model.set({ foo : "blah"});
                });
                it("should call registered handlers", function () {
                    expect(result).toBe("blah");
                });
            });

            describe("When { silent : false } is passed as an option", function () {
                beforeEach(function () {
                    model.set({ foo : "bar"});
                });
                it("should call registered handlers", function () {
                    expect(result).toBe("bar");
                });
            });

            describe("When { silent : true } is passed as an option", function () {

                beforeEach(function () {
                    model.set({ foo : "blah"}, { silent : true });
                });
                it("should not call handler", function () {
                    expect(result).not.toBe("blah");
                });
            });

            afterEach(function () {
                result = null;
            });

        });

        describe("toJson", function () {
            var json, result;
            beforeEach(function () {
                json = { "foo" : "foo", "bar" : "bar"};
                model = new Model();
                model.set(json);
                result = model.toJSON();
            });
            it("should return a json representation of model", function () {
                expect(result).toEqual(json);
            });
        });
    });
});

