require(['ModelClassBox',
         'ViewClassBox',
         'gui/controller/classBox',
         'propertyBuilder'], function (Model, View, Controller, propertyBuilder ) {

    var model,
        view,
        controller;



    describe("ModelViewController UmlClassBoxGui", function () {

        beforeEach(function () {


            model = new Model({  width : 10, height : 12, name : "foo", id : "bar", "x" : 10 , "y" : 4 });
        });

        describe("When us", function () {

            beforeEach(function () {

                var html = ['<div id="guiEl" >',
                                '<div class="bar">',
                                    '<div class="changeClassName">',
                                        '<input type="text" value="Foo<Bar<String, Integer>">',
                                    '</div>',
                                    '<div class="addProperty">',
                                        '<input type="button" />',
                                    '</div>',
                                    '<div class="property" data-index="0">',
                                        '<div class="visibility"> - </div>',
                                        '<div class="name"><input type="text" value="oldProp" /></div>',
                                        '<div class="type"><input type="text" value="oldType" /></div>',
                                        '<div class="delete"><input type="button" /></div>',
                                    '</div>',
                                '</div>',
                            '</div>' ].join("");

                $('body').append($(html));
                //  stub out render method.
                spyOn(View.prototype, "render");
                view = new View({ "model" : model, containerEl : $(document.getElementById('guiEl')) });
                controller = new Controller({ "model" : model , "view" : view });


                property = propertyBuilder('foo').visibility("-").type("String").build();
                model.addProperty(property);

            });

            describe("When user clicks on 'add property' button", function () {
                beforeEach(function () {
                    $(view.containerEl).find('.addProperty input').click();
                });
                it("should add a property to the model", function () {
                    expect(model.get("properties").size()).toBe(2);
                });
                afterEach(function () {
                    model.deleteProperty(1)
                })
            });
            describe("When user clicks on visibility", function () {
                beforeEach(function () {
                    $(view.containerEl).find('.bar .visibility').click();
                });
                it("should change visibility to next state", function () {
                    expect(model.get("properties").get(0).visibility).toBe("+");
                });
            });

            xdescribe("When user clicks on delete property", function () {
                beforeEach(function () {
                    $(view.containerEl).find('.bar .delete input').click();
                });
                it("should delete property from model", function () {
                   expect(model.get("properties").size()).toBe(0);
                });
                afterEach(function () {
                    var property = propertyBuilder('foo').visibility("-").type("String").build();
                    model.addProperty(property);
                    debugger;
                });

            });

            describe("When user changes property name", function () {
                beforeEach(function () {

                    $(view.containerEl).find('.bar .name input').val('newProp');
                    $(view.containerEl).find('.bar .name input').trigger('change')

                });
                it("should set new property name in model", function () {
                   expect(model.get("properties").get(0).name).toBe('newProp');

                });
            });

            describe("When user changes property type", function () {
                beforeEach(function () {

                    $(view.containerEl).find('.bar .type input').val('newType');
                    $(view.containerEl).find('.bar .type input').trigger('change')

                });
                it("should set new property type in model", function () {
                   expect(model.get("properties").get(0).type).toBe('newType');

                });
            });

            describe("When user changes class name", function () {
                beforeEach(function () {

                    $(view.containerEl).find('.bar .changeClassName input').val('newClassName');
                    $(view.containerEl).find('.bar .changeClassName input').trigger('change')

                });
                it("should set new class name in model", function () {
                   expect(model.get("name")).toBe('newClassName');
                });
            });

            afterEach(function () {
                $('svg').remove();
            });

        });
    });
});




