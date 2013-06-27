define(['BaseType', 'underscore', 'jQuery'], function ( BaseType, _, $ ) {


    return BaseType.extend({


        initialize : function (options) {

            //this.template = this.getTemplate();
            //var container = $('#delete-pop-up-container');
            //container.html(this.template());
            //this.el = container.find('.delete-pop-up');
            //this.el.hide();

        },

        show : function (x, y) {
            //this.el.css({  left : x, top : y })
            //this.el.show();

        },

        hide : function () {
            this.el.hide();
        },

        getTemplate : function () {

            //return _.template($('#delete-pop-up-template').html())

        },

        getDeleteButton : function () {
           // return this.el.find('.delete');
        },

        getCancelButton : function () {
           // return this.el.find('.cancel');
        }
    });
});