define(['diagram/diagramController', 'diagram/diagramModel2'], function(DiagramController, DiagramModel) {

    describe('diagram controller test', function() {

        var diagramController,
            diagramModel;

        beforeEach(function () {

            diagramModel = new DiagramModel();

            diagramController = new DiagramController({
                diagramModel : diagramModel,
                TypeView : function () {},
                TypeController : function () {}
            });


        });

        describe("creating artifacts with 'create' command", function () {


            beforeEach(function () {
                diagramController.process("create diagram foo");
                diagramController.process("use diagram foo");
                diagramController.process("create type bar");
                diagramController.process("use type bar");
                diagramController.process("create property blahProperty");
                diagramController.process("create method enoMethod");

            });
            it("should create type", function () {

                expect(diagramModel.getTypeName("foo","bar")).toBe("bar");
            });

            it("should create property blahProperty", function () {

                expect(diagramModel.getProperty("foo", "bar", "blahProperty").name).toBe("blahProperty");
            });

            it("should create method enoMethod", function () {

                expect(diagramModel.getMethod("foo", "bar", "enoMethod").name).toBe("enoMethod");
            });
        });


        describe("context switching with 'use' command", function () {

            beforeEach(function () {

                diagramModel.createDiagram("foo", {

                    types : {
                        bar : {
                            properties : {
                                moz : {
                                    visibility : "private",
                                    type : "String"
                                }
                            },
                            methods : {
                                rox : {
                                    visibility : "protexted",
                                    returnType : "Collection",
                                    args : []
                                }
                            }
                        }
                    },

                    connectors : {


                    }
                });
            });

            it("should have correctly created diagram model", function () {

                expect(diagramModel.model.children['diagrams']
                        .children['foo'].name).toBe("foo");

                expect(diagramModel.model.children['diagrams']
                    .children['foo']
                    .children['types']
                    .children['bar'].name).toBe("bar");

                expect(diagramModel.getMethodVisibility("foo", "bar", "rox")).toBe("protexted");
            });

            describe("use command drilling down", function () {

                beforeEach(function () {
                    diagramController.process("use diagram foo");
                });
                it("should set context path to ['diagram', 'foo'] ", function () {
                    expect(diagramController.con()).toEqual(['diagram','foo']);
                });

                describe("use type bar", function () {

                    beforeEach(function () {
                        diagramController.process("use type bar");
                    });
                    it("should set context path to ['diagram', 'foo', 'type', 'bar' ] ", function () {
                        expect(diagramController.con()).toEqual(['diagram', 'foo', 'type', 'bar' ]);
                    });
                    describe("use property moz", function () {
                        beforeEach(function () {
                            diagramController.process("use property moz");
                        });
                        it("should set context path to ['diagram', 'foo', 'type', 'bar', 'property', 'moz' ]", function () {
                            expect(diagramController.con()).toEqual(['diagram', 'foo', 'type', 'bar', 'property', 'moz' ]);
                        });
                    });

                    describe("use method rox", function () {
                        beforeEach(function () {
                            diagramController.process("use method rox");
                        });
                        it("should set context path to ['diagram', 'foo', 'type', 'bar', 'method', 'rox' ]", function () {
                            expect(diagramController.con()).toEqual(['diagram', 'foo', 'type', 'bar', 'method', 'rox' ]);
                        });
                    });
                });
            });

            describe("use command drilling up", function () {

                beforeEach(function () {
                    diagramController.process("use diagram foo");
                    diagramController.process("use type bar");
                    diagramController.process("use property moz");
                });
                describe("use diagram", function () {

                    beforeEach(function () {
                        diagramController.process("use diagram");
                    });
                    it("should set context path to ['diagram', 'foo'] ", function () {
                        expect(diagramController.con()).toEqual(['diagram','foo']);
                    });
                });
                describe("use type", function () {

                    beforeEach(function () {
                        diagramController.process("use type");
                    });
                    it("should set context path to ['diagram', 'foo', 'type', 'bar'] ", function () {
                        expect(diagramController.con()).toEqual(['diagram','foo', 'type', 'bar']);
                    });
                });
            });
        });
    });
});
