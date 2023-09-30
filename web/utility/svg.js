define(['raphael', 'jquery'], function(Raphael, $) {
  // work out width and height;

  var svgContainer = document.getElementById('svg-container')

  var width = svgContainer.offsetWidth
  var height = svgContainer.offsetHeight

  var paper = Raphael('svg-container', width, height)
  paper.canvas.id = 'foo'

  return paper
})
