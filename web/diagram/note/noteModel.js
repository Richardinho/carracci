define(["utility/nodeWrapper" ],

        function (
            NodeWrapper
        ) {


    return NodeWrapper.extend({

        initialize : function (options) {

            NodeWrapper.prototype.initialize.call(this, options);

            this.centerNode = {

                x : 0,
                y : 0
            };
            this.x = 0;
            this.y = 0;
            this.height = 100;


        },

        getHeight : function () {

            return this.height;
        },

        getWidth : function () {

            return this.model.children['width'].value;
        },

        setText : function (text) {

            this.model.children['text'].set(text)
        },

        getText : function () {

            return this.model.children['text'].value;
        },

        getType : function () {

            return this.model.children['type'].value;
        },

        setCoods : function (x, y) {

            this.setXCood(x);
            this.setYCood(y);
        },

        setXCood : function (x) {

            console.log(this.model.children);
            this.model.children['xCood'].set(x);
        },

        setYCood : function (y) {

            this.model.children['yCood'].set(y);
        },

        getXCood : function () {

            return parseInt(this.model.children['xCood'].value, 10);
        },


        getYCood : function () {

            return parseInt(this.model.children['yCood'].value, 10);

        },

        setHeight : function (height) {

            this.height = height;

        },



        setCenterNode : function (x, y) {

            this.centerNode = {

                x : x,
                y : y
            }
        }






    });
});

