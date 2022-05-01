define(["BaseType", "backbone", "events/eventsBus"], function (
  BaseType,
  Backbone,
  eventsBus
) {
  "use strict";

  return BaseType.extend({
    initialize: function (options) {
      this.model = options.model;

      this.events = {};

      _.extend(this.events, Backbone.Events);

      eventsBus.on("destroy:" + this.model.id, this.destroy, this);
    },

    destroy: function () {
      this.trigger("destroy");
    },

    on: function () {
      this.events.on.apply(this.events, arguments);
    },

    off: function () {
      this.events.off.apply(this.events, arguments);
    },

    trigger: function () {
      this.events.trigger.apply(this.events, arguments);
    },

    set: function (name, value) {
      this.model[name] = value;
    },

    get: function (propertyName) {
      return this.model[propertyName];
    },
  });
});
