require(['globalController',
         'jQuery',
         'NodeToBoxCoordinator',
         'ModelArrowNode',
         'ModelDiamond',
         'ModelPointer',
         'ViewPointer',
         'CollectionPointer',
         'ClassBoxModel',
         'propertyBuilder',
         'ModelDistalNode' ], function (Controller,
                                     $,
                                     NodeBoxCoordinator,
                                     ModelArrowNode,
                                     ModelDiamond,
                                     ModelPointer,
                                     ViewPointer,
                                     CollectionPointer,
                                     BoxModel,
                                     propertyBuilder,
                                     ModelDistalNode ) {

    describe("Node to Box link Integration test", function () {

        var controller;

        beforeEach(function () {
            controller = Controller;
        });

        afterEach(function () {
            $('svg').remove();
        });

        describe("When user requests to link arrow", function () {

            var mockArrow = { foo : "foo" };

            beforeEach(function () {
                controller.arrowRequest(mockArrow)
            });

            it("should store arrow in object", function () {
                expect(controller.arrow.foo).toBe("foo");
            });

            afterEach(function () {
                delete controller.arrow;
            });
        });

        describe("When user requests to link box", function () {
            describe("When no arrow is currently being stored", function () {
                var mockBox = { foo : "foo" };
                beforeEach(function () {
                    controller.boxRequest(mockBox)
                });
                it("should not store box", function () {
                    expect(controller.box).toBe(undefined);
                });

            });

            describe("When arrow is currently being stored", function () {
                var mockBox = { foo : "foo" };
                var mockArrow = { foo : "foo" };
                var spyOnNodeBoxCoordinatorInitializer;

                beforeEach(function () {
                    spyOnNodeBoxCoordinatorInitializer = spyOn(NodeBoxCoordinator.prototype, "initialize");
                    controller.arrowRequest(mockArrow)
                    controller.boxRequest(mockBox)
                });
                it("should create NodeBoxCoordinator", function () {
                    expect(spyOnNodeBoxCoordinatorInitializer).toHaveBeenCalled();
                });
            });
        });
        describe("When node and box are linked together", function () {

            var arrowNodeModel,
                boxModel,
                blackDiamondModel,
                blackDiamondView,
                pointers,
                proximalNodeModel;

            beforeEach(function () {

                blackDiamondModel = new ModelDiamond({ "direction" : "left",
                                                       "x" : 100,
                                                       "y" : 50,
                                                       "color" : "green" });

                blackDiamondView = new ViewPointer({ "model" : blackDiamondModel });

                pointers = new CollectionPointer([ blackDiamondModel ]);

                arrowNodeModel = new ModelArrowNode({ "pointers" : pointers, "x" : 10, "y" : 20 });

                proximalNodeModel = new ModelDistalNode({ "id" : "foo",
                                                          "x" : 5,
                                                          "y" : 20 ,
                                                          "connector" : {} });

                distalNodeModel = new ModelDistalNode({ "id" : "foo",
                                                          "x" : 5,
                                                          "y" : 5 ,
                                                          "connector" : {} });

                arrowNodeModel.setProximalNodeModel(proximalNodeModel);
                arrowNodeModel.setDistalNodeModel(distalNodeModel);

                boxModel = new BoxModel({ x : 50, y : 100, height : 200 });
                controller.arrowRequest(arrowNodeModel);

                controller.boxRequest(boxModel)

            });

            it("should move node on to position on the box", function () {
                expect(arrowNodeModel.get('xCood')).toBe(50);
                expect(arrowNodeModel.get('yCood')).toBe(200);
            });

            describe("When box is moved", function () {
                beforeEach(function () {
                    boxModel.updateCoordinates(60, 110, true);
                });
                it("should move node", function () {
                    expect(arrowNodeModel.get('xCood')).toBe(60);
                    // at present the vertical offset is hard coded.
                    expect(arrowNodeModel.get('yCood')).toBe(135);

                });
            });
        });


    });
});
