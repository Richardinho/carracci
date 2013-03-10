require(['underscore',  'ModelElement', 'templateLoader', 'jQuery'], function ( _,  ModelElement, templateLoader, $) {

    describe("templateLoader ", function() {

        beforeEach(function () {

            templateLoader.initialize(['tools', 'umlClassBoxGUI'], "../../../../web/templates/");
        });
        it("should load text into page", function() {

            expect(_.template($('#tools-template').html())).not.toBe(undefined);
            expect(_.template($('#gui-class-template').html())).not.toBe(undefined);
        });
    });
});





