require(['underscore', 'NodeToBoxCoordinator'], function (_, Coordinator) {

    describe("NodeToBoxCoordinator", function () {
        var coordinator;

        beforeEach(function () {

        });

        describe("When initialized", function () {
            it("should", function () {});
            describe("without box or arrow component", function () {
                var errorName,
                    errorMessage;

                beforeEach(function () {
                    try {
                        coordinator = new Coordinator({ players : {} });
                    } catch(e) {
                          console.log("error")
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
        describe("destroy", function () {
            it("should", function () {



            });
        });
    });
});