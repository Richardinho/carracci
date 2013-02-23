define(['ModelElement'], function (ModelElement) {

    return ModelElement.extend({


        initialize : function (options) {
            ModelElement.prototype.initialize.call(this, options);
        },

        update : function (x, y, validate) {

            this.updateCoordinates(x, y, validate);

            if( this.arrowNodeModel ) {
                //this.arrowNodeModel.updateFromProximalNode(x, y);
            }

            if( this.distalNodeModel) {
                //this.distalNodeModel.updateFromDistalNode(x, y);
            }

            if(this.lastNodeModel) {
                //this.lastNodeModel.updateFromDistalNode(x, y);
            }
        },

        updateFromArrowController : function (y, validate) {
            var x = this.get('xCood');
            this.updateCoordinates(x, y, validate);
        },

        updateFromDistalNode : function (x, y) {
             this.set({ xCood : x});
        },

        updateFromLastNode : function (x, y) {
             this.set({ yCood : y});
        },

        //  injectors
        setArrowNodeModel : function (nodeModel) {
            this.arrowNodeModel = nodeModel;
        },

        setDistalNodeModel : function (nodeModel) {
            this.distalNodeModel = nodeModel;
        },

        setLastNodeModel : function (nodeModel) {
            this.lastNodeModel = nodeModel;
        }

    });


});


