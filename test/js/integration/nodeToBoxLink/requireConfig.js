/* config file for node to box link test*/


require.config({

    baseUrl : "../../../../web/js",

    shim : {

        'jQuery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        }
    },

    paths : {

        underscore : "lib/underscore",
        jQuery : "lib/jquery-1.8.0",
        BaseType : "utility/extend",
        svgUtilities : "utility/svgUtilities",
        NodeToBoxCoordinator : "global/controllers/controller.AttachedNodeToBox",
        globalController : "globalController/controller.Global",
        svg : "utility/svg",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        ModelArrowNode : "node/model/model.ArrowNode",
        Model : "core/Model",
        ModelElement : "node/model/model.element",
        Collection : "core/Collection",
        ModelDiamond : "pointers/model/model.Diamond",
        ModelPointer : "pointers/model/model.Pointer",
        ViewPointer : "pointers/view/view.Pointer",
        CollectionPointer : "pointers/collection/collection.Pointer",
        ClassBoxModel : "classBox/model/model.ClassBox",
        propertyBuilder : "utility/propertyBuilder",
        ModelDistalNode : "node/model/model.DistalNode"

    }
});





