require(['WebAPI', 'ApplicationFactory'], function (WebAPI, ApplicationFactory) {

    describe("Connector", function () {
        var webAPI,
            class1 = {},
            configuration,
            rightNode,
            leftNode,
            proximalNode,
            distalNode;

        configuration = {

            connectors : [ {
                             leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                             rightNode : { x  : 225, y : 110 , arrows : ['diamond'] } }
                             ],

            verticalConnectors : [ {
                             topNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                             bottomNode : { x  : 225, y : 110 , arrows : ['diamond'] } }
                             ],

            classBoxes : [ { name : "List", x : 0, y : 0,
                    properties :  [{ name : "foo", visibility : "+", type : "String" },
                                   { name : "bar", visibility : "#", type : "int" }] } ]


        };

        new ApplicationFactory().setUp(configuration);

        webAPI = new WebAPI();

        var componentId = "UmlClass_0";

        var classBoxAPI = webAPI.getClassBox(componentId);
        var connector = webAPI.getConnector(0);
        var verticalConnector = webAPI.getVerticalConnector(0);

        var topArrowNode = verticalConnector.getTopArrowNode();
        var verticalProximalNode = verticalConnector.getProximalNode();
        var verticalDistalNode = verticalConnector.getDistalNode();
        var bottomArrowNode = verticalConnector.getBottomArrowNode();


        rightNode = connector.getRightArrowNode();
        leftNode = connector.getLeftArrowNode();
        proximalNode = connector.getProximalNode();
        distalNode = connector.getDistalNode();

        classBoxAPI.move(200, 200);

        function reset() {
            connector.getLeftArrowNode().coods(25, 10);
            connector.getProximalNode().coods(125, 60);
            connector.getRightArrowNode().coods(225, 110);

            resetVerticalConnector(configuration.verticalConnectors);
        }

        function resetVerticalConnector(configuration) {
            var config, topNode, topNodeX, topNodeY, bottomNode, bottomNodeX, bottomNodeY;

            config = configuration[0];

            topNode = config.topNode;

            topNodeX = topNode.x;
            topNodeY = topNode.y;

            bottomNode = config.bottomNode;
            bottomNodeX = bottomNode.x;
            bottomNodeY = bottomNode.y;

            topArrowNode.coods(topNodeX, topNodeY);
            bottomArrowNode.coods(bottomNodeX, bottomNodeY);
            verticalProximalNode.yCood((bottomNodeY - topNodeY) /2)
        }


        afterEach(function () {
            reset();
        });
        describe("vertical connector", function () {
            describe("When top node is dragged", function () {
                var startXTopNode,
                    startYTopNode;

                beforeEach(function () {
                    startXTopNode = topArrowNode.xCood();
                    startYTopNode = topArrowNode.yCood();
                    topArrowNode.move(20, 20);
                });

                it("should move node by equivalent distance", function () {
                    expect(topArrowNode.xCood()).toBe(startXTopNode + 20);
                    expect(topArrowNode.yCood()).toBe(startYTopNode + 20);
                    expect(verticalProximalNode.xCood()).toBe(startXTopNode + 20);
                });
            });

            describe("When proximal node is dragged", function () {
                var startXTopNode,
                    startYTopNode;

                beforeEach(function () {
                    startXTopNode = verticalProximalNode.xCood();
                    startYTopNode = verticalProximalNode.yCood();
                    verticalProximalNode.move(20, 10);
                });

                it("should move node by equivalent distance", function () {
                    expect(verticalProximalNode.xCood()).toBe(startXTopNode + 20);
                    expect(verticalProximalNode.yCood()).toBe(startYTopNode + 10);
                    expect(topArrowNode.xCood()).toBe(startXTopNode + 20);
                    expect(verticalDistalNode.yCood()).toBe(startYTopNode + 10);
                });
            });

            describe("When distal node is dragged", function () {
                var startXTopNode,
                    startYTopNode;

                beforeEach(function () {
                    startXTopNode = verticalDistalNode.xCood();
                    startYTopNode = verticalDistalNode.yCood();
                    verticalDistalNode.move(20, 10);
                });

                it("should move node by equivalent distance", function () {
                    expect(verticalDistalNode.xCood()).toBe(startXTopNode + 20);
                    expect(verticalDistalNode.yCood()).toBe(startYTopNode + 10);
                    expect(bottomArrowNode.xCood()).toBe(startXTopNode + 20);
                    expect(verticalProximalNode.yCood()).toBe(startYTopNode + 10);
                });
            });

            describe("When bottom arrow node is dragged", function () {
                var startXTopNode,
                    startYTopNode;

                beforeEach(function () {
                    startXTopNode = bottomArrowNode.xCood();
                    startYTopNode = bottomArrowNode.yCood();
                    bottomArrowNode.move(20, 10);
                });

                it("should move node by equivalent distance", function () {
                    expect(bottomArrowNode.xCood()).toBe(startXTopNode + 20);
                    expect(bottomArrowNode.yCood()).toBe(startYTopNode + 10);
                    expect(verticalDistalNode.xCood()).toBe(startXTopNode + 20);
                });
            });

            describe("when top arrow node passes below proximal node", function () {

                beforeEach(function () {

                    var diff = verticalProximalNode.yCood() - topArrowNode.yCood();
                    topArrowNode.move(0, diff + 100);

                });
                it("should point downwards", function () {
                    expect(topArrowNode.arrowDirection()).toBe("bottom");
                });
            });

            describe("when proximal node passes below top arrow node", function () {

                beforeEach(function () {

                    var diff = topArrowNode.yCood() - verticalProximalNode.yCood();
                    verticalProximalNode.move(0, diff + 100);

                });
                it("top arrow node should point upwards", function () {
                    expect(topArrowNode.arrowDirection()).toBe("top");
                });
            });

            describe("when distal node passes above top arrow node", function () {

                beforeEach(function () {

                    var diff = verticalDistalNode.yCood() - topArrowNode.yCood();
                    verticalDistalNode.move(0, -(diff + 100));

                });
                it("top arrow node should point down", function () {
                    expect(topArrowNode.arrowDirection()).toBe("bottom");
                });
            });

            describe("when bottom arrow node passes above distal node", function () {

                beforeEach(function () {

                    var diff = bottomArrowNode.yCood() - verticalDistalNode.yCood();
                    bottomArrowNode.move(0, -(diff + 100));

                });
                it("bottom arrow node should point upwards", function () {
                    expect(bottomArrowNode.arrowDirection()).toBe("top");
                });
            });

            describe("when distal node passes above bottom arrow", function () {

                beforeEach(function () {

                    var diff = verticalDistalNode.yCood() - bottomArrowNode.yCood();
                    verticalDistalNode.move(0, -(diff + 100));

                });
                it("bottom arrow node should point downwards", function () {
                    expect(bottomArrowNode.arrowDirection()).toBe("bottom");
                });
            });

            describe("when proximal node passes below bottom arrow", function () {

                beforeEach(function () {

                    var diff =  bottomArrowNode.yCood() - verticalProximalNode.yCood();
                    verticalProximalNode.move(0, diff + 300);

                });
                it("bottom arrow node should point upwards", function () {
                    expect(bottomArrowNode.arrowDirection()).toBe("top");
                });
            });


            describe("linking arrow to classbox", function () {

                beforeEach(function () {
                    webAPI.keyDown('U');
                    bottomArrowNode.click();
                    classBoxAPI.click();
                });
                afterEach(function () {
                    webAPI.keyDown('U');
                    bottomArrowNode.click();
                });
                it("should move arrow onto classbox ", function () {
                    expect(bottomArrowNode.yCood()).toBe(classBoxAPI.yCood());
                });
            });

            describe("disconnecting vertical arrow from classbox", function () {
                var classBoxYCood;

                beforeEach(function () {
                    webAPI.keyDown('U');
                    bottomArrowNode.click();
                    classBoxAPI.click();

                    classBoxYCood = classBoxAPI.yCood();
                    webAPI.keyDown('U');
                    bottomArrowNode.click();
                    // this should disconnect arrow from classbox.
                    bottomArrowNode.move(100, -20);
                });
                it("should remove vertical arrow node from class box", function () {
                    expect(bottomArrowNode.yCood()).toBe(classBoxYCood - 20);
                });
            });

            describe("When vertical arrow is attached to class box", function () {
                var arrowX, arrowY;
                beforeEach(function () {
                    webAPI.keyDown('U');
                    bottomArrowNode.click();
                    classBoxAPI.click();

                    arrowX = bottomArrowNode.xCood();
                    arrowY = bottomArrowNode.yCood();
                })
                describe("When class box is moved", function () {
                    beforeEach(function () {
                        classBoxAPI.move(10, 20);
                    });
                    it("should move attached arrownode with it", function () {
                        expect(bottomArrowNode.xCood()).toBe(arrowX + 10);
                        expect(bottomArrowNode.yCood()).toBe(arrowY + 20);
                    });
                    it("should move distal node in x axis with it", function () {
                        expect(verticalDistalNode.xCood()).toBe(bottomArrowNode.xCood());
                    });
                });
                describe("When arrow node is moved", function () {
                    var arrowXCood;
                    beforeEach(function () {

                        bottomArrowNode.move(10, 0);
                        arrowXCood = bottomArrowNode.xCood();
                    });
                    describe("When class box is moved", function () {
                        beforeEach(function () {
                            classBoxAPI.move(20, 0);
                        });
                        it("should keep arrow in position on box it was moved to", function () {
                            expect(bottomArrowNode.xCood()).toBe(arrowXCood + 20);
                        });
                    });
                });
                afterEach(function () {
                    webAPI.keyDown('U');
                    bottomArrowNode.click();
                });
            });
        })


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
            afterEach(function () {
                webAPI.keyDown('U');
                rightNode.click();
            });
            it("should move arrow onto classbox ", function () {

                expect(rightNode.xCood()).toBe(classBoxAPI.xCood());
                expect(rightNode.yCood()).toBe(classBoxAPI.yCood() + (classBoxAPI.height() / 2));
            });

            describe("When arrow node is moved", function () {
                var arrowYCood;
                beforeEach(function () {
                    rightNode.move(0, 10);
                    arrowYCood = rightNode.yCood();
                });
                describe("When class box is moved", function () {
                    beforeEach(function () {
                        classBoxAPI.move(0, 20);
                    });
                    it("should keep arrow in position on box it was moved to", function () {
                        expect(rightNode.yCood()).toBe(arrowYCood + 20);
                    });
                });
            });
        });

        describe("disconnecting arrow from classbox", function () {
            var classBoxXCood;

            beforeEach(function () {
                webAPI.keyDown('U');
                rightNode.click();
                classBoxAPI.click();

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