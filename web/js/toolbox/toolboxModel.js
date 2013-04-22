define(['Model', 'jQuery', 'Collection'],function (Model, $, Collection) {


    return Model.extend({

        initialize : function (buttons) {
            this.buttons = new Collection();
            for(var i = 0; i < buttons.length; i++){
                this.buttons.add(new Model(buttons[i]))
            }
        }
    });
});