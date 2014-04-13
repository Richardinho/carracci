define(['raphael', 'jquery'], function(Raphael, $) {

    var paper = Raphael(0, 0, 1200, 1000);
    paper.canvas.id = "foo"

    return paper;

});