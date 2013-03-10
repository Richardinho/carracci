require(['propertyBuilder'], function (propertyBuilder) {

    describe("propertyBuilder()", function() {

        var property;

        describe(" When property is created with visibility, name, and type ", function () {

            beforeEach(function() {
                property = propertyBuilder()
                    .name("bar")
                    .visibility("+")
                    .type("String")
                    .build();
            });

            it ( "should create json property with given values", function() {
                expect(property).toEqual({ visibility : "+",
                                           name : "bar",
                                           type : "String" });
            });
        });
    });
});