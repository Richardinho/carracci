
$(document).ready(function () {


    Glenmorangie.umlProject.UmlClassView = Backbone.View.extend({

        initialize : function () {
            _.bindAll(this, "render");
            this.model.on("change:class", this.render);

            this.render();
            this._createTransparentPane();

        },

        template : _.template($('#uml-class-template').html()),

        render : function () {

            var html = this.template({ "class" : this.model.get("class") });
            this.$el.html(html);
        },

        updateUmlClassElement : function (x, y) {
            var umlClassElement = this.$umlClassElement;
            umlClassElement.css('left', x);
            umlClassElement.css('top', y);

        },

        positionTransparentPane : function (x, y) {
            this.$transparentPane.css('left', x);
            this.$transparentPane.css('top', y);
            this.updateUmlClassElement(x, y);

        },

        _createTransparentPane : function () {
            this.$umlClassElement = $('#uml-class-' + this.model.get("class").id);
            var width = this.$umlClassElement.width(),
                height = this.$umlClassElement.height();
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

