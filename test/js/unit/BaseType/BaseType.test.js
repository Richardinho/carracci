require(['BaseType'], function ( BaseType) {

    describe("When BaseType is extended", function () {
        var newInstance1,
            newInstance2,
            newInstance3,
            newInstance4;
        describe("When instances of extended type are created", function () {
            beforeEach(function () {

                var NewType = BaseType.extend({
                    getTypePrefix : function () { return "Connector"}
                });
                newInstance1 = new NewType();
                newInstance2 = new NewType();
                newInstance3 = new NewType();
                newInstance4 = new NewType();
            });

            it("should have id of form [prefix][idNumber]", function () {
                expect(newInstance1.id).toBe("Connector_1")
            });

            it("should have a unique Id", function (){
                expect(newInstance1.Id).not.toBe(newInstance2.id);
                expect(newInstance2.Id).not.toBe(newInstance3.id);
                expect(newInstance3.Id).not.toBe(newInstance4.id);
            });
        });
    })
});