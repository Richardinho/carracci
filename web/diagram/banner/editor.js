define(['BaseType', 'diagram/banner/editorView'], function(
  BaseType,
  BannerEditorView
) {
  'use strict'

  return BaseType.extend({
    initialize: function(options) {
      this.view = new BannerEditorView({
        el: $('#banner-editor'),
      })

      this.manager = options.manager

      this.diagramController = options.diagramController

      this.view.$el.on('click', '[data-role=save]', $.proxy(this.save, this))
      this.view.$el.on('click', '[data-role=cancel]', $.proxy(this.close, this))

      this.view.$el.on(
        'click',
        '[data-role=delete]',
        $.proxy(this.destroy, this)
      )
    },

    save: function() {
      $('input, textarea', this.view.$el).each(
        $.proxy(function(index, element) {
          // should call the diagramController to do this
          this.model.model[element.name] = element.value
        }, this)
      )

      this.model.trigger('change')

      this.close()
    },

    destroy: function() {
      this.diagramController.deleteBanner()
      this.model.trigger('destroy')

      this.close()
    },

    show: function(stackingOrder, model) {
      this.model = model
      this.view.show(stackingOrder, model)
    },

    close: function() {
      this.manager.onCloseWidget()
      this.view.hide()
    },
  })
})
