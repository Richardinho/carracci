define(['raphael', 'jquery'], function(Raphael, $) {

    var paper = Raphael(0, 0, 800, 500);
    paper.canvas.id = "foo"

    return paper;

});
