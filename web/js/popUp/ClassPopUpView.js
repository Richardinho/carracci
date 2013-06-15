define(['BaseType','underscore'],function (BaseType, _) {


    return new BaseType.extend({


        initialize : function () {

            $('body').append(this.template());
            $('body').append(this.menuTemplate());
            this.el = $('.classPopUp');
            this.menu = $('.classMenuPopUp');
            this.el.hide();
            this.menu.hide();

        },

        show : function (x, y) {
            this.el.css({ left : x, top : y });
            this.el.show();
        },

        template : _.template([
            '<div class="classPopUp">',
                '<ul>',
                    '<li data-action="edit"><span data-action="edit">edit</span></li>',
                    '<li data-action="delete"><span data-action="delete" >delete</span></li>',
                    '<li data-action="cancel"><span data-action="cancel">cancel</span></li>',
                '</ul>',
            '</div>'
            ].join("")),

        menuTemplate : _.template($('#menuPopUp').html()),

        makeMenuVisible : function (x, y) {

            this.menu.css({ left : x + 100, top : y });
            this.menu.show();

        }


    });
});