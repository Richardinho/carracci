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

        function reset() {

        }

        afterEach(function () {
            reset();
        })

        describe("classBox gui", function () {

            var blahClassGui;

            beforeEach(function () {
                blahClassGui = webAPI.getClassBoxGui("blahClass");
            });

            it("should return reference to blahClass gui menu", function () {
                expect(blahClassGui.id).toBe("blahClass");
            });
        });

        describe("When user clicks on addMethod button", function () {

            var classBoxGui;

            beforeEach(function () {

                classBoxGui = webAPI.getClassBoxGui("blahClass");
                classBoxGui.clickAddMethod();
            });
            afterEach(function () {

                // delete method.
            });
            it("should add method to class model", function () {
                expect(classBoxGui.model.get("methods").size()).toBe(2);
            });

            it("should add method to svg class box", function () {

            });

            it("should add method input box to gui", function () {
            //todo change this when we delete some methods.
                expect(classBoxGui.methods().size()).toBe(4);
            });
        });
    });
});