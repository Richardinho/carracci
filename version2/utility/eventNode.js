define([],function () {

    // constructor function
    var Node = function (obj, name, parent) {

        this.listeners = {};

        this.name = name;

        if (parent) {
            this.parent = parent;
        }
        if (typeof obj === 'object') {

            this.children = {};
            for (var prop in obj) {

                this.children[prop] = new Node(obj[prop], prop, this);
            }
        } else {
            this.value = obj;
        }
    }
    //  return original object
    Node.prototype.unwrap = function () {

        var unwrapped = {};

        for(var child in this.children) {

            if(this.children[child].value) {
                unwrapped[child] = this.children[child].value;
            } else {
                unwrapped[child] = this.children[child].unwrap();
            }
        }

        return unwrapped;
    },

    //  register handler functions
    Node.prototype.on = function (event, handler, context) {

        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push([handler, context]);
    };

    //  this should return a reference to the child.
    Node.prototype.createChild = function (name, node) {

        this.children[name] = new Node(node, name, this);
        this.fire("create", this.children[name]);
        return this.children[name];

    },

    Node.prototype.deleteChild = function (name) {

        var node = this.children[name];

        delete this.children[name];
        this.fire("delete", node );
        return node;
    },

    // broadcast event to all child nodes.
    Node.prototype.broadcast = function () {


    },

    // fire method. calls fire method of parent node
    Node.prototype.fire = function (event, newValue, oldValue) {

        if(this.listeners) {
            var listeners = this.listeners[event];
        }

        if (listeners) {
            var args =  Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < listeners.length; i++) {
                // call handler using context as 'this'
                listeners[i][0].apply(listeners[i][1], args);
            }
        }
        if (this.parent) {
            this.parent.fire.apply(this.parent, arguments);
        }
    }

    //  set value of node. fire event
    Node.prototype.set = function (newValue, silent) {

        if (this.value || this.value === 0) {
            var oldValue = this.value;
            this.value = newValue;
            if(!silent) {
                this.fire( "change", newValue, oldValue );
            }
        } else {
            throw {
                name: "NonPrimitiveNodeException",
                message : newValue + " " + oldValue
            }
        }
    }

    return Node;



});
