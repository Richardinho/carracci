define([ 'BaseType',
         'underscore',
         'jQuery',
         'ClassBoxModel',
         'ClassBoxView' ], function ( BaseType,
                                       _,
                                       $,
                                       ClassBoxModel,
                                       ClassBoxView) {

    return {

        createType : function (type) {

            console.log("create type")

            var classBoxModel = new ClassBoxModel({
                "dataModel" : type,
                "name" : type.name,
                "x" : 500,
                "y" : 500
            });

            classBoxView = new ClassBoxView({ model : classBoxModel });

            return classBoxModel;
        }



    };
});
