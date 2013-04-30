define(['jQuery' ], function ( $ ) {



    // these load too late for some views to get their templates.

    //  does require have some mechanism for loading templates?

    // find out.

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