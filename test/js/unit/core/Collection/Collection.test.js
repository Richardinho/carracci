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

        describe("deleteModel(id)", function () {
            var model1, model2, collection, index;
            beforeEach(function () {
                model1 = new Model();
                model2 = new Model();
                model1.id = 1;
                model2.id = 2;

                collection = new Collection([model1, model2]);

                collection.deleteModel(2);
            });
            it("should delete model from collection", function () {
                expect(collection.size()).toBe(1);
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

