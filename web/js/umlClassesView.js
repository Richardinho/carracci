
$(document).ready(function () {


    Glenmorangie.umlProject.UmlClassView = Backbone.View.extend({

        initialize : function () {
            _.bindAll(this, "render");
            this.model.on("change:class", this.respondToModelUpdate, this);

            var transparentPane = createPane(100, 100, 200, 150).initialize(Glenmorangie.module.canvas);
            transparentPane.addListener(this, this.updateUmlClassElement);

            this.render();

        },

        template : _.template($('#uml-class-template').html()),

        render : function () {

            var html = this.template({ "class" : this.model.get("class") });
            this.$el.html(html);
            this.positionElement(this.getX(), this.getY());
        },

        updateUmlClassElement : function (x, y) {
            var umlClassElement = this._getUmlClassElement();
            umlClassElement.css('left', x);
            umlClassElement.css('top', y);

        },

        respondToModelUpdate : function () {

            this.render();
        },

        getX : function () {
            if (this.model.get("position")) {
                return this.model.get("position").x
            }
        },

        getY : function () {
            if (this.model.get("position")) {
                return this.model.get("position").y
            }
        },


        updatePositionCoodsInModel : function (x, y) {
            this.model.set("position", {"x" : x, "y" : y });
        },

        positionElement : function (x, y) {
            this.updateUmlClassElement(x, y);
        },

        _getUmlClassElement : function () {
            return $('#uml-class-' + this.model.get("class").id);
        }



    });

});

