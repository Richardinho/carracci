require(['NodeToBoxCoordinator'], function ( Coordinator) {

    describe("NodeToBoxCoordinator", function () {
        var coordinator;

        describe("When initialized", function () {
            describe("without box or arrow component", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    try {
                        coordinator = new Coordinator({ });
                    } catch(e) {
                        errorName = e.name;
                        errorMessage = e.message;
                    }
                });

                it("should throw error", function () {
                    expect(errorName).toBe("incorrectOptionsError");
                    expect(errorMessage).toBe("You must supply a box and arrow component on intialization");
                });
            });

            describe("without arrow", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    try {
                        coordinator = new Coordinator({ distalNode: {}, proximalNode : {}, box : {} });
                    } catch(e) {
                        errorName = e.name;
                        errorMessage = e.message;
                    }
                });

                it("should throw error", function () {
                    expect(errorName).toBe("incorrectOptionsError");
                    expect(errorMessage).toBe("You must supply a box and arrow component on intialization");
                });
            });

            describe("without proximalNode", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    try {
                        coordinator = new Coordinator({ arrow : {}, distalNode: {}, box : {} });
                    } catch(e) {
                        errorName = e.name;
                        errorMessage = e.message;
                    }
                });

                it("should throw error", function () {
                    expect(errorName).toBe("incorrectOptionsError");
                    expect(errorMessage).toBe("You must supply a box and arrow component on intialization");
                });
            });

            describe("without distalNode", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    try {
                        coordinator = new Coordinator({ arrow : {}, proximalNode: {}, box : {} });
                    } catch(e) {
                        errorName = e.name;
                        errorMessage = e.message;
                    }
                });

                it("should throw error", function () {
                    expect(errorName).toBe("incorrectOptionsError");
                    expect(errorMessage).toBe("You must supply a box and arrow component on intialization");
                });
            });

            describe("when all players are provided", function () {
                var errorName, errorMessage,
                    arrow, box, proximalNode, distalNode,
                    spyOnArrowAddValidator,
                    spyOnBoxAddValidator,
                    spyOnProximalNodeAddValidator,
                    spyOnDistalNodeAddValidator,
                    spyOnArrowUpdate;

                beforeEach(function () {
                    function get(property) {
                        if(property === "yCood") { return 10; }
                        else if(property === "height") { return 30; }
                        else { return 5; }
                    }
                    arrow = { addValidator : function () {}, removeValidator : function () {}, update : function () {} };
                    box = { addValidator : function () {}, removeValidator : function () {}, get : get };
                    proximalNode = { addValidator : function () {}, removeValidator : function () {} };
                    distalNode = { addValidator : function () {}, removeValidator : function () {} };
                    spyOnArrowUpdate = spyOn(arrow, "update");
                    spyOnArrowAddValidator = spyOn(arrow, "addValidator");
                    spyOnBoxAddValidator = spyOn(box, "addValidator");
                    spyOnProximalNodeAddValidator = spyOn(proximalNode, "addValidator");
                    spyOnDistalNodeAddValidator = spyOn(distalNode, "addValidator");

                    coordinator = new Coordinator({ "arrow" : arrow,
                                                    "box" : box,
                                                    "proximalNode" : proximalNode,
                                                    "distalNode" : distalNode
                                                                });

                });

                it("should not throw error", function () {
                    expect(errorName).not.toBe("incorrectOptionsError");
                    expect(errorMessage).not.toBe("You must supply a box and arrow component on intialization");
                });

                it("should move arrow onto box", function () {
                    expect(spyOnArrowUpdate).toHaveBeenCalledWith(5, 25, true);
                });

                it("should add corresponding validator to each player", function () {
                    expect(spyOnArrowAddValidator).toHaveBeenCalled();
                    expect(spyOnBoxAddValidator).toHaveBeenCalled();
                    expect(spyOnProximalNodeAddValidator).toHaveBeenCalled();
                    expect(spyOnDistalNodeAddValidator).toHaveBeenCalled();
                });

                describe("When destroy() is called", function () {
                    var spyOnArrowRemoveValidator,
                        spyOnBoxRemoveValidator,
                        spyOnProximalNodeRemoveValidator,
                        spyOnDistalNodeRemoveValidator,
                        arrowId,
                        boxId,
                        proximalNodeId,
                        distalNodeId;

                    beforeEach(function () {
                        spyOnArrowRemoveValidator = spyOn(arrow, "removeValidator");
                        spyOnBoxRemoveValidator = spyOn(box, "removeValidator");
                        spyOnProximalNodeRemoveValidator = spyOn(proximalNode, "removeValidator");
                        spyOnDistalNodeRemoveValidator = spyOn(distalNode, "removeValidator");

                        arrowId = coordinator._getCoordinatorId("arrow");
                        boxId = coordinator._getCoordinatorId("box");
                        proximalNodeId = coordinator._getCoordinatorId("proximalNode");
                        distalNodeId = coordinator._getCoordinatorId("distalNode");
                        coordinator.destroy();
                    });
                    it("Should remove validators from all players", function () {
                        expect(spyOnArrowRemoveValidator).toHaveBeenCalledWith(arrowId);
                        expect(spyOnBoxRemoveValidator).toHaveBeenCalledWith(boxId);
                        expect(spyOnProximalNodeRemoveValidator).toHaveBeenCalledWith(proximalNodeId);
                        expect(spyOnDistalNodeRemoveValidator).toHaveBeenCalledWith(distalNodeId);
                    });
                });
            });
        });
    });
});