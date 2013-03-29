require(['methodBuilder'], function (methodBuilder) {
    describe("methodBuilder()", function() {

        var method;

        describe("when method is created with just a name", function () {

            beforeEach(function() {
                method = methodBuilder("foo").build();
            });

            it("should create json method with default values", function() {
                expect(method).toEqual({ visibility : "-", name : "foo", args : {}, returnType : "void" });
            });

        });

        describe("when method is created with visibility, name, args and return type", function () {

            beforeEach(function() {
                method = methodBuilder()
                    .name("bar")
                    .visibility("+")
                    .args([{ name : "blah", type : "String"}, { name : "bar", type : "int"}])
                    .returnType("Integer")
                    .build();
            });

            it("should create json method with given values", function() {
                expect(method).toEqual({ visibility : "+",
                                         name : "bar",
                                         args : [{ name : "blah", type : "String"}, { name : "bar", type : "int"}],
                                         returnType : "Integer" });
            });
        });
    });
});