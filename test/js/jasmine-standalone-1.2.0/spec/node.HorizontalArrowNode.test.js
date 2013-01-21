describe("node.Element", function() {

    var arrowNode,
        spyOnCreateCircle,
        mockArrow = { setArrowDirection : function () {} },
        mockSvg = { createCircle : function () {} },
        configObj = { id : "id1", x : 100, y : 45, svg : mockSvg, "arrow" : mockArrow },
        spyOnSetArrowDirection,
        html = '<div id="foo" cx="10" cy="10" ></div>',
        mockElement = $(html);


    describe("When instantiated", function () {

        beforeEach(function () {
            mockElement.drag = function () {},
            mockElement.toFront = function () {},
            spyOnCreateCircle = spyOn(mockSvg, "createCircle").andReturn(mockElement);
            arrowNode = new Glenmorangie.HorizontalArrowNode(configObj);
            spyOnSetArrowDirection = spyOn(mockArrow, "setArrowDirection");
            arrowNode.setArrowDirection(10, 12);
        });
        it("should set arrow direction to left", function () {
            expect(spyOnSetArrowDirection).toHaveBeenCalledWith("right");
        });

    });
});