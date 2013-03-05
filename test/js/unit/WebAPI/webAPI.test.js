require(['WebAPI', 'keyManager'], function (WebAPI, KeyManager) {

    describe("WebAPI", function () {
        var webAPI,
            class1 = {},
            configuration;

        configuration = {

            connectors : [ { id : "foo",
                             leftNode : { x  : 25, y : 10 , arrows : ['diamond'] },
                             rightNode : { x  : 225, y : 110 , arrows : ['diamond'] } }
                             ],
            classBoxes : [ { name : "List", id : "blahClass", x : 0, y : 0, properties :  [{ name : "foo", visibility : "+", type : "String" }, { name : "bar", visibility : "#", type : "int" }] } ]

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

        describe("classboxes", function () {
            describe("getClassBox", function () {
                var blahClass;
                beforeEach(function () {
                    blahClass = webAPI.getClassBox("blahClass");
                });
                it("should return classBox object", function () {
                    expect(blahClass.id).toBe("blahClass");
                });
            });

            describe("move()", function () {
                var blahClass,
                    startXCood,
                    startYCood;
                beforeEach(function () {
                    blahClass = webAPI.getClassBox("blahClass");
                    startXCood = blahClass.xCood();
                    startYCood = blahClass.yCood();
                    blahClass.move(100, 200);
                });
                it("should set x and y coods", function () {
                    expect(blahClass.xCood()).toBe(startXCood + 100);
                    expect(blahClass.yCood()).toBe(startYCood + 200);
                });
            });
        });

        describe("getConnector()", function () {
            var connector;

            beforeEach(function () {
                connector = webAPI.getConnector("foo")
            });

            it("should return connector with id 'foo' ", function () {
                expect(connector.id).toEqual("foo");
            });
        });
        describe("getting state", function () {
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
        });
        describe("moving nodes", function () {
            describe("rightArrowNode.move()", function () {
                var node,
                    startNodeXCood,
                    startNodeYCood;

                beforeEach(function () {
                    node = webAPI.getRightArrowNode("foo");
                    startNodeXCood = node.xCood();
                    startNodeYCood = node.yCood();
                    node.move(1, 2);
                });

                it("should update arrow node's x and y coods", function () {
                    expect(node.xCood()).toBe(startNodeXCood + 1);
                    expect(node.yCood()).toBe(startNodeYCood + 2);
                });
            });

            describe("proximalNode.move()", function () {
                var node,
                    startNodeXCood,
                    startNodeYCood;

                beforeEach(function () {
                    node = webAPI.getProximalNode("foo");
                    startNodeXCood = node.xCood();
                    startNodeYCood = node.yCood();
                    node.move(1, 2);
                });

                it("should update node's x and y coods", function () {
                    expect(node.xCood()).toBe(startNodeXCood + 1);
                    expect(node.yCood()).toBe(startNodeYCood + 2);
                });
            });

            describe("distalNode.move()", function () {
                var node,
                    startNodeXCood,
                    startNodeYCood;

                beforeEach(function () {
                    node = webAPI.getDistalNode("foo");
                    startNodeXCood = node.xCood();
                    startNodeYCood = node.yCood();
                    node.move(1, 2);
                });

                it("should update node's x and y coods", function () {
                    expect(node.xCood()).toBe(startNodeXCood + 1);
                    expect(node.yCood()).toBe(startNodeYCood + 2);
                });
            });

            describe("leftArrowNode.move()", function () {
                var node,
                    startNodeXCood,
                    startNodeYCood;

                beforeEach(function () {
                    node = webAPI.getLeftArrowNode("foo");
                    startNodeXCood = node.xCood();
                    startNodeYCood = node.yCood();
                    node.move(1, 2);
                });

                it("should update arrow node's x and y coods", function () {
                    expect(node.xCood()).toBe(startNodeXCood + 1);
                    expect(node.yCood()).toBe(startNodeYCood + 2);
                });
            });
        });
        describe("setting x and y coods", function () {
            describe("right arrow node", function () {
                describe("rightArrowNode.xCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getRightArrowNode("foo");
                        node.xCood(300);
                    });
                    it("should set xCood", function () {
                        expect(node.xCood()).toBe(300);
                    });
                });

                describe("rightArrowNode.yCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getRightArrowNode("foo");
                        node.yCood(458);
                    });
                    it("should set yCood", function () {
                        expect(node.yCood()).toBe(458);
                    });
                });
            });

            describe("proximal node", function () {
                describe("proximalNode.xCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getProximalNode("foo");
                        node.xCood(300);
                    });
                    it("should set xCood", function () {
                        expect(node.xCood()).toBe(300);
                    });
                });

                describe("proximalNode.yCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getProximalNode("foo");
                        node.yCood(458);
                    });
                    it("should set yCood", function () {
                        expect(node.yCood()).toBe(458);
                    });
                });
            });

            describe("distal node", function () {
                describe("distalNode.xCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getDistalNode("foo");
                        node.xCood(300);
                    });
                    it("should set xCood", function () {
                        expect(node.xCood()).toBe(300);
                    });
                });

                describe("distalNode.yCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getDistalNode("foo");
                        node.yCood(458);
                    });
                    it("should set yCood", function () {
                        expect(node.yCood()).toBe(458);
                    });
                });
            });

            describe("left arrow node", function () {
                describe("leftArrowNode.xCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getLeftArrowNode("foo");
                        node.xCood(300);
                    });
                    it("should set xCood", function () {
                        expect(node.xCood()).toBe(300);
                    });
                });

                describe("leftArrowNode.yCood(value)", function () {
                    var node;
                    beforeEach(function () {
                        node = webAPI.getLeftArrowNode("foo");
                        node.yCood(458);
                    });
                    it("should set yCood", function () {
                        expect(node.yCood()).toBe(458);
                    });
                });
            });
        });

        describe("getting arrow direction", function () {
            describe("rightArrowNode.arrowDirection()", function () {
                var rightArrowNode,
                    proximalNode;
                describe("When arrow node is to right of proximal node", function () {
                    beforeEach(function () {
                        rightArrowNode = webAPI.getRightArrowNode("foo");
                    });
                    it("should return direction 'right' ", function () {
                        expect(rightArrowNode.arrowDirection()).toBe("right");
                    });
                });
                describe("When arrow node is to left of proximal node", function () {
                    beforeEach(function () {
                        rightArrowNode = webAPI.getRightArrowNode("foo");
                        rightArrowNode.model.update(40, 110);
                    });
                    it("should return direction 'left' ", function () {
                        expect(rightArrowNode.arrowDirection()).toBe("left");
                    });
                });
            });

            describe("leftArrowNode.arrowDirection()", function () {
                var leftArrowNode,
                    distalNode;
                describe("When arrow node is to left of distal node", function () {
                    beforeEach(function () {
                        leftArrowNode = webAPI.getLeftArrowNode("foo");
                    });
                    it("should return direction 'right' ", function () {
                        expect(leftArrowNode.arrowDirection()).toBe("left");
                    });
                });
                describe("When arrow node is to right of distal node", function () {
                    beforeEach(function () {
                        leftArrowNode = webAPI.getLeftArrowNode("foo");
                        leftArrowNode.model.update(240, 110);
                    });
                    it("should return direction 'right' ", function () {
                        expect(leftArrowNode.arrowDirection()).toBe("right");
                    });
                });
            });

            describe("arrowNode.click()", function () {
                var node, result;

                var handler = function () {
                    result = "click"
                };
                beforeEach(function () {
                    node = webAPI.getRightArrowNode("foo");
                    node.view.element.click(handler);
                    node.click();
                });
                it("should fire click event", function () {
                    expect(result).toBe("click");
                });
                afterEach(function () {
                    node.view.element.unclick(handler);
                })
            })

            describe("classBox.click()", function () {
                var result;
                var handler = function () {
                    result = "click";
                }
                beforeEach(function () {
                    classBox = webAPI.getClassBox("blahClass");
                    classBox.view.element.click(handler);
                    classBox.click();
                });
                it("should fire click event", function () {
                    expect(result).toBe("click");
                });
                afterEach(function () {
                    classBox.view.element.unclick(handler);
                })
            });

            describe("classBox.height", function () {
                var classBox;
                beforeEach(function () {
                    classBox = webAPI.getClassBox("blahClass");
                });
                it("should return height of classbox", function () {
                    expect(classBox.height()).toBe(classBox.model.get("height"));
                });
            });

            describe("keyDown('U')", function () {
                beforeEach(function () {
                    webAPI.keyDown('U');
                });
                it("should set 'U_KEY' in KeyManager to TRUE", function () {
                    expect(KeyManager.U_KEY).toBe(true);
                });
            });
        });
    });
});