require(['underscore',  'ModelElement'], function ( _,  ModelElement) {

    describe("ModelElement", function () {
        var model;
        beforeEach(function () {
            model = new ModelElement({ x : 23, y : 45 });
        });
        it("should set xCood on model", function () {
            expect(model.get('xCood')).toBe(23);
        });
        it("should set yCood on model", function () {
            expect(model.get('yCood')).toBe(45);
        });

        describe("update coordinates", function () {
            var component,
                spyOnUpdateAssociatedComponents;
            describe("When associated components reject validation", function () {
                beforeEach(function () {
                    spyOnUpdateAssociatedComponents = spyOn(model, "updateAssociatedComponents");
                    model.set({ xCood : 20 });
                    model.set({ yCood : 30 });
                    component = { validateX : function () { return false },
                                  validateY : function () { return false },
                                  postProcess : function () {} };
                    model.addValidator(component);
                    model.updateCoordinates(45, 67, true);
                });
                it("should not update X Cood", function () {
                    expect(model.get('xCood')).toBe(20);
                });

                it("should not update Y Cood", function () {
                    expect(model.get('yCood')).toBe(30);
                });

                it("should update associated components", function () {
                    expect(spyOnUpdateAssociatedComponents).toHaveBeenCalled();
                });

            });

            describe("When associated components validate", function () {
                beforeEach(function () {
                    spyOnUpdateAssociatedComponents = spyOn(model, "updateAssociatedComponents");
                    model.set({ xCood : 20 });
                    model.set({ yCood : 30 });
                    component = { validateX : function () { return true},
                        validateY : function () { return true },
                        postProcess : function () {} };
                    model.addValidator(component);
                    model.updateCoordinates(45, 67, true);
                });
                it("should update X Cood", function () {
                    expect(model.get('xCood')).toBe(45);
                });

                it("should update Y Cood", function () {
                    expect(model.get('yCood')).toBe(67);
                });

                it("should update associated components", function () {
                    expect(spyOnUpdateAssociatedComponents).toHaveBeenCalled();
                });

            });
        });

        describe("update associated components", function () {
            var component,
                spyOnSetXCoods,
                spyOnSetYCoods;
            beforeEach(function () {
                component = { context : {}, setYCoods : function () {}, setXCoods : function () {} };
                model.addValidator(component);
                spyOnSetXCoods = spyOn(component, "setXCoods");
                spyOnSetYCoods = spyOn(component, "setYCoods");

                model.updateAssociatedComponents();
            });
            it("should pass x cood to each associated component", function () {
                expect(spyOnSetXCoods).toHaveBeenCalledWith(23);
            });

            it("should pass y cood to each associated component", function () {
                expect(spyOnSetYCoods).toHaveBeenCalledWith(45);
            });
        });
    });
});