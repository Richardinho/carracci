require(['NodeToBoxCoordinator'], function ( Coordinator) {

    describe("NodeToBoxCoordinator", function () {
        var coordinator;

        beforeEach(function () {

        });
        it("should", function () {});

        describe("When initialized", function () {
        //todo: also without proximalnode or distal node.
            describe("without box or arrow component", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    try {
                        coordinator = new Coordinator({ players : {} });
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

            describe("with full set of players", function () {
                var arrow, box, proximalNode, distalNode,
                    spyOnArrowAddValidator,
                    spyOnBoxAddValidator,
                    spyOnProximalNodeAddValidator,
                    spyOnDistalNodeAddValidator;

                    console.log("hello")

                beforeEach(function () {

                    arrow = { addValidator : function () {} };
                    box = { addValidator : function () {} };
                    proximalNode = { addValidator : function () {} };
                    distalNode = { addValidator : function () {} };
                    spyOn(Coordinator.prototype, "_moveArrowOntoBox");

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
                it("should add corresponding validator to each player", function () {
                    expect(spyOnArrowAddValidator).toHaveBeenCalled();
                    expect(spyOnBoxAddValidator).toHaveBeenCalled();
                    expect(spyOnProximalNodeAddValidator).toHaveBeenCalled();
                    expect(spyOnDistalNodeAddValidator).toHaveBeenCalled();
                });

                it("should generate unique Id for each validator", function () {
                    var validatorId = spyOnArrowAddValidator.mostRecentCall.args[0].id
                    expect(coordinator.roleIds["arrow"]).toEqual(validatorId);

                    validatorId = spyOnBoxAddValidator.mostRecentCall.args[0].id
                    expect(coordinator.roleIds["box"]).toEqual(validatorId);

                    validatorId = spyOnProximalNodeAddValidator.mostRecentCall.args[0].id
                    expect(coordinator.roleIds["proximalNode"]).toEqual(validatorId);

                    validatorId = spyOnDistalNodeAddValidator.mostRecentCall.args[0].id
                    expect(coordinator.roleIds["distalNode"]).toEqual(validatorId);
                });
            });
        });


    });
});