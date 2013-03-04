require([ 'WebAPI', 'ClassFixture' ], function ( WebAPI, ClassFixture ) {


    describe("Integration test", function () {
        var webAPI;

        beforeEach(function () {
            $(document).ready(function () {

                class1 = ClassFixture.getClass(0);

                var configuration = {

                    connectors : [ { node1 : { x  : 5, y : 5 , arrows : ['diamond'] },
                                     node2 : { x  : 5, y : 5 , arrows : ['diamond'] } }],
                    classBoxes : [ class1 ]
                };

                webAPI = new WebAPI(configuration);
            });
        });
        describe("When arrow node is moved", function () {

            beforeEach(function () {
                var initialX = webAPI.getProximalNode(0).getXCood();
                webAPI.getArrowNode(0).move({ "dx" : 5, "dy" : 3 });
            });
            it("should move proximal Node same distance along y axis but 0px along x axis", function () {
                expect(webAPI.getProximalNode(0).getYCood()).toBe(initialY + 3);
                expect(webAPI.getProximalNode(0).getXCood()).toBe(initialX);
            });
        });
    });
});
