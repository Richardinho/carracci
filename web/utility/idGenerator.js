define([], function () {
  var nextId = 1;

  var prefix = "abc";

  return {
    nextId: function () {
      var id = nextId++;
      return prefix + id;
    },

    reset: function (offset) {
      nextId += offset;
    },
  };
});
