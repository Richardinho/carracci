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

        describe("When user changes class name ", function () {
            var blahClassGui;
            beforeEach(function () {
                blahClassGui = webAPI.getClassBoxGui("blahClass");
                blahClassGui.setClassName("ArrayList");
            });
            it("should update class name", function () {
                expect(blahClassGui.model.get("name")).toBe("ArrayList");
            });
        });

        describe("properties", function () {
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

            describe("When user clicks on addProperty button", function () {

                var classBoxGui;

                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.clickAddProperty();
                });

                it("should add property to class model and to gui", function () {
                    expect(classBoxGui.model.get("properties").size()).toBe(3);
                    expect(classBoxGui.properties().size()).toBe(3);
                });
            });

            describe("When user clicks on delete property", function () {
                var classBoxGui;
                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.property(1).deleteProperty();
                });
                it("should delete property from model and from gui", function () {
                    expect(classBoxGui.model.get("properties").size()).toBe(2);
                    expect(classBoxGui.properties().size()).toBe(2);
                });
            });

            describe("When uses gui to update property name", function () {
                var classBoxGui;
                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.property(0).name("foobar");
                });
                it("should update property name", function () {
                    expect(classBoxGui.property(0).name()).toBe("foobar");
                    expect(classBoxGui.model.get("properties").get(0).name).toBe("foobar");
                });
            });

            describe("When uses gui to update property type", function () {
                var classBoxGui;
                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.property(0).type("Collection");
                });
                it("should update property type", function () {
                    expect(classBoxGui.property(0).type()).toBe("Collection");
                    expect(classBoxGui.model.get("properties").get(0).type).toBe("Collection");
                });
            });
        });

        describe("methods", function () {

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

            describe("When user clicks on delete method", function () {
                var classBoxGui;
                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.method(1).deleteMethod();
                });
                it("should delete method from model and from gui", function () {
                    expect(classBoxGui.model.get("methods").size()).toBe(1);
                    expect(classBoxGui.methods().size()).toBe(1);
                });
            });

            describe("When uses gui to update method name", function () {
                var classBoxGui;
                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.method(0).name("bar");
                });
                it("should update method name", function () {
                    expect(classBoxGui.method(0).name()).toBe("bar");
                    expect(classBoxGui.model.get("methods").get(0).name).toBe("bar");
                });
            });

            describe("When uses gui to update method returnType", function () {
                var classBoxGui;
                beforeEach(function () {
                    classBoxGui = webAPI.getClassBoxGui("blahClass");
                    classBoxGui.method(0).returnType("Integer");
                });
                it("should update method return Type", function () {
                    expect(classBoxGui.method(0).returnType()).toBe("Integer");
                    expect(classBoxGui.model.get("methods").get(0).returnType).toBe("Integer");
                });
            });
        });
    });
});