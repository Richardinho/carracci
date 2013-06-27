define(['diagram/diagramModel'], function(DiagramModel) {

    describe('diagram model test', function() {

        var diagramModel;

        beforeEach(function () {

            diagramModel = new DiagramModel({
                idGenerator : {
                    nextId : function () {
                        return 1;
                    }
                }
            });
            diagramModel.createDiagram("foo");
            diagramModel.createType("foo", "Bar");
            diagramModel.createProperty("foo", "Bar", "blah");
            diagramModel.createMethod("foo", "Bar", "blahMethod");
        });

        it('should create diagram "foo"', function() {

            expect(diagramModel.diagrams).toEqual({

                foo : {
                    name : "foo",
                    types : {
                        Bar : {
                            name : "Bar",
                            properties : {
                                blah : {
                                    name : "blah",
                                    visibility : "private",
                                    type : "Object"
                                },
                                testProp : {
                                    name : "testProp",
                                    visibility : "private",
                                    type : "String"
                                },

                                blahProp : {
                                    name : "blahProp",
                                    visibility : "private",
                                    type : "Collection"
                                }
                            },
                            methods : {
                                blahMethod : {
                                    name : "blahMethod",
                                    visibility : "public",
                                    returnType : "void",
                                    args : []
                                },

                                fooMethod : {
                                    name : "fooMethod",
                                    visibility : "public",
                                    returnType : "String",
                                    args : [
                                        {name : "arg1", type : "int" },
                                        {name : "arg2", type : "char" }
                                    ]
                                },
                                barMethod : {
                                    name : "barMethod",
                                    visibility : "public",
                                    returnType : "void",
                                    args : []
                                }
                            },
                            flavor : "interface",
                            xCood : 700,
                            yCood : 400,
                            id : 1
                        }
                    },
                    connectors : {}
                }
            });
        });

        describe("set Property values", function () {
            describe("visibility", function () {
                beforeEach(function () {
                    diagramModel.setPropertyVisibility("foo", "Bar", "blah", "protected");
                });
                it("should set blah visibility to 'protected'", function () {
                    expect(diagramModel.diagrams.foo.types.Bar.properties.blah.visibility).toBe("protected");
                });
            });

            describe("name", function () {
                beforeEach(function () {
                    diagramModel.setPropertyName("foo", "Bar", "blah", "banana");
                });
                it("should set blah name to 'banana'", function () {
                    expect(diagramModel.diagrams.foo.types.Bar.properties.blah.name).toBe("banana");
                });
            });

        });

        describe("delete properties and methods", function () {
            beforeEach(function () {

                diagramModel.deleteMethod("foo", "Bar", "blahMethod");
            });

            it("should delete method 'blahMethod' ", function () {
                expect(diagramModel.diagrams.foo.types.Bar).toEqual({
                    name : "Bar",
                    properties : {
                        blah : {
                            name : "blah",
                            visibility : "private",
                            type : "Object"
                        },
                        testProp : {
                            name : "testProp",
                            visibility : "private",
                            type : "String"
                        },

                        blahProp : {
                            name : "blahProp",
                            visibility : "private",
                            type : "Collection"
                        }
                    },
                    flavor : "interface",
                    methods : {

                            fooMethod : {
                                name : "fooMethod",
                                visibility : "public",
                                returnType : "String",
                                args : [
                                    {name : "arg1", type : "int" },
                                    {name : "arg2", type : "char" }
                                ]
                            },
                            barMethod : {
                                name : "barMethod",
                                visibility : "public",
                                returnType : "void",
                                args : []
                            }



                    },
                    xCood : 700,
                    yCood : 400,
                    id : 1
                });
            });
            describe("delete property", function () {
                beforeEach(function () {

                    diagramModel.deleteProperty("foo", "Bar", "blah");
                });

                it("should delete property 'blah' ", function () {
                    expect(diagramModel.diagrams.foo.types.Bar).toEqual({
                        name : "Bar",
                        properties : {
                            testProp : {
                                name : "testProp",
                                visibility : "private",
                                type : "String"
                            },

                            blahProp : {
                                name : "blahProp",
                                visibility : "private",
                                type : "Collection"
                            }
                        },
                        methods : {
                            fooMethod : {
                                name : "fooMethod",
                                visibility : "public",
                                returnType : "String",
                                args : [
                                    {name : "arg1", type : "int" },
                                    {name : "arg2", type : "char" }
                                ]
                            },
                            barMethod : {
                                name : "barMethod",
                                visibility : "public",
                                returnType : "void",
                                args : []
                            }
                        },
                        flavor : "interface",
                        xCood : 700,
                        yCood : 400,
                        id : 1
                    });
                });
            });
        });


    });
});
