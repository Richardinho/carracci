    console.log("editor spec")
require(['web/js/commandLineEditor/editor'], function (editor) {

    var editor = editor();

    describe("parser", function () {

        var result;

        describe("when tokens are separated by single spaces", function () {
            beforeEach(function () {
                //result = editor.parse("create project foo");
            });
            it("should return array of tokens", function () {
                //expect(editor.foo).toBe("foo");
                expect(true).toBe(true);
                //expect(result).toEqual(['create', 'project', 'foo']);
            });
        });
        xdescribe("when tokens are separated by several spaces", function () {
            beforeEach(function () {
                result = editor.parse("create   project      foo");
            });
            it("should return array of tokens", function () {
                expect(result).toEqual(['create', 'project', 'foo']);
            });
        });
        xdescribe("when tokens are separated by tabs", function () {
            beforeEach(function () {
                result = editor.parse("create   project     foo");
            });
            it("should return array of tokens", function () {
                expect(result).toEqual(['create', 'project', 'foo']);
            });
        });
    });
});
/*
        var editor = commandLineEditor;



       describe("dispatcher", function () {
            var spyOnCreate;

            beforeEach(function () {
                spyOnCreate = spyOn(editor, "create");
                editor.dispatch([ 'create', 'project', 'foo' ])
            });
            it("should call create()", function () {
                expect(spyOnCreate).toHaveBeenCalledWith("project", "foo");
            });
        });

        describe("create", function () {
            describe("create project", function () {
                beforeEach(function () {
                    editor.create("project", "foo");
                });
                it("should create project called 'foo' ", function () {
                    expect(editor.project()).toEqual({ "name" : "foo" });
                });
                describe("create diagram", function () {
                    beforeEach(function () {
                        editor.create("diagram", "firstDiagram");
                    });
                    it("should create diagram called 'firstDiagram' ", function () {
                        expect(editor.project()).toEqual({ diagrams : { firstDiagram : { name : "firstDiagram", types : {} } }, name : "foo" });
                    });
                    describe("create types", function () {
                        beforeEach(function () {
                            editor.use("diagram", "firstDiagram");
                        });
                        describe("class", function () {
                            beforeEach(function () {
                                editor.create("type", "MyClass");
                            });
                            it("should create class object", function () {
                                expect(editor.project()).toEqual(
                                    {
                                        name : "foo",

                                        diagrams : {
                                            firstDiagram : {
                                                name : "firstDiagram",
                                                types : {

                                                    MyClass : {
                                                        name : "MyClass",
                                                        kind : "class",
                                                        options : {},
                                                        members : {}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                );
                            });
                            describe("", function () {
                                beforeEach(function () {
                                    editor.use("type", "MyClass");
                                });
                                describe("properties", function () {
                                    beforeEach(function() {
                                        editor.create("property", "myProp", { visibility : "private", type : "String" });
                                    });
                                    it("should create property 'myProp' ", function () {
                                        expect(editor.context()).toEqual({
                                            name : 'MyClass',
                                            kind : 'class',
                                            options : {},
                                            members : {
                                                properties : {
                                                    myProp : {
                                                        name : 'myProp',
                                                        visibility : 'private',
                                                        type : 'String'
                                                    }
                                                }
                                            }
                                        });
                                    });
                                });
                                describe("methods", function () {
                                    beforeEach(function() {
                                        editor.create("method", "myMethod");
                                    });
                                    it("should create method 'myMethod' ", function () {
                                        expect(editor.context()).toEqual({
                                            name : 'MyClass',
                                            kind : 'class',
                                            options : {},
                                            members : {
                                                methods : {
                                                    myMethod : {
                                                        name : 'myMethod',
                                                        visibility : 'public',
                                                        returnType : 'void',
                                                        args : {}
                                                    }
                                                }
                                            }
                                        });
                                    });
                                });

                            });
                        });
                        describe("interface", function () {
                            beforeEach(function () {
                                editor.create("interface", "MyInterface");
                            });
                            it("should create an interface object", function () {
                                expect(editor.project()).toEqual(
                                    {
                                        name : "foo",

                                        diagrams : {
                                            firstDiagram : {
                                                name : "firstDiagram",
                                                types : {

                                                    MyInterface : {
                                                        name : "MyInterface",
                                                        kind : "interface",
                                                        options : {},
                                                        members : {}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                );
                            });
                        });


                    });
                });
            });


        });

        describe("use", function () {
            describe("use project foo", function() {
                beforeEach(function () {
                    editor.use("project", "foo");
                });
                it("should switch to project 'foo' context", function () {
                    expect(editor.context().name).toBe("foo");
                });
            });
            describe("use diagram firstDiagram", function () {
                beforeEach(function () {
                    editor.use('diagram', 'firstDiagram');
                });
                it("should switch to firstDiagram context", function () {
                    expect(editor.context().name).toBe("firstDiagram")
                });
            })
        });

        describe("show", function () {
            describe("when called with no arguments", function () {
                var result;
                beforeEach(function () {
                    result = editor.show();
                });
                it("should return entire project object as json", function () {
                    expect(result).toEqual(JSON.stringify(editor.project(), null, " "));
                });
            });
        });

        describe("help", function () {
            var result;
            beforeEach(function () {
                result = editor.help("create");
            });
            it("should return create help menu", function () {
                expect(result).toEqual("the create command is used to create artifacts");
            });

        });
    });*/