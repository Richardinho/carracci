define(['BaseType', "underscore", "jsTween"], function (BaseType, _, jsTween) {
    // this type should simply display and hide the menu dropdown it should be generic for all drop downs, querying the
    // relevant model.
    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "display", "hide");

            this.model = options.model;
            this.menuEl = options.menuEl;
            this.width = options.width;
            this.menuEl.append(this._createButton())

            this.dropDownEl = options.dropDownEl;
            this.dropDownEl.append(this._createDropDown());

            this.model.on("open", this.display);
            this.model.on("hide", this.hide);
        },

        display : function () {

            this._getDropdown().tween({
               top:{
                  start: -300,
                  stop: 50,
                  time: 0,
                  units: 'px',
                  duration: 0.5,
                  effect:'easeInOut'
               }
            });
            $.play();
        },

        hide : function () {

            this._getDropdown().tween({
               top:{
                  start: 50,
                  stop: -300,
                  time: 0,
                  units: 'px',
                  duration: 1,
                  effect:'easeInOut'
               }
            });
            $.play();
        },

        _getDropdown : function () {

            return this.dropDownEl.find('.' + this.model.name)
        },

        getButtonElement : function () {

            return this.menuEl.find("." + this.model.name);
        },

        _createButton : function () {

            var menuButton = $('<div>')
                .addClass('menu-button')
                .addClass(this.model.name)
                .css("width", this.width)
                .text(this.model.name)
                .attr("tabindex", 1);

            return menuButton;
        },

        _createDropDown : function () {

            var dropDown = $('<div>')
                .css("width", this.width )
                .css("left", this.model.index * this.width )
                .css("z-index", 0)
                .addClass("dropdown")
                .addClass(this.model.name);

            var items = this.model.items;

            if(items) {

                $.each(items, function (index, element) {
                    dropDown.append('<div class="' + element.name + '">' +  element.text  +'</div>');
                });
            }
            return dropDown;
        }
    });
});