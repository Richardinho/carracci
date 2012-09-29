var canvas;


function NodeWithArrowClass (canvas, connector, x, y, id, node) {

    Node.call(this,canvas, connector, x, y, id);

    this.arrow = createArrow(this.xCood, this.yCood, canvas, this);
    this.partnerNode = node;
    var self = this;

    this.draggableElement.click(function () {
        var currentKey = Glenmorangie.module.currentKey;
        if (currentKey != null && currentKey === 113) { //  'q'
            self.arrow.changeArrowHead();
            self.connector.renderAll();
        }

        if (currentKey != null && currentKey === 114) { // 'r'
            //Glenmorangie.module.askingToAttachNode = self;
        }
    });


}

NodeWithArrowClass.prototype = new Node();

NodeWithArrowClass.prototype.render = function () {
    this.setArrowDirection(this.partnerNode.getX());
    this.arrow.updateArrowHead(this.xCood, this.yCood);
    Node.prototype.render.call(this);
}

NodeWithArrowClass.prototype.setArrowDirection = function (x, y) {

    if ( this.xCood > x) {
        this.arrow.setArrowDirection("right");
    } else {
        this.arrow.setArrowDirection("left");
    }

}



