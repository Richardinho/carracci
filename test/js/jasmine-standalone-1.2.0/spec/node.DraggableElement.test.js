describe("node.DraggableElement", function() {

    var node,
        spyOnInitialize,
        mockSvg = { createCircle : function () {} },
        spyOnCreateCircle,
        mockConstraintsManager,
        spyOnProposeX,
        html = '<div id="foo" cx="10" cy="10" ></div>',
        mockElement = $(html);
        mockElement.drag = function () {};
        mockElement.toFront = function () {};

    beforeEach(function() {
        mockConstraintsManager = {
            proposeXCood : function (x) { return true; },
            proposeYCood : function (y) { return true; }
        };
        spyOnCreateCircle = spyOn(mockSvg, "createCircle").andReturn(mockElement);
        node = new Glenmorangie.DraggableElement({
            svg : mockSvg
        });
    });

    afterEach(function () {

        node.element.attr({ "cx" : 10 });
        node.element.attr({ "cy" : 10 });
    });

    describe("When the element is dragged", function () {

        beforeEach(function () {
            node._onStart();
            node._onMove(1, 2);
            node._onEnd();
        });

        it("should update x and y coordinates", function () {
            expect(node.xCood).toBe(11);
            expect(node.yCood).toBe(12);
        });
    });

    describe("When constraints manager is provided", function () {

        beforeEach(function () {
            spyOnProposeX = spyOn(mockConstraintsManager, "proposeXCood").andReturn(false);
            node.setConstraintsManager(mockConstraintsManager);
            node._onStart();
            node._onMove(1, 2);
            node._onEnd();

        });
        it("should apply rules in constraints manager", function () {
            expect(node.getXCood()).toBe(10);
            expect(node.yCood).toBe(12)
        });
    });
});