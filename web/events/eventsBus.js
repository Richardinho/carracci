define(["backbone"], function (Backbone) {
  var events = {};

  _.extend(events, Backbone.Events);

  return {
    on: function () {
      events.on.apply(events, arguments);
    },

    off: function () {
      events.off.apply(events, arguments);
    },

    trigger: function () {
      events.trigger.apply(events, arguments);
    },
  };
});
