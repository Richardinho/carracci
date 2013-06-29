define(['diagram/diagramModel2'], function(DiagramModel) {

    describe('diagram model test', function() {
        var fooModel;
        var diagramModel;

        beforeEach(function () {

            diagramModel = new DiagramModel();

            diagramModel.createDiagram("foo");
            fooModel = diagramModel.createType("foo", "bar");

        });

        describe("create property", function () {

            var flag = false;

            beforeEach(function () {

                fooModel.on("update", function () {

                    flag = true;
                });

                diagramModel.createProperty("foo", "bar", "aProp");
            });

            it("should fire 'update' event on model", function () {

                expect(flag).toBe(true);
            });

            /* the creation of properties and methods within types implicitly proves
            that the types are properly created too. */

            it('should create property "aProp" with visibility and type', function() {

                expect(diagramModel.getPropertyVisibility("foo", "bar", "aProp")).toBe("private");
                expect(diagramModel.getPropertyType("foo", "bar", "aProp")).toBe("Object");
            });
        });

        describe("create method", function () {

            beforeEach(function () {

                diagramModel.createMethod("foo", "bar", "aMethod");
            });

            it('should create method "aMethod" ', function() {

                expect(diagramModel.model
                    .children['diagrams']
                    .children['foo']
                    .children['types']
                    .children['bar']
                    .children['methods']
                    .children['aMethod']
                    .children['visibility'].value
                    ).toBe("public");

                expect(diagramModel.model
                    .children['diagrams']
                    .children['foo']
                    .children['types']
                    .children['bar']
                    .children['methods']
                    .children['aMethod']
                    .children['returnType'].value
                    ).toBe("void");
            });


            describe("set method values", function () {
               describe("set visibility", function () {

                    beforeEach(function () {

                        diagramModel.setMethodVisibility("foo", "bar", "aMethod", "protected");

                    });
                    it("should set method aMethod visibility to 'protected'", function () {

                        expect(diagramModel.getMethodVisibility("foo", "bar", "aMethod")).toBe("protected");

                    });
                });

                describe("set returnType", function () {

                    beforeEach(function () {
                        diagramModel.model
                            .children['diagrams']
                            .children['foo']
                            .children['types']
                            .children['bar']
                            .children['methods']
                            .children['aMethod']
                            .children['returnType']
                            .set("Zebra")
                    });
                    it("should set method aMethod returnType to 'zebra'", function () {
                        expect(diagramModel.model
                            .children['diagrams']
                            .children['foo']
                            .children['types']
                            .children['bar']
                            .children['methods']
                            .children['aMethod']
                            .children['returnType'].value
                            ).toBe("Zebra");
                    });
                });
            });

            describe("delete methods", function () {
                var deletedMethod;
                beforeEach(function () {

                    deletedMethod = diagramModel.deleteMethod("foo", "bar", "aMethod");
                });

                it("should delete method 'aMethod' ", function () {
                    expect(deletedMethod.name).toBe("aMethod");
                });
            });

        });




        describe("set Property values", function () {

            beforeEach(function () {

                diagramModel.createProperty("foo", "bar", "aProp");
            });
            describe("set visibility", function () {

                beforeEach(function () {
                    diagramModel.model
                    .children['diagrams']
                    .children['foo']
                    .children['types']
                    .children['bar']
                    .children['properties']
                    .children['aProp']
                    .children['visibility']
                    .set("public")
                });
                it("should set property aProp visibility to 'public'", function () {
                    expect(diagramModel.model
                        .children['diagrams']
                        .children['foo']
                        .children['types']
                        .children['bar']
                        .children['properties']
                        .children['aProp']
                        .children['visibility'].value
                        ).toBe("public");
                });
            });

            describe("set type", function () {

                beforeEach(function () {
                    diagramModel.model
                        .children['diagrams']
                        .children['foo']
                        .children['types']
                        .children['bar']
                        .children['properties']
                        .children['aProp']
                        .children['type']
                        .set("FooBar")
                });
                it("should set property aProp visibility to 'public'", function () {
                    expect(diagramModel.model
                        .children['diagrams']
                        .children['foo']
                        .children['types']
                        .children['bar']
                        .children['properties']
                        .children['aProp']
                        .children['type'].value
                        ).toBe("FooBar");
                });
            });

            describe("delete properties", function () {
                var deletedProperty;
                beforeEach(function () {

                    deletedProperty = diagramModel.deleteProperty("foo", "bar", "aProp");
                });

                it("should delete property 'aProp' ", function () {
                    expect(deletedProperty.name).toBe("aProp");
                });
            });

        });




    });
});
