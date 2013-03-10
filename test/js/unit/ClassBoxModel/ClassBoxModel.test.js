require(['web/js/classBox/model/model.ClassBox', "methodBuilder"], function (Model, methodBuilder) {

    describe("Model ClassBox", function () {
        var model;

        beforeEach(function () {
            model = new Model({  width : 10, height : 12, name : "foo", id : "bar", "x" : 10 , "y" : 4 });
        });

        describe("Model Initialization", function () {

            it("should set id from options", function () {
                expect(model.get("id")).toBe("bar")
            });

            it("should set name from options", function () {
                expect(model.get("name")).toBe("foo")
            });

            it("should set width from options", function () {
                expect(model.get("width")).toBe(10)
            });

            it("should set height from options", function () {
                expect(model.get("height")).toBe(12)
            });

            it("should set xCood from options to be 10", function () {
                expect(model.get("xCood")).toBe(10)
            });

            it("should set yCood from options to be 4", function () {
                expect(model.get("yCood")).toBe(4)
            });

        });

        describe("addMethod()", function () {
            var method;
            beforeEach(function () {
                method = methodBuilder("foo").build();
                model.addMethod(method)
            });
            it("should add method to model", function () {
                expect(model.get("methods").get(0).name).toBe("foo");
            });
        });


    });
});