 var keyManager = (function (){

    $(document).keyup(function (event) {

        if(event.keyCode === 13) {
            var command = $('#command-editor .current-commands').text();
            $('#command-editor .old-commands').append(command);
             $('#command-editor .current-commands').text("");
        } else {

            $('#command-editor .current-commands').append(String.fromCharCode(event.keyCode).toLowerCase());
        }


    });

})();



var keyMappers = {

    default : {
        65 : "a",
        66 : "b"
        67 : "c",
        68 : "d",
        69 : "e",
        _65 : "A",
        _66 : "B",
        _67 : "C",
        _68 : "D",
        _69 : "E"





    }



}