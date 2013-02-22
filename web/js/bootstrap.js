

require.config({

    shim : {

        'jQuery' : {
            exports : '$'
        }
    },

    paths : {
        jQuery : "lib/jquery-1.8.0",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        keyManager : "node/controller/controller.KeyManager",
        globalController : "globalController/controller.Global",
        svgUtilities : "utility/svgUtilities",
        connectorFactory : "connectors/factory/factory.connector",
        horizontalConnector : "connectors/model/model.HorizontalConnector",
        Model : "core/Model",
        Collection : "core/Collection",
        ModelDiamond : "pointers/model/model.Diamond",
        ModelPointer : "pointers/model/model.Pointer",
        ViewPointer : "pointers/view/view.Pointer",
        CollectionPointer : "pointers/collection/collection.Pointer"

    }
});

require([ 'jQuery', 'connectorFactory' ], function ( $, connectorFactory ) {

    $(document).ready(function () {

        var connector1 = connectorFactory({ x1 : 40,
                                            y1 : 30,
                                            x2 : 240,
                                            y2 : 350 });

        console.log(connector1)

    });
});





