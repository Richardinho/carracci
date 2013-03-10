define(['jQuery', 'underscore'], function ($, _) {


    return {

        initialize : function (config, templatesFolder) {

            $.each(config, function (index, fileName ) {
                console.log(templatesFolder + fileName + ".html");
                $.ajax({
                    url : templatesFolder + fileName + ".html",

                    dataType : "html",

                    async : false,

                    success : function (data) {
                        $('body').append(data);
                    },

                    error : function () {
                        //todo: throw error
                        console.log("template has not loaded");
                    }
                });
            });
        }
    };
});