function createArrow(xCood, yCood, can, node) {
    var canvas = can;
    var arrowHead = Glenmorangie.svgUtils.createDiamond(canvas, xCood, yCood, "white");
    var index = 0;
    var arrowHeads = ["arrow", "blackDiamond", "inheritance", "implements", "none"];
    var direction = "right";

    var createArrows = {

        arrow : function (x, y) {
            return  Glenmorangie.svgUtils.createArrow(canvas, x, y, direction);
        },

        blackDiamond : function (x, y) {
            return  Glenmorangie.svgUtils.createDiamond(canvas, x, y, "black");
        },

        inheritance : function (x, y) {
            return Glenmorangie.svgUtils.createExtendsArrow(canvas, x, y, "black", direction);
        },

        implements : function (x, y) {
            return Glenmorangie.svgUtils.createExtendsArrow(canvas, x, y, "white", direction);
        },

        none : function (x, y) {
            return Glenmorangie.svgUtils.createNullElement(canvas, x, y, direction );
        }
    };

    return {

        updateArrowHead : function (x, y) {
            arrowHead.remove();
            arrowHead = createArrows[arrowHeads[index]](x, y);
        },

        setArrowDirection : function (dir) {
            direction = dir;

        },

        changeArrowHead : function () {
            index++;
            index = (index === arrowHeads.length) ? 0 : index;

            if (arrowHeads[index] === "implements") {
                //node.setImplementsLineMode();
            } else {
                //node.setNormalLineMode();
            }
        }
    };
}