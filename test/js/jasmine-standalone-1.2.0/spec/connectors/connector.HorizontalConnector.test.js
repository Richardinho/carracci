describe("connector.HorizontalConnector", function() {

    var connector,
        mockFactory = { createArrowNode : function () {} };

    beforeEach(function () {

        spyOn( Glenmorangie.HorizontalConnector.prototype, "renderAll" );
        connector = new Glenmorangie.HorizontalConnector({ x: 100, y: 100, nodeFactory : mockFactory });
    });

    describe("when ", function() {


        beforeEach(function () {

        });

        it("should pre-compute coordinates", function () {
            expect(connector.coordinates.A.x).toBe(100);
            expect(connector.coordinates.A.y).toBe(100);
            expect(connector.coordinates.B.x).toBe(200);
            expect(connector.coordinates.B.y).toBe(100);
            expect(connector.coordinates.C.x).toBe(200);
            expect(connector.coordinates.C.y).toBe(200);
            expect(connector.coordinates.D.x).toBe(300);
            expect(connector.coordinates.D.y).toBe(200);
        });


    });


});