var nodeModel = {

    center : { x : 10, y : 10 },

    radius : 10,

    orientation : "east"


}


var arrowView = {

    model : nodeModel,

    render : function () {

        var coods = this.calculateCoods();
    },

    calculateCoods : function () {

        var apex = calculateApex();

        function calculateApex() {
            var x,
                y,
                modelX = this.model.center.x,
                modelY = this.model.center.Y,
                radius = this.model.radius;

            switch (this.model.orientation) {

                case "north" :
                    x = modelX;
                    y = modelY + radius;
                    break;
                case "east" :
                    x = modelX + radius;
                    y = modelY;
                    break;
                case "west" :
                    x = modelX - radius;
                    y = modelY;
                    break;
                case "south" :
                    x = modelX;
                    y = modelY - radius;
                    break;
            }

            return { "x" : x, "y" : y };
        }
    }


}