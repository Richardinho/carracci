define(['diagram/diagramController', 'diagram/diagramModel'], function(DiagramController, DiagramModel) {

    describe('diagram controller test', function() {

        var diagramController,
            diagramModel;

        beforeEach(function () {

            diagramModel = new DiagramModel({
                idGenerator : {
                    nextId : function () {
                        return 1;
                    }
                }
            });

            diagramController = new DiagramController({
                diagramModel : diagramModel,
                TypeView : function () {},
                TypeController : function () {}
            });

            diagramController.process("create diagram foo");

        });

        it('should create diagram foo ', function() {
            expect(diagramModel.diagrams).toEqual({
                foo : {
                    name : "foo",
                    types : {},
                    connectors : {}
                }
            });
        });

        describe("use diagram foo", function () {

            beforeEach(function () {

                diagramController.process("use diagram foo");
            });
            it("should update context to 'diagram, foo'", function () {

                expect(diagramController.con()).toEqual(["diagram", "foo"]);
            })
            describe("create type bar", function () {
                beforeEach(function () {
                    diagramController.process("create type bar");
                });
                it("should create type 'bar' ", function () {
                    expect(diagramModel.diagrams).toEqual({
                        foo : {
                            name : "foo",
                            types : {
                                bar : {
                                    name : "bar",
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
                                }
                            },
                            connectors : {}
                        }
                    });
                });
            });
        });
    });
});
