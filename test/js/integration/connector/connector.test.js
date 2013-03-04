require(['WebAPI'], function (WebAPI) {

    describe("Connector", function () {
        var webAPI,
            class1 = {},
            configuration;

        configuration = {

            connectors : [ { id : "foo",
                             leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                             rightNode : { x  : 225, y : 110 , arrows : ['diamond'] } }
                             ],
            classBoxes : [ class1 ]
        };

        webAPI = new WebAPI(configuration);

        function reset() {
            var rightArrowNode, proximalNode, leftArrowNode;

            rightArrowNode = webAPI.getRightArrowNode("foo");
            proximalNode = webAPI.getProximalNode("foo");
            leftArrowNode = webAPI.getLeftArrowNode("foo");

            rightArrowNode.model.update(225, 110);
            leftArrowNode.model.update(25, 10);
            proximalNode.xCood(125);
        }

        afterEach(function () {
            reset();
        })

        describe("When right arrow node moved along its x and y axis", function () {
            var node,
                proximalNode,
                startNodeXCood,
                startNodeYCood,
                startProximalNodeXCood;

            beforeEach(function () {
                node = webAPI.getRightArrowNode("foo");
                proximalNode = webAPI.getProximalNode("foo");
                startNodeXCood = node.xCood();
                startNodeYCood = node.yCood();
                startProximalNodeXCood = proximalNode.xCood();
                node.move(1, 2);

            });

            it("should update arrow node's x and y coods", function () {
                expect(node.xCood()).toBe(startNodeXCood + 1);
                expect(node.yCood()).toBe(startNodeYCood + 2);
            });

            it("should update proximal nodes y Cood", function () {
                expect(proximalNode.xCood()).toBe(startProximalNodeXCood);
                expect(proximalNode.yCood()).toBe(startNodeYCood + 2);
            });
        });
        describe("When proximal node is moved along its x and y axis", function () {

            var rightArrowNode,
                proximalNode,
                distalNode,
                startProximalXCood,
                startProximalYCood;

            beforeEach(function () {
                rightArrowNode = webAPI.getRightArrowNode("foo");
                proximalNode = webAPI.getProximalNode("foo");
                distalNode = webAPI.getDistalNode("foo");

                startProximalXCood = proximalNode.xCood();
                startProximalYCood = proximalNode.yCood();

                proximalNode.move(2, 3);

            });

            it("should update proximal node x and y coods", function () {
                expect(proximalNode.xCood()).toBe(startProximalXCood + 2);
                expect(proximalNode.yCood()).toBe(startProximalYCood + 3);
            });

            it("should update right arrow node y cood", function () {
                expect(rightArrowNode.yCood()).toBe(proximalNode.yCood());
            });
            it("should update distal node x cood", function () {
                expect(distalNode.xCood()).toBe(proximalNode.xCood());
            });
        });

        describe("when right arrow node passes over the proximal node", function () {
            var rightArrowNode,
                proximalNode;

            beforeEach(function () {
                rightArrowNode = webAPI.getRightArrowNode("foo");
                proximalNode = webAPI.getProximalNode("foo");


                var diff = rightArrowNode.xCood() - proximalNode.xCood();
                rightArrowNode.move(-(diff+ 1), 0);

            });
            it("should reverse direction of the arrow", function () {
                expect(rightArrowNode.arrowDirection()).toBe("left");
            });
        })
    });
});