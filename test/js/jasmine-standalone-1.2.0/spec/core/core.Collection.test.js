describe("core.Collection", function() {

    var collection,
        myArray = ["alpha", "beta", "gamma", "delta" ];

    describe("on initialisation", function () {

        beforeEach(function () {
            collection = new Glenmorangie.Collection(myArray);
        });
        it("should set array into collection", function () {
            expect(collection._collection).toBe(myArray);
        });
        describe("get()", function () {
            it("should retrieve elements by index", function () {
                expect(collection.get(0)).toBe("alpha");
            });
        });

        describe("reduce()", function () {
            var collection,
                contextResult = "start",
                result;
            beforeEach(function () {

                var context = { "foo" : "foo" };
                collection = new Glenmorangie.Collection([1, 2, 3, 4]);

                result = collection.reduce(function (memo, element, index ) {
                    contextResult = contextResult + this.foo;
                    return parseInt(memo) + parseInt(element);
                }, 0, context);
            });

            it("should reference context object using 'this' ", function () {
                expect(contextResult).toBe("startfoofoofoofoo");
            });
            it("should call iterator on all elements", function () {
                expect(result).toBe(10)
            });

        });

        describe("each()", function () {
            result = [],

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
                it("should bind 'this' keyword to collection instance", function () {
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
                it("should reference context object as value of 'this' within iterator", function () {
                    expect(result[0]).toBe("foo");
                    expect(result[1]).toBe("foo");
                    expect(result[2]).toBe("foo");
                    expect(result[3]).toBe("foo");
                });
            });
        });

        describe("map()", function () {
            result;

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
        });
    });
});