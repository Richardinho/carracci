
define(['ClassBoxModel',
        'propertyBuilder',
        'ClassBoxView',
        'ClassBoxController',
        'methodBuilder',
        'componentContainer'], function (ClassBoxModel,
                                    propertyBuilder,
                                    ClassBoxView,
                                    ClassBoxController,
                                    methodBuilder,
                                    ComponentContainer ) {


    return function(classConfig) {

        className = classConfig.name;

        x = classConfig.x;
        y = classConfig.y;

        classBoxModel = new ClassBoxModel({ "name" : className, "x" : x, "y" : y });

        classBoxView = new ClassBoxView({ model : classBoxModel });

        classBoxController = new ClassBoxController({ model : classBoxModel, view : classBoxView });

        if(classConfig.properties) {

            propertiesConfigs = classConfig.properties;

            for(var j=0; j < propertiesConfigs.length; j++) {

                classBoxModel.addProperty(getProperty(propertiesConfigs[j]));
            }
        }

        if (classConfig.methods) {

            methodsConfigs = classConfig.methods;

            for(var j=0; j < methodsConfigs.length; j++) {

                classBoxModel.addMethod(getMethod(methodsConfigs[j]));
            }
        }

        componentId = ComponentContainer.createComponentSlot('UmlClass');

        ComponentContainer.store(
            componentId,
            [ classBoxModel,
              classBoxView,
              classBoxController,
            ]);

    }

    function getProperty(config) {
        return propertyBuilder(config.name).visibility(config.visibility).type(config.type).build();
    }

    function getMethod(config) {
        return methodBuilder(config.name)
            .visibility(config.visibility)
            .args(config.args)
            .returnType(config.returnType)
            .build();
    }

});

