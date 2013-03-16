define(['jQuery', 'BaseType'], function ($, BaseType) {


    return BaseType.extend({

        initialize : function (el) {
            this.element = el;
        },

        property : function (index) {
            var property = $(this.element.find('.properties .property').get(index));

            return {

                name : function (name) {
                    if(name){
                        property.find('.name input').val(name);
                        property.find('.name input').trigger('change');
                    } else {
                        return property.find('.name input').val();
                    }
                },

                deleteProperty : function () {
                    property.find('.delete input').click();
                },

                visibility : function () {
                    return property.find('.visibility').text().trim();
                },

                clickOnVisibility : function () {
                    property.find('.visibility').click();
                },

                type : function (type) {
                    if(type) {
                        property.find('.type input').val(type);
                        property.find('.type input').trigger('change');
                    } else {
                        return property.find('.type input').val();
                    }

                }
            }
        },

        size : function () {
            return element.find('.properties .property').size();
        }

    });
});