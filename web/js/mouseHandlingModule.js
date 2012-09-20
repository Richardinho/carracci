
$(document).ready(function () {


    var mousedown = false,
        $target,
        clientX,
        clientY,
        targetPosX,
        targetPosY,
        targetView;

    $('body').mousedown(function (event) {
        if ($(event.target).hasClass("movable")) {
            $target = $(event.target);
        } else if ($(event.target).parents('.movable').length != 0) {
            $target = $(event.target).parents('.movable');
        }
        else {
            return;
        }
        mousedown = true;

        clientX = event.clientX;
        clientY = event.clientY;
        targetPosX = parseInt($target.css('left'));
        targetPosY = parseInt($target.css('top'));
        targetView = getTargetView($target);

        return false;
    });

    function getTargetView(target) {

        return Glenmorangie.umlProject.umlClassViews[target.attr("id")];
    }


    $('body').mousemove(function (event) {
        if (mousedown) {
            targetView.positionElement(calculateNewX(event), calculateNewY(event));
            return false;
        }
    });

    function calculateNewX(event) {
        var xDiff = event.clientX - clientX;
        return targetPosX + xDiff;
    }

    function calculateNewY(event) {
        var yDiff = event.clientY - clientY;
        return newY = targetPosY + yDiff;
    }

    $('body').mouseup(function (event) {
        if (mousedown) {
            targetView.updatePositionCoodsInModel(calculateNewX(event), calculateNewY(event));
        }
        mousedown = false;
        $target = null;
        clientX = null;
        clientY = null;
        targetPosX = null;
        targetPosY = null;
        targetView = null;

        return false;
    });



});

