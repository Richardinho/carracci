
$(document).ready(function () {


    var mousedown = false,
        $target,
        clientX,
        clientY,
        targetPosX,
        targetPosY,
        targetView;

    $('body').mousedown(function (event) {
        if (!$(event.target).hasClass('movable')) return;
        mousedown = true;

        $target = $(event.target);
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

            var xDiff = event.clientX - clientX;
            var yDiff = event.clientY - clientY;

            newX = targetPosX + xDiff;
            newY = targetPosY + yDiff;

            targetView.positionTransparentPane(newX, newY);
            return false;
        }
    });

    $('body').mouseup(function () {
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

