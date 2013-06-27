define([], function () {

    var nextId = 1;

    return {

        nextId : function () {
            return nextId++;
        }
    };
})