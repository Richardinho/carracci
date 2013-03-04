require(['WebAPI'], function (WebAPI) {

    describe("WebAPI", function () {
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

        describe("getConnector()", function () {
            var connector;

            beforeEach(function () {
                connector = webAPI.getConnector("foo")
            });

            it("should return connector with id 'foo' ", function () {
                expect(connector.id).toEqual("foo");
            });
        });

        describe("getLeftArrowNode()", function () {
            var arrowNode;

            beforeEach(function () {
                arrowNode = webAPI.getLeftArrowNode("foo");
            });

            it("should contain xCood state", function () {
                expect(arrowNode.xCood()).toBe(25);
            });

            it("should contain yCood state", function () {
                expect(arrowNode.yCood()).toBe(10);
            });
        });

        describe("getRightArrowNode()", function () {
            var arrowNode;

            beforeEach(function () {
                arrowNode = webAPI.getRightArrowNode("foo");
            });

            it("should contain xCood state", function () {
                expect(arrowNode.xCood()).toBe(225);
            });

            it("should contain yCood state", function () {
                expect(arrowNode.yCood()).toBe(110);
            });

        });

        describe("getProximalNode()", function () {
            var node;

            beforeEach(function () {
                node = webAPI.getProximalNode("foo");
            });

            it("should contain xCood state", function () {
                expect(node.xCood()).toBe(125);
            });

            it("should contain yCood state", function () {
                expect(node.yCood()).toBe(110);
            });
        });

        describe("getDistalNode()", function () {
            var node;

            beforeEach(function () {
                node = webAPI.getDistalNode("foo");
            });

            it("should contain xCood state", function () {
                expect(node.xCood()).toBe(125);
            });

            it("should contain yCood state", function () {
                expect(node.yCood()).toBe(10);
            });
        });

        describe("When arrow node moved along its x and y axis", function () {
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

            it("should update arrow node's x and y coods and  proximal node's y cood", function () {
                expect(node.xCood()).toBe(startNodeXCood + 1);
                expect(node.yCood()).toBe(startNodeYCood + 2);
                expect(proximalNode.xCood()).toBe(startProximalNodeXCood);
                expect(proximalNode.yCood()).toBe(startNodeYCood + 2);
            });
        });


    });
});