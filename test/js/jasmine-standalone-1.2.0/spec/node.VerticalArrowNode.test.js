describe("node.VerticalArrow", function() {

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
            arrowNode = new Glenmorangie.VerticalArrowNode(configObj);
            spyOnSetArrowDirection = spyOn(mockArrow, "setArrowDirection");

        });
        describe("down", function () {
            beforeEach(function () {
                arrowNode.setArrowDirection(10, 50);
            });
            it("should set arrow direction to down", function () {
                expect(spyOnSetArrowDirection).toHaveBeenCalledWith("up");
            });
        });

        describe("up", function () {
            beforeEach(function () {
                arrowNode.setArrowDirection(10, 12);
            });
            it("should set arrow direction to up", function () {
                expect(spyOnSetArrowDirection).toHaveBeenCalledWith("down");
            });
        });
    });
});