define(['BaseType', 'underscore'], function (extend, _) {

    return extend.extend({

        initialize : function (options) {

            _.bindAll(this, "on");
            if(options && options instanceof Array ) {
                this._collection = options;
            } else {
                this._collection = [];
            }

            this._listeners = [];
        },

        get : function (index) {
            return this._collection[index];
        },

        getById : function (id) {
            return this.reduce(function (memo, element, index) {
                if(element.id === id) {
                    return element;
                } else {
                    return memo;
                }
            }, false, this);
        },

        getIndexById : function (id) {
            return this.reduce(function (memo, element, index) {
                if(element.id === id) {
                    return index;
                } else {
                    return memo;
                }
            }, -1, this);
        },

        add : function (element) {
            this._collection[this.size()] = element;
        },

                //  run a function against each element in collection but return a single combined return value
        reduce : function (iterator, init, context) {
            var memo = init;

            this.each(function(index, element){
                memo = iterator.call(this, memo, element, index);
            }, context)

            return memo;
        },

        //  run a function against each element in collection and return a boolean according to whether the
        //  return value of all invocations of the function were true or not.
        every : function (iterator, context) {
            return this.reduce(function (memo, element) {
                if(!iterator.call(this, element)) {
                    memo = false
                }
                return memo;

            }, true, context);
        },

        delete : function (index) {
            this._collection.splice(index, 1);
        },

        deleteModel : function (id) {
            var i,
                length = this.size(),
                element;
            for(i = 0; i < length; i++) {
                element = this.get(i);
                if(element === undefined) {
                    debugger;
                }
                if(element.id === id) {
                    this.delete(i);
                }
            }
            this.each(function(index, element) {
                if(element.id === id) {
                    toDelete.push(index)
                }
            });
        },

        findFirst : function (property, value ) {
            var i,
                length = this.size(),
                element;
            for(i = 0; i < length; i++) {
                element = this.get(i);
                debugger;
                if(element.get(property) === value) {
                    return i;
                }
            }
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



        map : function (iterator, context) {
            var result = [];
            this.each(function (index, element) {
                result.push(iterator.call(this, index, element));
            }, context);

            return result;
        },

        on : function (event, callback, cont) {
            var context = cont ? cont : this;
            this._listeners.push({ "event" : event, "callback" : callback, "context" : context });
        },

        _fire : function (eventName, value) {

            for(var i = 0; i < this._listeners.length; i++) {
                var listener = this._listeners[i];
                if(listener.event === eventName) {
                    listener.callback.call(listener.context, value);
                }
            }
        },

        find : function () {

        },

        filter : function () {},

        contains : function () {},

        pluck : function () {},

        sortBy : function () {},



    });
});
