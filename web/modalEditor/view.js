define([
    "BaseType",
    'underscore',
    'text!modalEditor/template.html'
        ],

        function (
            BaseType,
             _,
             template
        ) {

        return BaseType.extend({

            initialize : function (options) {

                this.$el = options.el
                this.hide();

            },

            componentModel : {

               xOffset : 10,
               yOffset : 10,
               left    : 0,
               top     : 0

            },

            template : _.template(template),

            reset : function (model) {

                this.model = model;

                var noteX = this.model.getXCood();
                var noteY = this.model.getYCood();
                var noteWidth =  this.model.getWidth();
                var noteHeight = this.model.getHeight();

                this.componentModel.left = noteX + noteWidth + this.componentModel.xOffset;
                this.componentModel.top = noteY + this.componentModel.yOffset;

            },

            render : function (stackingOrder) {

                this.$el.html(this.template({

                    contents : this.model.getText()
                }));

                var x = this.model.getXCood();
                var y = this.model.getYCood();

                this._position(x, y);
                this.$el.css({ zIndex : stackingOrder });
                this.$el.show();

            },

            hide : function () {

                this.$el.hide();
            },

            getTextAreaContents : function () {

                 return this.$el.find('[data-role=contents]').val();
            },

            getWidthContents : function () {

                return this.$el.find('[data-role=width]').val();
            },

            _position : function (x, y) {

                $('[data-role=editor-panel]',this.$el).css({
                    left : x + 50,
                    top : y + 50
                });
            }
        });
    });

