describe("view.ClassBox", function() {

    var view,
        classBoxModel,
        methods = [],
        properties = [],
        mockRectangle = {};

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

    beforeEach(function () {
        var svgUtils = { createRectangle : function () {} };
        spyOn(svgUtils, "createRectangle").andReturn( mockRectangle );
        view = new Glenmorangie.View.ClassBox({ "model" : classBoxModel, "svgUtils" : svgUtils });
    });

    describe("when format method is called with json method", function () {

        var methodString;

        beforeEach(function () {
            var method = Glenmorangie.utils.methodBuilder()
                .name("foo")
                .visibility("+")
                .arg("blah", "String")
                .arg("index", "int")
                .arg("widget", "Thing")
                .returnType("Integer")
                .build();

            methodString = view.formatMethod(method);
        });

        it("should return formatted method", function () {
            expect(methodString).toBe("+foo(blah:String,index:int,widget:Thing):Integer");
        });
    });

    describe("when format method with no arguments or return type is called with json method", function () {

        var methodString;

        beforeEach(function () {
            var method = Glenmorangie.utils.methodBuilder()
                .name("foo")
                .visibility("+")
                .build();

            methodString = view.formatMethod(method);
        });

        it("should return formatted method", function () {
            expect(methodString).toBe("+foo():void");
        });
    });
});