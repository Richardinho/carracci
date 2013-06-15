define(['ClassPopUpView',
        'ClassPopUpController'],function (ClassPopUpView, ClassPopUpController) {


    var view = new ClassPopUpView();
    var controller = new ClassPopUpController({ view : view });

    return {
        show : function (model, event) {
            controller.show(model, event.x, event.y);


        }
    }
});

