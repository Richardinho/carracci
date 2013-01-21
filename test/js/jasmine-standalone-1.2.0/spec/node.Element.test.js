describe("node.Element", function() {

    var element,
        configObj = { id : "id1", x : 100, y : 45 },
        spyOnInitialize;

    describe("When instantiated", function () {

        beforeEach(function () {
            spyOnInitialize = spyOn(Glenmorangie.Element.prototype, "initialize").andCallThrough();
            element = new Glenmorangie.Element(configObj);
        });
        it("should call initialize", function () {
            expect(spyOnInitialize).toHaveBeenCalled();
        });
        it("should initialize xCood", function () {
            expect(element.getXCood()).toBe(100);
        });
        it("should initialize yCood", function () {
            expect(element.getYCood()).toBe(45);
        });
        it("should initialize id", function () {
            expect(element._getId()).toBe("id1");
        });

        describe("listeners", function () {
            var listenerObj = { foo : function () {} },
                listenerObj2 = { bar : function () {} },
                spyOnFoo,
                spyOnBar;

            beforeEach(function () {
                element.addListener(listenerObj, "foo");
                element.addListener(listenerObj2, "bar");
                spyOnFoo = spyOn(listenerObj, "foo");
                spyOnBar = spyOn(listenerObj2, "bar");
                element.notifyListeners();
            });
            it("should call all registered listeners passing in current coods", function () {
                expect(spyOnFoo).toHaveBeenCalledWith(100, 45);
                expect(spyOnBar).toHaveBeenCalledWith(100, 45);
            });
        })
    });




});