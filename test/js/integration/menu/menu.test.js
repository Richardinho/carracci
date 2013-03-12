require(['WebAPI'], function (WebAPI) {

    describe("Connector", function () {
        var webAPI,
            configuration;

        configuration = {};

        webAPI = new WebAPI(configuration);

        describe("when user clicks on tools menu bar button", function () {
            beforeEach(function () {
                webAPI.getMenuBar().clickOnToolsButton();
            });

            it("should display tools drop down", function () {
                expect(webAPI.getMenuBar().toolsDropDown().isVisible()).toBe(true);
            });

            describe("when user clicks on close tools drop down", function () {
                beforeEach(function () {
                    webAPI.getMenuBar().toolsDropDown().close();
                });

                it("should hide tools drop down", function () {
                    expect(webAPI.getMenuBar().toolsDropDown().isVisible()).toBe(false);
                });
            });
        });



    });
});