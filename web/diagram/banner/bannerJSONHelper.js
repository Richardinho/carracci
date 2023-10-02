define(['BaseType'], function(BaseType) {
  /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

  return BaseType.extend({
    banner: {
      title: {
        fontSize: 20,
        text: '',
        fontFamily: 'arial',
      },

      description: 'lalal',

      author: '',

      fontSize: '12',

      created: '',

      width: 300,

      fontFamily: 'arial',

      paddingHorizontal: 12,

      xCood: 0,

      yCood: 0,
    },

    build: function() {
      this.diagramController.createBanner(this.banner)
    },

    initialize: function(options) {
      this.diagramController = options.diagramController
    },

    setDescription: function(description) {
      this.banner.description = description
    },

    setTitle: function(title) {
      this.banner.title.text = title
    },

    setAuthor: function(author) {
      this.banner.author = author
    },

    setDate: function(date) {
      this.banner.created = date
    },
  })
})
