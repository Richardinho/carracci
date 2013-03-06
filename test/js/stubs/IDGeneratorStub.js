define(function () {

    var nextId = 0;

    return {

        getNextId : function () {
            return nextId++;
        }
    };
})