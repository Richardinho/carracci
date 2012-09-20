
$(document).ready(function () {
    var view = {

        element : $('#foo'),

        positionElement : function (x, y) {
            this.element.css('left', x);
            this.element.css('top', y);
        },
    }

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
        } else if ($(event.target).parents('.movable')) {
            $target = $(event.target).parents('.movable');
        }
        else {
            return false;
        }

        mousedown = true;
        clientX = event.clientX;
        clientY = event.clientY;
        targetPosX = parseInt($target.css('left'));
        targetPosY = parseInt($target.css('top'));
        targetView = getTargetView();

        return false;
    });

    function getTargetView() {

        return view;
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

