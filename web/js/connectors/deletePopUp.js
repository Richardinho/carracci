define(['DeletePopUpController',
        'DeletePopUpView'], function ( DeletePopUpController,
                                       DeletePopUpView ) {

    var view = new DeletePopUpView();
    var controller  = new DeletePopUpController({ view : view });

    return {

        show : function (nodeController, event) {
            controller.show(nodeController, event);
        }
    }
});