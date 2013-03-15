require(['ComponentContainer'], function ( componentContainer) {

    describe("Component Container", function () {

        var componentName = "UmlClass",
            model = { foo : "foo", getType : function () { return "Model"}},
            view = { foo : "bar", getType : function () { return "View"}};

        describe("When new component slot is created", function () {

            var id;

            beforeEach(function () {
                id = componentContainer.createComponentSlot(componentName);
            });

            it("should return id for component", function () {
                expect(id).toBe("UmlClass_0");
            });

            describe("When model and view are stored in component slot", function () {
                beforeEach(function () {

                    componentContainer.store("UmlClass_0", [ model, view ]);
                });
                it("should retrieve model from container", function () {
                    expect(componentContainer.retrieve("UmlClass_0", model.getType())).toBe(model);
                });
                it("should retrieve view from container", function () {
                    expect(componentContainer.retrieve("UmlClass_0", view.getType())).toBe(view);
                });
            });
        });
    })
});