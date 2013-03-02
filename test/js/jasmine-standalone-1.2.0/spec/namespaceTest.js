describe("namespace function", function() {

  describe("when we create a namespace", function () {


      beforeEach(function() {
        Glenmorangie.namespace("Glenmorangie.hello.i.love.you");
      });

      it("should define object Glenmorangie.hello", function() {
        expect(Glenmorangie.hello).toBeDefined();
      });


      it("should define object Glenmorangie.hello.i.love.you", function() {
        expect(Glenmorangie.hello.i.love.you).toBeDefined();
      });

  });


});