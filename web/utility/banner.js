define([
  'utility/svg',
  'BaseType',
  'underscore',
  'utility/svgUtilities',
], function(paper, BaseType, _, SVGUtils) {
  'use strict'

  /* this should simply read the model and render the typebox accordingly */
  return BaseType.extend({
    initialize: function(options) {
      var author = options.author,
        fontFamily = options.fontFamily,
        description = options.description,
        paddingHorizontal = options.paddingHorizontal,
        titleFontSize = options.titleFontSize,
        titleFontFamily = options.titleFontFamily,
        width = options.width,
        titleText = options.titleText,
        fontSize = 12,
        xCood = options.xCood,
        yCood = options.yCood

      var NS = SVGUtils.NS
      // give canvas an id so we can find the raw element. Must be a better way of doing this!
      paper.canvas.id = 'foo'

      this.svg = document.getElementById('foo')

      this.group = document.createElementNS(NS, 'g')

      this.svg.appendChild(this.group)

      this._createBanner(
        author,
        fontFamily,
        description,
        paddingHorizontal,
        titleFontSize,
        titleFontFamily,
        width,
        titleText,
        fontSize,
        this.group,
        this.svg
      )

      this.height = this.group.getBBox().height

      this.group.setAttribute(
        'transform',
        'translate(' + xCood + ' ,' + yCood + ')'
      )
    },

    show: function() {
      this.group.setAttribute('visibility', 'visible')
    },

    hide: function() {
      this.group.setAttribute('visibility', 'hidden')
    },

    destroy: function() {
      this.svg.removeChild(this.group)
    },

    redraw: function(
      author,
      fontFamily,
      description,
      paddingHorizontal,
      titleFontSize,
      titleFontFamily,
      width,
      titleText,
      fontSize
    ) {
      // empty out contents of group

      while (this.group.firstChild) {
        this.group.removeChild(this.group.firstChild)
      }

      // recreate contents of group
      this._createBanner(
        author,
        fontFamily,
        description,
        paddingHorizontal,
        titleFontSize,
        titleFontFamily,
        width,
        titleText,
        fontSize,
        this.group,
        this.svg
      )
      // resize invisible rectangle

      this.height = this.group.getBBox().height
    },

    _createBanner: function(
      author,
      fontFamily,
      description,
      paddingHorizontal,
      titleFontSize,
      titleFontFamily,
      width,
      titleText,
      fontSize,
      group,
      svg,
      xCood,
      yCood
    ) {
      var NS = SVGUtils.NS

      this.banner = createBanner(
        author,
        description,
        paddingHorizontal,
        titleFontSize,
        titleFontFamily,
        width,
        titleText,
        group,
        svg,
        xCood,
        yCood
      )

      function createBanner(
        author,
        description,
        paddingHorizontal,
        titleFontSize,
        titleFontFamily,
        width,
        titleText,
        group,
        svg,
        xCood,
        yCood
      ) {
        var background = createBackground(width)
        var title = SVGUtils.createTextBody(
          titleText,
          width,
          paddingHorizontal,
          titleFontFamily,
          titleFontSize,
          'bold',
          svg
        )

        var description = SVGUtils.createTextBody(
          description,
          width,
          paddingHorizontal,
          fontFamily,
          fontSize,
          'light',
          svg
        )
        var author = createAuthor(author, fontFamily, paddingHorizontal)

        group.appendChild(background)
        group.appendChild(title)
        group.appendChild(description)
        group.appendChild(author)

        var titleHeight = title.getBBox().height + 10
        var descriptionHeight = description.getBBox().height
        var authorPadding = 15
        description.setAttribute('y', titleHeight)

        author.setAttribute(
          'y',
          titleHeight + descriptionHeight + titleFontSize + authorPadding
        )
        var authorHeight = author.getBBox().height
        var extraPadding = 15
        background.setAttribute(
          'height',
          titleHeight +
          descriptionHeight +
          titleFontSize +
          authorHeight +
          extraPadding
        )

        return background
      }

      function createTitle(titleFontSize, titleFontFamily, width, titleText) {
        var svgTextNode = SVGUtils.createSVGTextNode(
          titleFontSize,
          titleFontFamily
        )

        svgTextNode.setAttribute('y', titleFontSize)
        svgTextNode.setAttribute('text-anchor', 'middle')
        svgTextNode.setAttribute('x', width / 2)

        var text = document.createTextNode(titleText)

        svgTextNode.appendChild(text)

        return svgTextNode
      }

      function createAuthor(author, fontFamily, paddingHorizontal) {
        var svgTextNode = SVGUtils.createSVGTextNode(10, fontFamily)
        svgTextNode.setAttribute('x', paddingHorizontal)

        var text = document.createTextNode('author: ' + author)
        svgTextNode.appendChild(text)

        return svgTextNode
      }

      function createBackground(width) {
        var rect = document.createElementNS(NS, 'rect')
        rect.setAttribute('fill', 'white')
        rect.setAttribute('width', width)
        rect.setAttribute('x', 0)
        rect.setAttribute('y', 0)
        rect.setAttribute('stroke', 'black')
        rect.setAttribute('stroke-width', 1)

        return rect
      }
    },

    setCoods: function(x, y) {
      this.group.setAttribute('transform', 'translate(' + x + ' ,' + y + ')')
    },

    setSelected: function() {
      this.banner.setAttribute('fill', 'green')
    },

    setDeselected: function() {
      this.banner.setAttribute('fill', 'white')
    },
  })
})
