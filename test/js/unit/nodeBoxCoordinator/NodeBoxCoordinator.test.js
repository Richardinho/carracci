require(['NodeToBoxCoordinator'], function (Coordinator) {

    describe("NodeToBoxCoordinator", function () {
        var coordinator;

        beforeEach(function () {

        });

        describe("When initialized", function () {
            describe("without box or arrow component", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    debugger;
                    try {
                        coordinator = new Coordinator({ players : {} });
                    } catch(e) {
                          console.log("error")
                          debugger;
                        errorName = e.name;
                        errorMessage = e.message;
                    }
                });

                it("should throw error", function () {
                    expect(errorName).toBe("incorrectOptionsError");
                    expect(errorMessage).toBe("You must supply a box and arrow component on intialization");
                });
            });
        });
    });
});