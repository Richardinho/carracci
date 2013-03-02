describe("connector.AbstractConnector", function() {

    var connector,

        mockNode1 = { render : function () {} },
        mockNode2 = { render : function () {} },
        mockNode3 = { render : function () {} },

        mockNodes = [ mockNode1, mockNode2, mockNode3 ];

        mockLine1 = { render : function () {}, dashes : function () {} , normal : function () {} },
        mockLine2 = { render : function () {}, dashes : function () {} , normal : function () {} },
        mockLine3 = { render : function () {}, dashes : function () {} , normal : function () {} },

        mockLines = [ mockLine1, mockLine2, mockLine3 ];

    beforeEach(function () {
        connector = new Glenmorangie.AbstractConnector();
        connector.nodes = mockNodes;
        connector.lines = mockLines;
    });

    describe("when rendered", function() {
        var spyOnMockNode1,
            spyOnMockNode2,
            spyOnMockNode3,
            spyOnMockLineRender1,
            spyOnMockLineRender2,
            spyOnMockLineRender3;

        beforeEach(function () {
            spyOnMockNode1 = spyOn(mockNode1, "render" );
            spyOnMockNode2 = spyOn(mockNode2, "render" );
            spyOnMockNode3 = spyOn(mockNode3, "render" );

            spyOnMockLineRender1 = spyOn(mockLine1, "render");
            spyOnMockLineRender2 = spyOn(mockLine2, "render");
            spyOnMockLineRender3 = spyOn(mockLine3, "render");
            connector.renderAll();
        });

        it("should render all nodes", function () {
            expect(spyOnMockNode1).toHaveBeenCalled();
            expect(spyOnMockNode2).toHaveBeenCalled();
            expect(spyOnMockNode3).toHaveBeenCalled();
        });

        it("should render all lines", function () {
            expect(spyOnMockLineRender1).toHaveBeenCalled();
            expect(spyOnMockLineRender2).toHaveBeenCalled();
            expect(spyOnMockLineRender3).toHaveBeenCalled();
        });
    });

    describe("when user tries to update line mode", function () {

        describe("when in 'normal' mode", function () {
            var spyOnMockLineDash1,
                spyOnMockLineDash2,
                spyOnMockLineDash3;

            beforeEach(function () {
                spyOnMockLineDash1 = spyOn(mockLine1, "dashes");
                spyOnMockLineDash2 = spyOn(mockLine2, "dashes");
                spyOnMockLineDash3 = spyOn(mockLine3, "dashes");

                connector.lineMode = "normal"

                connector.updateLineMode();
            });

            it("should set mode to 'dashes' ", function () {

                expect(connector.lineMode).toBe("dashes");
            });

            it("should call 'dashes()' on all lines", function () {
                expect(spyOnMockLineDash1).toHaveBeenCalled();
                expect(spyOnMockLineDash2).toHaveBeenCalled();
                expect(spyOnMockLineDash3).toHaveBeenCalled();

            });
        });

        describe("when in 'dashes' mode", function () {
            var spyOnMockLineNormal1,
                spyOnMockLineNormal2,
                spyOnMockLineNormal3;

            beforeEach(function () {
                spyOnMockLineNormal1 = spyOn(mockLine1, "normal");
                spyOnMockLineNormal2 = spyOn(mockLine2, "normal");
                spyOnMockLineNormal3 = spyOn(mockLine3, "normal");

                connector.lineMode = "dashes"
                connector.updateLineMode();
            });
            it("should set mode to 'normal' ", function () {
                expect(connector.lineMode).toBe("normal");
            });
            it("should call 'normal()' on all lines", function () {
                expect(spyOnMockLineNormal1).toHaveBeenCalled();
                expect(spyOnMockLineNormal2).toHaveBeenCalled();
                expect(spyOnMockLineNormal3).toHaveBeenCalled();

            });
        });
    });
});