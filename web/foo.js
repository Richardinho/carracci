define(function() {

    var Foo = function( name ) {
        this.name = name;
    };

    Foo.prototype.doBlah= function() {
        return this.name;
    };

    return Foo;

});
