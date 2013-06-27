 var keyMappers = {

    def : {
        _8 : 'backspace',
        _9 : 'tab',
        _16 : 'shift',
        _17 : 'ctrl',
        _18 : 'alt',
        _20 : 'caps',
        _32 : ' ',
        _33 : 'pageUp',
        _34 : 'pageDown',
        _35 : 'end',
        _36 : 'home',
        _37 : 'left',
        _38 : 'up',
        _39 : 'right',
        _40 : 'down',
        _45 : 'insert',
        _46 : 'delete',

        _65 : "a",
        _66 : "b",
        _67 : "c",
        _68 : "d",
        _69 : "e",
        _70 : "f",
        _71 : "g",
        _72 : "h",
        _73 : "i",
        _74 : "j",
        _75 : "k",
        _76 : "l",
        _77 : "m",
        _78 : "n",
        _79 : "o",
        _80 : "p",
        _81 : "q",
        _82 : "r",
        _83 : "s",
        _84 : "t",
        _85 : "u",
        _86 : "v",
        _87 : "w",
        _88 : "x",
        _89 : "y",
        _90 : "z",

        _48 : 0,
        _49 : 1,
        _50 : 2,
        _51 : 3,
        _52 : 4,
        _53 : 5,
        _54 : 6,
        _55 : 7,
        _56 : 8,
        _57 : 9,

        _59 : ';',

        _163 : '#',
        s163 : '~',

        _173 : '-',
        s173 : '_',

        _188 : ',',
        s188 : '<',
        _190 : '.',
        s190 : '>',
        _191 : '/',
        s191 : '?',
        _192 : '`',
        s192 : '¬',

        _61 : '=',
        s61 : '+',

        _219 : '[',
        s219 : '{',
        _220 : '\\',
        s220 : '|',
        _221 : ']',
        s221 : '}',
        _222 : "'",
        s222 : "@",



        s48 : ')',
        s49 : '!',
        s50 : '"',
        s51 : '&pound;',
        s52 : '$',
        s53 : '%',
        s54 : '^',
        s55 : '&',
        s56 : '*',
        s57 : '(',

        s59 : ':',

        s65 : "A",
        s66 : "B",
        s67 : "C",
        s68 : "D",
        s69 : "E",
        s70 : "F",
        s71 : "G",
        s72 : "H",
        s73 : "I",
        s74 : "J",
        s75 : "K",
        s76 : "L",
        s77 : "M",
        s78 : "N",
        s79 : "O",
        s80 : "P",
        s81 : "Q",
        s82 : "R",
        s83 : "S",
        s84 : "T",
        s85 : "U",
        s86 : "V",
        s87 : "W",
        s88 : "X",
        s89 : "Y",
        s90 : "Z"

    }
}
var map = keyMappers.def;

 var keyManager = (function (){
    $(document).keydown(function (event) {
        var objDiv = document.getElementById("command-editor");
        objDiv.scrollTop = objDiv.scrollHeight;
        var $currentCommands = $('#command-editor .current-commands');
        if(event.keyCode === 13) {
            var command = $('#command-editor .current-commands').text();
            $('#command-editor .old-commands').append(formatCommand(command));
             $('#command-editor .current-commands').text("");





        } else if(event.keyCode === 8) {

            var text = $currentCommands.text();
            text = text.substring(0, text.length -1);
            $currentCommands.text(text);
        }

        else {
            $currentCommands.append(getChar(event));
        }

        function getChar(event){

             var prefix = event.shiftKey ? "s" : "_";
              return map[prefix + event.keyCode];

        }

        function formatCommand(command) {
            return "<div class='command'>" + command + "</div>";

        }
        return false;

    });

})();


setInterval(function () {
    $('.cursor').toggleClass('hide');

}, 500)




