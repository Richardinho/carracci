define(['jQuery'], function ($) {

    var element;

    return {

        initialize : function (el) {
            element = el;
            return this;
        },

        method : function (index) {
            var method = $(element.find('.methods .method').get(index));

            return {
                name : function (newName) {
                    if(newName) {
                        method.find('.name input').val(newName);
                        method.find('.name input').trigger('change');
                    } else {
                        return method.find('.name input').val();
                    }
                },

                returnType : function(newReturnType) {
                    if(newReturnType) {
                        method.find('.returnType input').val(newReturnType);
                        method.find('.returnType input').trigger('change');
                    } else {
                        return method.find('.returnType input').val();
                    }
                },

                clickOnVisibility : function () {
                    method.find('.visibility').click();
                },

                visibility : function () {
                    return method.find('.visibility').text().trim();
                },

                deleteMethod : function () {
                    method.find('.delete input').click();
                }
            }
        },

        size : function () {
            return element.find('.methods .method').size();
        }
    };
});