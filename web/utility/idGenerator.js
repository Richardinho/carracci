define([], function() {
  return {
    nextId: function() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    },
  }
})
