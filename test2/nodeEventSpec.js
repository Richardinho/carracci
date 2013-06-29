define(['utility/eventNode', 'underscore'], function(EventNode, _) {

    describe('event enhanced json', function() {

        var foo;

        beforeEach(function () {

            foo = new EventNode({

                bar : {

                    dan1 : "dan1",
                    dan2 : "dan2",

                    eco : {

                        goat : {

                            hat1 : "hat1",
                            hat2 : "hat2"
                        }
                    }
                }
            });
        });

        it('should be able to access value of child nodes', function() {
           expect(foo.children['bar'].children['dan1'].value).toBe("dan1");
        });

        describe("unwrapping a node", function () {

            var unwrapped;

            beforeEach(function () {

                unwrapped = foo.unwrap();
            });

            it("should return original pojso", function () {
                expect(unwrapped).toEqual({
                    bar : {

                        dan1 : "dan1",
                        dan2 : "dan2",

                        eco : {
                            goat : {
                                hat1 : "hat1",
                                hat2 : "hat2"
                            }
                        }
                    }
                });
            });
        });

        describe("When value of a child node is set", function () {

            var result1, result2;

            beforeEach(function () {

                foo.on("change", function (newValue, oldValue) {

                    result1 = newValue;
                    result2 = oldValue;
                });
                foo.children['bar'].children['eco'].children['goat'].children['hat1'].set('anotherHat');
            });
            it("should call handler registered on parent node", function () {

                expect(result1).toBe("anotherHat");
                expect(result2).toBe("hat1");
            });
        });

        describe("When a new value node is created", function () {

            var newNode;

            beforeEach(function () {

                foo.on("create", function (node) {
                    newNode = node;
                });

                foo.children['bar'].children['eco'].createChild("hello", "world");
            });

            it("should insert node into json", function () {

                expect(foo.children['bar'].children['eco'].children['hello'].value).toBe("world");
            });

            it("should fire 'create' event", function () {

                expect(newNode.value).toBe("world");
            });


        });

        describe("When an object node is created", function () {

            var newNode,
                newValue;

            beforeEach(function () {

                foo.on("create", function (node) {
                    newNode = node;
                });

                foo.on("change", function (newVal) {
                    newValue = newVal;

                });

                foo.children['bar'].children['eco'].createChild("hello", {

                    moo : {

                        pin : "pin"
                    }
                });

            });

            it("should fire 'create' event", function () {

                expect(newNode.children['moo'].children['pin'].value).toBe("pin");

            });

            describe("setting value node",function () {

                beforeEach(function () {

                    foo.children['bar']
                        .children['eco']
                        .children['hello']
                        .children['moo']
                        .children['pin'].set("newPin");
                });
                it("should set node to new value", function () {

                    expect(newValue).toBe("newPin");

                });
            });

            describe("deleting node", function () {
                var deletedNode;
                beforeEach(function () {

                    foo.on("delete", function (node) {
                        deletedNode = node;
                    });
                    foo.children['bar'].children['eco'].deleteChild("hello");
                });

                it("should delete node", function () {

                    expect(_.size(foo.children['bar'].children['eco'].children)).toBe(1);
                });

                it("should fire 'delete' event", function () {

                    expect(deletedNode.name).toBe("hello");
                });
            });

        });



    });
});
