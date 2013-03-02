define(['Collection'], function (Collection) {

    return Collection.extend({

        initialize : function (options) {
            this._listeners = [];
            this._collection = [];
            this.Type = options.type;
        },

        get : function (index) {
            return this._collection[index];
        },

        add : function (element) {
            this._collection[this.size()] = new this.Type(element);
            this._fire("add");
        },

        size : function () {
            return this._collection.length;
        },

        //  run a function against each element in collection
        each : function (callback, contextObj) {
            var i,
                length = this.size(),
                context = contextObj ? contextObj : this;

            for(i = 0; i < length; i++) {
                callback.call(context, i, this.get(i));
            }
        },

        //  run a function against each element in collection but return a single combined return value
        reduce : function (iterator, init, context) {
            var memo = init;

            this.each(function(index, element){
                memo = iterator.call(this, memo, element, index);
            }, context)

            return memo;
        },

        map : function (iterator) {
            var result = [];

            this.each(function (index, element) {
                result.push(iterator.call(this, index, element));
            });

            return result;
        },

        //  run a function against each element in collection and return a boolean according to whether the
        //  return value of all invocations of the function were true or not.
        all : function (iterator) {
            return this.reduce(function (memo, element) {
                if(!iterator.call(this, element)) {
                    memo = false
                }
                return memo;

            }, true);
        }
    });
});
