describe("node.svgElement", function() {

    var element,
        mockSvg =  { createCircle : function () {}, },
        configObj = { id : "id1",
                       x : 100,
                       y : 45 ,
                     svg : mockSvg
                 },
        spyOnInitialize,
        spyOnSuperTypeInitialize,
        spyOnSvgCreateCircle;

    describe("When instantiated", function () {

        beforeEach(function () {
            spyOnInitialize = spyOn(Glenmorangie.Element.prototype, "initialize").andCallThrough();
            spyOnSuperTypeInitialize = spyOn(Glenmorangie.SvgElement.prototype, "initialize").andCallThrough();
            spyOnSvgCreateCircle = spyOn(mockSvg, "createCircle");

            element = new Glenmorangie.SvgElement(configObj);
        });

        it("should call initialize", function () {
            expect(spyOnInitialize).toHaveBeenCalled();
        });

        it("should call super type initialize", function () {
            expect(spyOnSuperTypeInitialize).toHaveBeenCalled();
        });

        it("should inherit methods from Element", function () {
            expect(element.getXCood()).toBe(100);
            expect(element.getYCood()).toBe(45);
        });

        it("should create svg element", function () {
           expect(spyOnSvgCreateCircle).toHaveBeenCalled();
        });

    });


});