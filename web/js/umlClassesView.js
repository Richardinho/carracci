
$(document).ready(function () {


    Glenmorangie.umlProject.UmlClassView = Backbone.View.extend({

        initialize : function () {
            _.bindAll(this, "render");
            this.model.on("change:class", this.respondToModelUpdate, this);

            this.render();
            this._createTransparentPane();

        },

        template : _.template($('#uml-class-template').html()),

        render : function () {

            var html = this.template({ "class" : this.model.get("class") });
            this.$el.html(html);
        },

        updateUmlClassElement : function (x, y) {
            var umlClassElement = this._getUmlClassElement();
            umlClassElement.css('left', x);
            umlClassElement.css('top', y);

        },

        respondToModelUpdate : function () {

            this.render();
            this.updateUmlClassElement(this.getXPosition(), this.getYPosition());
            var height = this._getUmlClassElement().css("height");
            this.resizePane(height);
        },

        resizePane : function (height) {
            this.$transparentPane.css('height', height);
        },

        getXPosition : function () {
            return this.model.get("position").x;
        },

        getYPosition : function () {
            return this.model.get("position").y;
        },

        updatePositionCoodsInModel : function (x, y) {
            this.model.set("position", {"x" : x, "y" : y });
        },

        _getUmlClassElement : function () {
            return $('#uml-class-' + this.model.get("class").id);
        },

        positionTransparentPane : function (x, y) {
            this.$transparentPane.css('left', x);
            this.$transparentPane.css('top', y);
            this.updateUmlClassElement(x, y);

        },

        _createTransparentPane : function () {
            var $umlClassElement = this._getUmlClassElement();
            var width = $umlClassElement.width(),
                height = $umlClassElement.height();
            this._createPane(width, height);
            this.positionTransparentPane(200, 150);
            $('#transparent-panes').append(this.$transparentPane);
        },

        _createPane : function (width, height) {
            this.$transparentPane = $('<div>');
            this.$transparentPane.addClass('movable');
            this.$transparentPane.css('width', width);
            this.$transparentPane.css('height', height);
            this.$transparentPane.css('top', 50);
            this.$transparentPane.css('left', 50);
            this.$transparentPane.css('position', 'absolute');
            this.$transparentPane.attr("id", this.model.get("class").id);
        }

    });

});

