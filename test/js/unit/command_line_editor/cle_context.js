
describe("command line editor context switching", function () {

    var editor = commandLineEditor();

    beforeEach(function () {

        editor.create("project", "foo");
        editor.create("diagram", "barDiagram");
        editor.use("diagram", "barDiagram");

        editor.create("type", "MyClass");
        editor.use("type", "MyClass");
        editor.create("method", "myMethod");




    });

    it("should validate project", function () {

        expect(editor.project()).toEqual({
            name : 'foo',
            diagrams : {
                barDiagram : {
                    name : 'barDiagram',
                    types : {
                        MyClass : {
                            name : 'MyClass',
                            kind : 'class',
                            options : { },
                            members : {
                                methods : {
                                    myMethod : {
                                        name : 'myMethod',
                                        visibility : 'public',
                                        returnType : 'void',
                                        args : { }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    });

    describe("drilling down", function () {
        beforeEach(function () {
            editor.use("project", "foo");
        });
        it("should be project 'foo'", function () {
            expect(editor.context().name).toBe("foo");
        });
        describe("drilling down directly", function () {
            describe("member context", function () {
                beforeEach(function () {
                    editor.use("diagram", "barDiagram", "type", "MyClass", "method", "myMethod");
                });
                it("should be myMethod", function () {
                    expect(editor.context().name).toBe("myMethod");
                });
            });
        });
        describe("drilling in steps", function () {
            describe("diagram context", function () {
                beforeEach(function () {
                    editor.use("diagram", "barDiagram")
                });
                it("should be 'barDiagram' ", function () {
                    expect(editor.context().name).toBe("barDiagram");
                });
                describe("class context", function () {

                    beforeEach(function () {
                        editor.use("type", "MyClass");
                    });
                    it("should be MyClass", function () {
                        expect(editor.context().name).toBe("MyClass");
                    });
                    describe("member context", function () {

                        beforeEach(function () {
                            editor.use("method", "myMethod");
                        });
                        it("should be myMethod", function () {
                            expect(editor.context().name).toBe("myMethod");
                        });
                    });
                });
            });
        });
    });
    describe("drilling up ", function () {

        beforeEach(function () {
            editor.use("project", "foo");

            editor.use("diagram", "barDiagram");

            editor.use("type", "MyClass");

        });
        describe("from member context to class context", function () {
            beforeEach(function () {
                editor.shift("diagram");
            });
            it("should be at type 'MyClass'", function () {
                expect(editor.context().name).toBe("barDiagram");
            });

        });

    });
});