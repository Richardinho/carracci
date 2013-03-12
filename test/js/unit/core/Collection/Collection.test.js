require(['Collection', 'Model'], function (Collection, Model) {

    describe("core.Collection", function() {

        var collection,
            myArray = ["alpha", "beta", "gamma", "delta" ];


        beforeEach(function () {
            collection = new Collection(myArray);
        });
        it("should set array into collection", function () {
            expect(collection._collection).toBe(myArray);
        });

        describe("get()", function () {
            it("should retrieve elements by index", function () {
                expect(collection.get(0)).toBe("alpha");
            });
        });

        describe("getBy(id)", function () {

            var model1, model2, model3, collection;
            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model3 = new Model();
                model1.id = 1;
                model2.id = 2;
                model3.id = 3;

                collection = new Collection([model1, model2, model3 ]);
            });
            it("should return model with given id", function () {
                expect(collection.getById(2)).toBe(model2);
            });
        });

        describe("reduce()", function () {

            var collection, result, model1, model2, model3, initialValue, context;

            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model3 = new Model();
                model1.id = 1;
                model2.id = 2;
                model3.id = 3;
                collection = new Collection([model1, model2, model3 ]);
            });

            describe("When referencing element, memo, and index within iterator", function () {

                beforeEach(function () {
                    initialValue = "";
                    result = collection.reduce(function (memo, element, index) {
                        return memo + element.id + index;
                    }, initialValue, context);
                });
                it("should return accumulated value", function () {
                    expect(result).toBe("102132");
                })
            });
            describe("When referencing context object within iterator", function () {
                beforeEach(function () {
                    initialValue = "";
                    context = { foo : "foo" }
                    result = collection.reduce(function (memo, element, index) {
                        return memo + this.foo;
                    }, initialValue, context);
                });
                it("should use 'this' to reference context object", function () {
                    expect(result).toBe("foofoofoo");
                })
            });
        });

        describe("contains()", function () {
            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model3 = new Model();
                model1.id = 1;
                model2.id = 2;
                model3.id = 3;

                collection = new Collection([model1, model2, model3 ]);
            });
            describe("When collection contains element", function () {
                var result;
                beforeEach(function () {
                    result = collection.contains(model2);
                });
                it("should return true", function () {
                    expect(result).toBe(true);
                });
            });
            describe("When collection does not contain element", function () {
                var result;
                beforeEach(function () {
                    result = collection.contains({ id : 4 });
                });
                it("should return false", function () {
                    expect(result).toBe(false);
                });
            });
        })


        describe("deleteModel(id)", function () {
            var model1, model2, collection, index;
            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model3 = new Model();
                model1.id = 1;
                model2.id = 2;
                model3.id = 3;

                collection = new Collection([model1, model2, model3 ]);

                collection.deleteModel(2);
            });
            it("should delete model from collection", function () {
                expect(collection.size()).toBe(2);
            });
        });

        describe("findFirst()", function () {
            var model1, model2, collection, index;
            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model1.set({ "id": "1", "foo" : "bar" });
                model2.set({ "id": "2", "foo" : "foo" });

                collection = new Collection([model1, model2]);

                index = collection.findFirst("id", "2");
            });
            it("should return index of model in collection with given property and value", function () {
                expect(index).toBe(1);
            });
        });

        describe("each()", function () {
            var result = [];

            beforeEach(function () {
                collection.each(function (index, element) {
                    result.push(element + " " + index);
                });
            });

            it("should call callback against each element of collection", function () {
                expect(result[0]).toBe("alpha 0");
                expect(result[1]).toBe("beta 1");
                expect(result[2]).toBe("gamma 2");
                expect(result[3]).toBe("delta 3");
            });

            describe("When 'this' keyword is used within body of callback", function () {
                var result = [];
                beforeEach(function () {
                    collection.each(function (index, element) {
                        result.push(this.get(index));
                    });
                });
                it("should bind 'this' to collection instance", function () {
                    expect(result[0]).toBe("alpha");
                    expect(result[1]).toBe("beta");
                    expect(result[2]).toBe("gamma");
                    expect(result[3]).toBe("delta");
                });
            });
            describe("When context object passed in", function () {
                var contextObject = { foo : "foo" },
                    result = [];
                beforeEach(function () {
                    collection.each(function (index, element) {
                        result.push(this.foo);
                    }, contextObject);
                });
                it("should bind 'this' to context object", function () {
                    expect(result[0]).toBe("foo");
                    expect(result[1]).toBe("foo");
                    expect(result[2]).toBe("foo");
                    expect(result[3]).toBe("foo");
                });
            });
        });

        describe("all()", function () {
            var collection, result, model1, model2, model3, context;

            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model3 = new Model();
                model1.id = 1;
                model2.id = 2;
                model3.id = 3;
                collection = new Collection([model1, model2, model3 ]);
            });
            describe("When iterator returns true against every element", function () {
                beforeEach(function () {
                    result = collection.all(function (element) {
                        return element.id < 4;
                    });
                });
                it("should return true", function () {
                    expect(result).toBe(true);
                });
            });
            describe("When iterator returns false against any element", function () {
                var context = { result : "" };
                beforeEach(function () {
                    result = collection.all(function (element) {
                        this.result += element.id;
                        return element.id !== 2;
                    }, context);
                });
                afterEach(function () {
                    context.result = "";
                });
                it("should return false", function () {
                    expect(result).toBe(false);
                });
                it("should bind 'this' to context object", function () {
                    expect(context.result).toBe("123");
                });
            });
        });

        describe("map()", function () {
            var result;

            beforeEach(function () {
                result = collection.map(function(index, element) {
                    return index + " " + element;
                });
            });
            it("should return array of mapped values", function() {
                expect(result[0]).toBe("0 alpha");
                expect(result[1]).toBe("1 beta");
                expect(result[2]).toBe("2 gamma");
                expect(result[3]).toBe("3 delta");
            });

            describe("When context object passed in", function () {
                var result = [];
                beforeEach(function () {

                    var contextObject = { foo : "foo" };
                    result = collection.map(function (index, element) {
                        return index + "|" + element + "|" + this.foo ;
                    }, contextObject);
                });
                it("should bind 'this' to context object", function () {
                    expect(result[0]).toBe("0|alpha|foo");
                    expect(result[1]).toBe("1|beta|foo");
                    expect(result[2]).toBe("2|gamma|foo");
                    expect(result[3]).toBe("3|delta|foo");
                });
            });
        });
    });
});

