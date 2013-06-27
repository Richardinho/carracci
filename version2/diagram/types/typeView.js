define(["core/BaseType", 'utility/typeBox'],function (BaseType, TypeBox) {

    return BaseType.extend({

        initialize : function (options) {

            console.log("initialize type view", options.model)

            this.model = options.model;
            this.id = options.id;
            this.model.on("movetype", this.move, this);
            this.model.on("updatetype", this.update, this);

            this.box = new TypeBox({

                model : this.model.getType(this.id),
                x : 100,
                y : 200,
                width : 100,
                height : 50

            });

        },

        getElement : function () {
            return this.box;
        },


        render : function () {

        },

        move : function (id) {

            if(id === this.id) {
                this.box.move();
            }
        },

        update : function (id) {
            if(id === this.id) {
                this.box.update();

            }
        }
    });
});