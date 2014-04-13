define(["BaseType"],

    function (
        BaseType
    ) {


    return BaseType.extend({


        note : {

            text : "",

            fontSize : "12",

            width : 300,

            fontFamily : "arial",

            paddingHorizontal : 12,

            type : "",

            xCood : "0",

            yCood : "0"

        },

        build : function () {

            if(!this.editMode) {

                this.diagramController.createNote(this.note);

            } else {

                this.diagramController.editNote(this.note);
            }
        },

        initialize : function (options) {
            this.editMode = options.editMode;
            this.diagramController = options.diagramController;

        },

        setType : function(type) {

            this.note.type = type;
        },

        setText : function (text) {
            this.note.text = text;
        }
    });
});

