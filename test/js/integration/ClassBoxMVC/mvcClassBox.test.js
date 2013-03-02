require(['classBox/model/model.ClassBox',
         'classBox/view/view.ClassBox',
         'classBox/controller/controller.ClassBox'], function (Model, View, Controller ) {

    var model,
        view,
        controller;

    describe("ModelViewController UmlClassBox", function () {

        beforeEach(function () {
            model = new Model({  width : 10, height : 12, name : "foo", id : "bar", "x" : 10 , "y" : 4 });
        });

        describe("Model Initialization", function () {

            it("should set id from options", function () {
                expect(model.get("id")).toBe("bar")
            });

            it("should set name from options", function () {
                expect(model.get("name")).toBe("foo")
            });

            it("should set width from options", function () {
                expect(model.get("width")).toBe(10)
            });

            it("should set height from options", function () {
                expect(model.get("height")).toBe(12)
            });

            it("should set xCood from options to be 10", function () {
                expect(model.get("xCood")).toBe(10)
            });

            it("should set yCood from options to be 4", function () {
                expect(model.get("yCood")).toBe(4)
            });

        });

        describe("When user moves the component by (2, 3)", function () {

            var spyOnCreatePane,
                spyOnRender,
                mockPane = { drag : function () {}, click : function () {} };

            beforeEach(function () {

                view = new View({ "model" : model });
                controller = new Controller({ "model" : model , "view" : view });

                controller._onStart();
                controller._onMove(2, 3);
            });

            afterEach(function () {
                $('svg').remove();
            });

            it("should set coordinates to be (12, 7)", function () {

                expect(model.get('xCood')).toBe(12);
                expect(model.get('yCood')).toBe(7);
                expect(view.box.getBBox().x).toBe(12);
                expect(view.box.getBBox().y).toBe(7);
            });
        });
    });
});

/*
describe("model.ClassBox", function() {

    var classBoxModel,
        methods = [],
        properties = [];

    beforeEach(function () {

        properties.push(Glenmorangie.utils.propertyBuilder()
                .name("baba")
                .visibility("-")
                .type("String")
                .build());

        properties.push(Glenmorangie.utils.propertyBuilder()
                .name("lala")
                .visibility("-")
                .type("String")
                .build());

        methods.push( Glenmorangie.utils.methodBuilder()
                .name("foo")
                .visibility("+")
                .arg("blah", "String")
                .arg("index", "int")
                .arg("widget", "Thing")
                .returnType("Integer")
                .build());

        methods.push( Glenmorangie.utils.methodBuilder()
                .name("bar")
                .visibility("+")
                .arg("blah", "String")
                .arg("index", "int")
                .arg("widget", "Thing")
                .returnType("Integer")
                .build());

        classBoxModel = new Glenmorangie.Model.ClassBox({ "id" : "foo" ,
            "x" : 20,
            "y" : 50,
            "className" : "List<String>",
            "methods" : methods,
            "properties" : properties,
            "height" : 50,
            "width" : 20
        });
    });

    describe("when toJSON() is called", function () {

        var json;

        beforeEach(function () {
            json = classBoxModel.toJSON();
        });

        it ("should create json object representing model", function () {

            expect(json.xCood).toBe(20);
            expect(json.yCood).toBe(50);
            expect(json.className).toBe("List<String>");
            expect(json.height).toBe(50);
            expect(json.width).toBe(20);
            expect(json.methods[0].name).toBe("foo");
            expect(json.methods[0].visibility).toBe("+");
            expect(json.methods[0].args['blah']).toBe("String");
            expect(json.methods[0].args['index']).toBe("int");
            expect(json.methods[0].args['widget']).toBe("Thing");
            expect(json.methods[0].returnType).toBe("Integer");
            expect(json.methods[1].name).toBe("bar");
            expect(json.methods[1].visibility).toBe("+");
            expect(json.methods[1].args['blah']).toBe("String");
            expect(json.methods[1].args['index']).toBe("int");
            expect(json.methods[1].args['widget']).toBe("Thing");
            expect(json.methods[1].returnType).toBe("Integer");
            expect(json.properties[0].name).toBe("baba");
            expect(json.properties[0].visibility).toBe("-");
            expect(json.properties[0].type).toBe("String");
            expect(json.properties[1].name).toBe("lala");
            expect(json.properties[1].visibility).toBe("-");
            expect(json.properties[1].type).toBe("String");
        });
    });
});*/
