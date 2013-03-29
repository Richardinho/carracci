define(['jQuery',
        'BaseType',
        'ArgAPI'], function ( $,
                              BaseType,
                              ArgAPI ) {

    return BaseType.extend({

        initialize : function (el) {
            this.element = el;
        },

        method : function (index) {
            var method = $(this.element.find('.methods .method').get(index));

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

                arg : function (index) {
                    return new ArgAPI({ el : method.find('.arguments .arg-body').get(index)});
                },

                clickOnVisibility : function () {
                    method.find('.methodVisibility').click();
                },

                visibility : function () {
                    return method.find('.methodVisibility').text().trim();
                },

                deleteMethod : function () {
                    method.find('.deleteMethod input').click();
                }
            }
        },

        size : function () {
            return element.find('.methods .method').size();
        }
    });
});