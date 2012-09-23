function createArrow(xCood, yCood, can, node) {
    var canvas = can;
    var arrowHead = Glenmorangie.svgUtils.createDiamond(canvas, xCood, yCood, "white");
    var index = 0;
    var arrowHeads = ["whiteDiamond", "blackDiamond", "inheritance", "implements", "none"];

    var createArrows = {

        arrow : function () {

        },

        whiteDiamond : function (x, y) {
            return Glenmorangie.svgUtils.createDiamond(canvas, x, y, "white");
        },

        blackDiamond : function (x, y) {
            return  Glenmorangie.svgUtils.createDiamond(canvas, x, y, "black");
        },

        inheritance : function (x, y) {
            return Glenmorangie.svgUtils.createExtendsArrow(canvas, x, y, "black", node.direction());
        },

        implements : function (x, y) {
            return Glenmorangie.svgUtils.createExtendsArrow(canvas, x, y, "white", node.direction());
        },

        none : function (x, y) {
            return Glenmorangie.svgUtils.createNullElement(canvas, x, y, node.direction() );
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

            if (arrowHeads[index] === "implements") {
                node.setImplementsLineMode();
            } else {
                node.setNormalLineMode();
            }
        }
    };
}