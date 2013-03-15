require(['WebAPI', 'Fixture'], function (WebAPI, Fixture) {

    describe("Connector", function () {
        var webAPI,
            configuration;

        configuration = {

            connectors : [ { id : "foo",
                leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                rightNode : { x  : 225, y : 110 , arrows : ['diamond'] } }
            ],
            classBoxes : [ { name : "List", id : "blahClass", x : 0, y : 0,
                properties :  [{ name : "foo", visibility : "+", type : "String" },
                    { name : "bar", visibility : "#", type : "int" }] } ]


        };

        new Fixture().setUp(configuration);

        //webAPI = new WebAPI();

        describe("when user clicks on tools menu bar button", function () {
            beforeEach(function () {
                //webAPI.getMenuBar().clickOnToolsButton();
            });

            it("should display tools drop down", function () {
                //expect(webAPI.getMenuBar().toolsDropDown().isVisible()).toBe(true);
            });

            describe("when user clicks on close tools drop down", function () {
                beforeEach(function () {
                    //webAPI.getMenuBar().toolsDropDown().close();
                });

                it("should hide tools drop down", function () {
                    //expect(webAPI.getMenuBar().toolsDropDown().isVisible()).toBe(false);
                });
            });
        });

        xdescribe("tools drop down", function () {
            beforeEach(function () {
                webAPI.getMenuBar().clickOnToolsButton();
            });

            describe("When user clicks on create uml class button", function () {
                beforeEach(function () {
                    webAPI.getMenuBar().toolsDropDown().clickOnCreateUmlClass();
                });
                it("should create new class in svg paper", function () {
                    expect(webAPI.numberOfUmlClasses()).toBe(2);
                });
            })
        });



    });
});