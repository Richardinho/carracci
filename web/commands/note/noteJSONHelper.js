define(["BaseType"],

        function (
            BaseType
        ) {
    /* this type gets the box from the view and attaches handlers to it to watch its' movement.
    in response to use input, it updates the model accordingly. The model fires out events
    which our view will listen to*/

    return BaseType.extend({


        banner : {

            title : {

                fontSize : 20,
                text : "",
                fontFamily : "arial"
            },

            description : "",

            creator : "",

            fontSize : "12",

            created : "",

            width : 300,

            fontFamily : "arial",

            paddingHorizontal : 12

        },

        build : function () {

            if(!this.editMode) {

                this.diagramController.createBanner(this.banner);
            } else {

                this.diagramController.removeBanner(this.banner);
            }
        },

        initialize : function (options) {

            this.diagramController = options.diagramController;

            if(options.editMode) {
                this.editMode = true;

                this.banner = this._createFromExisting();

            } else {
                this.editMode = false;
            }
        },

        _createFromExisting : function () {


            return this.diagramController.diagramModel.model.children.diagrams.children[this.diagramController.contextPath[1]].children.banner.children['banner'].unwrap();
        },

        setDescription : function (description){

            this.banner.description = description;

        },


        setTitle : function (title){

            this.banner.title.text = title;

        },


        setAuthor : function (author){
            this.banner.creator = author;
        },


        setDate : function (date){

            this.banner.created = date;
        }
    });
});

