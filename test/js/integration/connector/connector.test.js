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
            classBoxes : [ { name : "List", id : "blahClass", x : 0, y : 0,
                    properties :  [{ name : "foo", visibility : "+", type : "String" },
                                   { name : "bar", visibility : "#", type : "int" }] } ]


        };

        webAPI = new WebAPI(configuration);
        // because of a bug in the classbox we need to move it separately
        webAPI.getClassBox("blahClass").move(200, 200);

        function reset() {
            var rightArrowNode, proximalNode, leftArrowNode, connector;

            connector = webAPI.getConnector("foo");
            rightArrowNode = connector.getRightArrowNode();
            proximalNode = connector.getProximalNode();
            leftArrowNode = connector.getLeftArrowNode();

            rightArrowNode.model.update(225, 110);
            leftArrowNode.model.update(25, 10);
            proximalNode.xCood(125);
        }


        afterEach(function () {
            reset();
        });




        describe("moving nodes along x and y axis and effect on other nodes", function () {
            describe("When right arrow node moved along its x and y axis", function () {
                var node,
                    proximalNode,
                    startNodeXCood,
                    startNodeYCood,
                    startProximalNodeXCood;

                beforeEach(function () {
                    node = webAPI.getConnector("foo").getRightArrowNode();
                    proximalNode = webAPI.getConnector("foo").getProximalNode();
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
                    startProximalYCood,
                    connector;

                beforeEach(function () {
                    connector = webAPI.getConnector("foo");
                    rightArrowNode = connector.getRightArrowNode("foo");
                    proximalNode = connector.getProximalNode("foo");
                    distalNode = connector.getDistalNode("foo");

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

            describe("When distal node is moved along its x and y axis", function () {

                var leftArrowNode,
                    leftArrowNodeStartX,
                    proximalNode,
                    distalNode,
                    startDistalXCood,
                    startDistalYCood,
                    connector;

                beforeEach(function () {
                    connector = webAPI.getConnector("foo");
                    leftArrowNode = connector.getLeftArrowNode();
                    leftArrowNodeStartX = leftArrowNode.xCood();
                    proximalNode = connector.getProximalNode();
                    distalNode = connector.getDistalNode();

                    startDistalXCood = distalNode.xCood();
                    startDistalYCood = distalNode.yCood();

                    distalNode.move(2, 3);

                });

                it("should update distal node x and y coods", function () {
                    expect(distalNode.xCood()).toBe(startDistalXCood + 2);
                    expect(distalNode.yCood()).toBe(startDistalYCood + 3);
                });

                it("should update left arrow node y cood", function () {
                    expect(leftArrowNode.yCood()).toBe(distalNode.yCood());
                    expect(leftArrowNode.xCood()).toBe(leftArrowNodeStartX);
                });
                it("should update proximal node x cood", function () {
                    expect(proximalNode.xCood()).toBe(distalNode.xCood());
                });
            });

            describe("When left arrow node moved along its x and y axis", function () {
                var node,
                    distalNode,
                    startNodeXCood,
                    startNodeYCood,
                    startDistalNodeXCood,
                    connector;

                beforeEach(function () {
                    connector = webAPI.getConnector("foo");
                    node = connector.getLeftArrowNode();
                    distalNode = connector.getDistalNode();
                    startNodeXCood = node.xCood();
                    startNodeYCood = node.yCood();
                    startDistalNodeXCood = distalNode.xCood();
                    node.move(1, 2);

                });

                it("should update arrow node's x and y coods", function () {
                    expect(node.xCood()).toBe(startNodeXCood + 1);
                    expect(node.yCood()).toBe(startNodeYCood + 2);
                });

                it("should update distal nodes y Cood", function () {
                    expect(distalNode.xCood()).toBe(startDistalNodeXCood);
                    expect(distalNode.yCood()).toBe(startNodeYCood + 2);
                });
            });
        });

        describe("when right arrow node passes over the proximal node", function () {
            var rightArrowNode,
                proximalNode,
                connector;

            beforeEach(function () {
                connector = webAPI.getConnector("foo")
                rightArrowNode = connector.getRightArrowNode();
                proximalNode = connector.getProximalNode();


                var diff = rightArrowNode.xCood() - proximalNode.xCood();
                rightArrowNode.move(-(diff+ 100), 0);

            });
            it("should reverse direction of the arrow", function () {
                expect(rightArrowNode.arrowDirection()).toBe("left");
            });
        });

        describe("when left arrow node passes over the distal node", function () {
            var leftArrowNode,
                distalNode,
                connector;

            beforeEach(function () {
                connector = webAPI.getConnector("foo")
                leftArrowNode = connector.getLeftArrowNode();
                distalNode = connector.getDistalNode();


                var diff = leftArrowNode.xCood() - distalNode.xCood();
                leftArrowNode.move(-(diff- 100), 0);

            });
            it("should reverse direction of the arrow", function () {
                expect(leftArrowNode.arrowDirection()).toBe("right");
            });
        });

        describe("linking arrow to classbox", function () {
            var rightArrowNode,
                classBox,
                connector;

            beforeEach(function () {
                connector = webAPI.getConnector("foo")
                rightArrowNode = connector.getRightArrowNode();
                classBox = webAPI.getClassBox("blahClass");
                webAPI.keyDown('U');
                rightArrowNode.click();
                classBox.click();

            });
            it("should move arrow onto classbox ", function () {
                var classBoxXCood = classBox.xCood(),
                    classBoxHeight = classBox.height();
                expect(rightArrowNode.xCood()).toBe(classBoxXCood);
                expect(rightArrowNode.yCood()).toBe(classBox.yCood() + (classBoxHeight / 2));
            });
        });

        describe("disconnecting arrow from classbox", function () {
            var rightArrowNode,
                classBox,
                classBoxXCood,
                connector;

            beforeEach(function () {
                connector = webAPI.getConnector("foo")
                rightArrowNode = connector.getRightArrowNode();
                classBox = webAPI.getClassBox("blahClass");
                classBoxXCood = classBox.xCood();
                webAPI.keyDown('U');
                rightArrowNode.click();
                // this should disconnect arrow from classbox.
                rightArrowNode.move(-100, 20);
            });
            it("should remove right arrow node from class box", function () {
                expect(rightArrowNode.xCood()).toBe(classBoxXCood - 100);
            });
        });
    });
});