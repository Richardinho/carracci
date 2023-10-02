define(['BaseType', 'diagram/banner/editorView'], function(
  BaseType,
  BannerEditorView
) {
  'use strict'

  return BaseType.extend(
    /** @lends BannerEditor.prototype */
    {
      /**
       * This is editor
       *
       * @augments external:BaseType
       * @constructs
       */
      initialize: function(options) {
        this.view = new BannerEditorView({
          el: $('#banner-editor'),
        })

        this.manager = options.manager

        this.view.$el.on('click', '[data-role=save]', $.proxy(this.save, this))
        this.view.$el.on(
          'click',
          '[data-role=cancel]',
          $.proxy(this.close, this)
        )
      },
      /**
       *
       */
      save: function() {
        $('input, textarea', this.view.$el).each(
          $.proxy(function(index, element) {
            this.model.model[element.name] = element.value
          }, this)
        )

        this.model.trigger('change')

        this.close()
      },
      /**
       *
       */
      show: function(stackingOrder, model) {
        this.model = model
        this.view.show(stackingOrder, model)
      },
      /**
       *
       */
      close: function() {
        this.manager.onCloseWidget()
        this.view.hide()
      },
    }
  )
})
