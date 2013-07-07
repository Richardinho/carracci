$(document).ready(function () {


    var diagramController = {

        process : function (command) {

            switch(command) {

            case "foo" :
                return this.foo();
                break;
            case "bar" :
                return this.bar();
                break;
            }
        },

        foo : function () {

            return $.ajax({

                url: "/version2/help/testHelp.html",
                dataType: "html"

            });
        },

        bar : function () {

            var deferred = $.Deferred();

            deferred.resolve("this is bar");

            throw {

                name : "bar"

            }

            return deferred;
        }
    }

    function execute(command) {

        $.when(diagramController.process(command)).then(function(data, textStatus, jqXHR){

            console.log("data is : ", data)

            $('#foo').append(data);

        }).fail(function () {

            console.log("failure occurred");
        });

    }

    execute("bar");






});