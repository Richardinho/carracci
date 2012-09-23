function createArrow(xCood, yCood, can, node) {
    var canvas = can;
    var arrowHead = Glenmorangie.svgUtils.createDiamond(canvas, xCood, yCood, "white");
    var index = 0;
    var arrowHeads = ["whiteDiamond", "blackDiamond", "inheritance"];

    var createArrows = {

        arrow : function () {

        },

        whiteDiamond : function (x, y) {
            node.setNormalLineMode();
            return Glenmorangie.svgUtils.createDiamond(canvas, x, y, "white");
        },

        blackDiamond : function (x, y) {
            node.setNormalLineMode();
            return  Glenmorangie.svgUtils.createDiamond(canvas, x, y, "black");
        },

        inheritance : function (x, y) {
            node.setInheritanceMode();
            return Glenmorangie.svgUtils.createDiamond(canvas, x, y, "red");

        },

        implementation : function () {

        }
    };

    return {

        updateArrowHead : function (x, y) {
            arrowHead.remove();
            arrowHead = createArrows[arrowHeads[index]](x, y);

        },

        changeArrowHead : function () {
            index++;
            index = (index === arrowHeads.length) ? 0 : index;
        }
    };
}