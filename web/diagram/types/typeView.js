define(["BaseType", 'utility/typeBox'],function (BaseType, TypeBox) {

    return BaseType.extend({
    /* this should watch the model. on specific events it should call methods which delegate to the
    typeBox object for rendering*/

        initialize : function (options) {

            this.model = options.model

            this.model.on("update:position", this.move, this);
            this.model.on("update", this.update, this);
            this.model.on("destroy", this.destroy, this);


            this.box = new TypeBox({

                model : this.model,
                x : 100,
                y : 200,
                width : 100,
                height : 50

            });
        },

        destroy : function () {
            this.box.destroy();
        },

        getElement : function () {
            return this.box;
        },

        move : function () {
            this.box.move();
        },

        update : function () {
            if(this.box) {
                this.box.update();
            }
        }
    });
});