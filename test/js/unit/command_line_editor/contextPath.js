describe("contextPath", function () {

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

    describe("shift upsteam", function () {
        beforeEach(function () {

            editor.shift("diagram");
        });
        it("should switch to diagram context", function () {
            expect(editor.context().name).toBe("barDiagram")
        });
    });
});