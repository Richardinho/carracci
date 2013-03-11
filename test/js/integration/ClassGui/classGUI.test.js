require(['WebAPI', 'keyManager'], function (WebAPI, KeyManager) {

    describe("WebAPI", function () {
        var webAPI,
            class1 = {},
            configuration;
        // should put in beforeEach and delete after every test.
        configuration = {

            connectors : [ { id : "foo",
                             leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                             rightNode : { x  : 225, y : 110 , arrows : ['diamond'] } }
                             ],
            classBoxes : [ {

                name : "List", id : "blahClass", x : 0, y : 0,

                properties : [{
                    name : "foo",
                    visibility : "+",
                    type : "String"

                    },{

                    name : "bar",
                    visibility : "#",
                    type : "int"
                }],

                methods : [ {
                    name : "doThat",
                    visibility : "+",
                    returnType : "String"

                }]
            }]
        };

        webAPI = new WebAPI(configuration);


        describe("classBox gui", function () {

            var blahClassGui;

            beforeEach(function () {
                blahClassGui = webAPI.getClassBoxGui("blahClass");
            });

            it("should return reference to blahClass gui menu", function () {
                expect(blahClassGui.id).toBe("blahClass");
            });
        });

        describe("When user clicks on visibility link on a method", function () {
            var blahClassGui;
            beforeEach(function () {
                blahClassGui = webAPI.getClassBoxGui("blahClass");
                blahClassGui.method(0).clickOnVisibility();
            });
            it("should update visibility on model and in gui", function () {
                expect(blahClassGui.model.get("methods").get(0).visibility).toBe("-");
                expect(blahClassGui.method(0).visibility()).toBe("-");
            });
        });

        describe("When user clicks on visibility link on a property", function () {
            var blahClassGui;
            beforeEach(function () {
                blahClassGui = webAPI.getClassBoxGui("blahClass");
                blahClassGui.property(0).clickOnVisibility();
            });
            it("should update visibility on model and in gui", function () {
                expect(blahClassGui.model.get("properties").get(0).visibility).toBe("-");
                expect(blahClassGui.property(0).visibility()).toBe("-");
            });
        });

        describe("When user clicks on addMethod button", function () {

            var classBoxGui;

            beforeEach(function () {
                classBoxGui = webAPI.getClassBoxGui("blahClass");
                classBoxGui.clickAddMethod();
            });

            it("should add method to class model", function () {
                expect(classBoxGui.model.get("methods").size()).toBe(2);
                expect(classBoxGui.methods().size()).toBe(2);
            });
        });
    });
});