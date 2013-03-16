require(['WebAPI', 'Fixture'], function (WebAPI, Fixture) {

    describe("Connector", function () {
        var webAPI,
            class1 = {},
            configuration,
            rightNode,
            leftNode,
            proximalNode,
            distalNode;

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

        webAPI = new WebAPI();

        var componentId = "UmlClass_0";

        var classBoxAPI = webAPI.getClassBox(componentId);
        var connector = webAPI.getConnector(0);

        rightNode = connector.getRightArrowNode();
        leftNode = connector.getLeftArrowNode();
        proximalNode = connector.getProximalNode();
        distalNode = connector.getDistalNode();

        classBoxAPI.move(200, 200);

        function reset() {
            connector.getLeftArrowNode().coods(25, 10);
            connector.getProximalNode().coods(125, 60);
            connector.getRightArrowNode().coods(225, 110);
        }


        afterEach(function () {
            reset();
        });

        describe("moving nodes along x and y axis and effect on other nodes", function () {
            describe("When right arrow node moved along its x and y axis", function () {
                var startNodeXCood,
                    startNodeYCood,
                    startProximalNodeXCood;

                beforeEach(function () {

                    startNodeXCood = rightNode.xCood();
                    startNodeYCood = rightNode.yCood();
                    startProximalNodeXCood = proximalNode.xCood();
                    rightNode.move(1, 2);

                });

                it("should update arrow node's x and y coods", function () {
                    expect(rightNode.xCood()).toBe(startNodeXCood + 1);
                    expect(rightNode.yCood()).toBe(startNodeYCood + 2);
                });

                it("should update proximal nodes y Cood", function () {
                    expect(proximalNode.xCood()).toBe(startProximalNodeXCood);
                    expect(proximalNode.yCood()).toBe(startNodeYCood + 2);
                });
            });
            describe("When proximal node is moved along its x and y axis", function () {

                var startProximalXCood,
                    startProximalYCood,
                    connector;

                beforeEach(function () {

                    startProximalXCood = proximalNode.xCood();
                    startProximalYCood = proximalNode.yCood();

                    proximalNode.move(2, 3);

                });

                it("should update proximal node x and y coods", function () {
                    expect(proximalNode.xCood()).toBe(startProximalXCood + 2);
                    expect(proximalNode.yCood()).toBe(startProximalYCood + 3);
                });

                it("should update right arrow node y cood", function () {
                    expect(rightNode.yCood()).toBe(proximalNode.yCood());
                });
                it("should update distal node x cood", function () {
                    expect(distalNode.xCood()).toBe(proximalNode.xCood());
                });
            });

            describe("When distal node is moved along its x and y axis", function () {

                var startDistalXCood,
                    startDistalYCood,
                    leftArrowNodeStartX;

                beforeEach(function () {
                    leftArrowNodeStartX = leftNode.xCood();

                    startDistalXCood = distalNode.xCood();
                    startDistalYCood = distalNode.yCood();

                    distalNode.move(2, 3);

                });

                it("should update distal node x and y coods", function () {
                    expect(distalNode.xCood()).toBe(startDistalXCood + 2);
                    expect(distalNode.yCood()).toBe(startDistalYCood + 3);
                });

                it("should update left arrow node y cood", function () {
                    expect(leftNode.yCood()).toBe(distalNode.yCood());
                    expect(leftNode.xCood()).toBe(leftArrowNodeStartX);
                });
                it("should update proximal node x cood", function () {
                    expect(proximalNode.xCood()).toBe(distalNode.xCood());
                });
            });

            describe("When left arrow node moved along its x and y axis", function () {
                var startNodeXCood,
                    startNodeYCood,
                    startDistalNodeXCood,
                    startDistalNodeYCood;

                beforeEach(function () {
                    startNodeXCood = leftNode.xCood();
                    startNodeYCood = leftNode.yCood();
                    startDistalNodeXCood = distalNode.xCood();
                    startDistalNodeYCood = distalNode.yCood();
                    leftNode.move(1, 2);

                });

                it("should update arrow node's x and y coods", function () {
                    expect(leftNode.xCood()).toBe(startNodeXCood + 1);
                    expect(leftNode.yCood()).toBe(startNodeYCood + 2);
                });

                it("should update distal nodes y Cood", function () {
                    expect(distalNode.xCood()).toBe(startDistalNodeXCood);
                    expect(distalNode.yCood()).toBe(startNodeYCood + 2);
                });
            });
        });

        describe("when right arrow node passes over the proximal node", function () {

            beforeEach(function () {

                var diff = rightNode.xCood() - proximalNode.xCood();
                rightNode.move(-(diff+ 100), 0);

            });
            it("should reverse direction of the arrow", function () {
                expect(rightNode.arrowDirection()).toBe("left");
            });
        });

        describe("when left arrow node passes over the distal node", function () {

            beforeEach(function () {

                var diff = leftNode.xCood() - distalNode.xCood();
                leftNode.move(-(diff- 100), 0);
            });
            it("should reverse direction of the arrow", function () {
                expect(leftNode.arrowDirection()).toBe("right");
            });
        });

        describe("linking arrow to classbox", function () {

            beforeEach(function () {
                webAPI.keyDown('U');
                rightNode.click();
                classBoxAPI.click();
            });
            it("should move arrow onto classbox ", function () {

                expect(rightNode.xCood()).toBe(classBoxAPI.xCood());
                expect(rightNode.yCood()).toBe(classBoxAPI.yCood() + (classBoxAPI.height() / 2));
            });
        });

        describe("disconnecting arrow from classbox", function () {
            var classBoxXCood;

            beforeEach(function () {
                classBoxXCood = classBoxAPI.xCood();
                webAPI.keyDown('U');
                rightNode.click();
                // this should disconnect arrow from classbox.
                rightNode.move(-100, 20);
            });
            it("should remove right arrow node from class box", function () {
                expect(rightNode.xCood()).toBe(classBoxXCood - 100);
            });
        });
    });
});