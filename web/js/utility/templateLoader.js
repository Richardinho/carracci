define(['jQuery' ], function ( $ ) {


    return {

        initialize : function (config, templatesFolder) {

            $.each(config, function (index, fileName ) {
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