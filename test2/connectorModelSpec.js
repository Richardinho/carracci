define(['diagram/connectors/horizontalConnectorModel'], function(ConnectorModel) {

    describe('connector model test', function() {

        var connectorModel;

        beforeEach(function () {

            connectorModel = new ConnectorModel({});
        });

        describe("alternateLineStyle", function () {

            beforeEach(function () {

                connectorModel.lineStyles = [
                    'dashed',
                    'solid',
                    'foo'
                ];
            });

            describe("first call", function () {

                var spyOnSetStyle;

                beforeEach(function () {

                    spyOnSetStyle = spyOn(connectorModel, "setLineStyle");
                    connectorModel.alternateLineStyle();
                });

                it("should be 'dashed' ", function () {

                    expect(spyOnSetStyle).toHaveBeenCalledWith("dashed");
                });

                describe("second call", function () {

                    beforeEach(function () {
                        connectorModel.alternateLineStyle();
                    });

                    it("should be 'solid' ", function () {

                         expect(spyOnSetStyle).toHaveBeenCalledWith("solid");
                    });

                    describe("third call", function () {

                        beforeEach(function () {
                            connectorModel.alternateLineStyle();
                        });

                        it("should be 'foo' ", function () {
                             expect(spyOnSetStyle).toHaveBeenCalledWith("foo");
                        });

                        describe("fourth call", function () {

                            beforeEach(function () {
                                connectorModel.alternateLineStyle();
                            });

                            it("should be 'dashed' ", function () {
                                expect(spyOnSetStyle).toHaveBeenCalledWith("dashed");
                            });
                        });
                    });
                });
            });


        });
    });
});
