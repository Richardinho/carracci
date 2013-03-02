describe("arrow.Arrow", function() {

    var arrow,
        mockSvgUtils = {},
        spyOnInitializeArrowHeads,
        mockArrow0 = { setDirection : function () {}, update : function () {} },
        mockArrow1 = { setDirection : function () {}, update : function () {} },
        mockArrow2 = { setDirection : function () {}, update : function () {} },
        mockArrows = [mockArrow0, mockArrow1, mockArrow2];

    beforeEach(function () {
        spyOnInitializeArrowHeads = spyOn(Glenmorangie.Arrow.prototype, "_initializeArrowHeads").andReturn(mockArrows);
        arrow = new Glenmorangie.Arrow({ svgUtils : mockSvgUtils });
    });

    describe("when setArrowDirection() is called", function() {
        var spyOnSetDirection;

        beforeEach(function () {
            arrow.current = 1;
            spyOnSetDirection = spyOn(mockArrow1, "setDirection");
            arrow.setArrowDirection("left")
        });
        it("should set direction on current arrowhead", function () {
            expect(spyOnSetDirection).toHaveBeenCalledWith("left");
        });
    });

    describe("when updateArrowHead() is called", function () {
        var spyOnUpdate;

        beforeEach(function () {
            arrow.current = 2;
            spyOnUpdate = spyOn(mockArrow2, "update");
            arrow.updateArrowHead (2, 5);
        });
        it("should update arrow head with correct coods", function () {
            expect(spyOnUpdate).toHaveBeenCalledWith(2, 5);
        });
    });

    describe("when changeArrowHead() is called", function () {
        beforeEach(function () {
            arrow.current = 0;
            arrow.changeArrowHead();
        });
        it("should increment current arrow index", function () {
            expect(arrow.current).toBe(1);
        });

        describe("when current index references last element in array", function () {
            beforeEach(function () {
                arrow.current = 2;
                arrow.changeArrowHead();
            });
            it("should reset current arrow index back to 0", function () {
                expect(arrow.current).toBe(0);
            });
        });
    });

});