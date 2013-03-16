require(['WebAPI', 'keyManager', 'Fixture'], function (WebAPI, KeyManager, Fixture) {

    describe("WebAPI", function () {
        var webAPI,
            configuration;

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
        new Fixture().setUp(configuration);
        webAPI = new WebAPI();
        var componentId = "UmlClass_0";
        var classAPI = webAPI.getClassBox(componentId);
        var classAPIGui = classAPI.getGui();


        describe("When user changes class name ", function () {
            beforeEach(function () {
                classAPIGui.setClassName("ArrayList");
            });
            it("should update class name", function () {
                expect(classAPI.model.get("name")).toBe("ArrayList");
            });
        });

        describe("properties", function () {
            describe("When user clicks on visibility link on a property", function () {
                beforeEach(function () {
                    classAPIGui.property(0).clickOnVisibility();
                });
                it("should update visibility on model", function () {
                    expect(classAPI.model.get("properties").get(0).visibility).toBe("-");
                });
            });

            describe("When user clicks on addProperty button", function () {

                beforeEach(function () {
                    classAPIGui.clickAddProperty();
                });

                it("should add property to class model", function () {
                    expect(classAPI.model.get("properties").size()).toBe(3);
                });
            });

            describe("When user clicks on delete property", function () {

                beforeEach(function () {
                    classAPIGui.property(1).deleteProperty();
                });
                it("should delete property from model and from gui", function () {
                    expect(classAPI.model.get("properties").size()).toBe(2);
                });
            });

            describe("When uses gui to update property name", function () {

                beforeEach(function () {
                    classAPIGui.property(0).name("foobar");
                });
                it("should update property name", function () {
                    expect(classAPI.model.get("properties").get(0).name).toBe("foobar");
                });
            });

            describe("When uses gui to update property type", function () {

                beforeEach(function () {
                    classAPIGui.property(0).type("Collection");
                });
                it("should update property type", function () {
                    expect(classAPI.model.get("properties").get(0).type).toBe("Collection");
                });
            });
        });

        describe("methods", function () {
            describe("When user clicks on visibility link on a method", function () {
                beforeEach(function () {
                    classAPIGui.method(0).clickOnVisibility();
                });
                it("should update visibility on model and in gui", function () {
                    expect(classAPI.model.get("methods").get(0).visibility).toBe("-");
                });
            });

            describe("When user clicks on addMethod button", function () {

                beforeEach(function () {
                    classAPIGui.clickAddMethod();
                });

                it("should add method to class model", function () {
                    expect(classAPI.model.get("methods").size()).toBe(2);
                });
            });

            describe("When user clicks on delete method", function () {
                beforeEach(function () {
                    classAPIGui.method(1).deleteMethod();
                });
                it("should delete method from model and from gui", function () {
                    expect(classAPI.model.get("methods").size()).toBe(1);
                });
            });

            describe("When users uses gui to update method name", function () {
                beforeEach(function () {
                    classAPIGui.method(0).name("bar");
                });
                it("should update method name", function () {
                    expect(classAPI.model.get("methods").get(0).name).toBe("bar");
                });
            });

            describe("When user uses gui to update method returnType", function () {
                beforeEach(function () {
                    classAPIGui.method(0).returnType("Integer");
                });
                it("should update method return Type", function () {
                    expect(classAPI.model.get("methods").get(0).returnType).toBe("Integer");
                });
            });
        });
    });
});