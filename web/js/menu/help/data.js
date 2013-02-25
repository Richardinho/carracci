define(function () {

    var annibaleText = "Annibale Carracci was born in Bologna, and in all likelihood was first apprenticed within his family." +
            "In 1582, Annibale, his brother Agostino and his cousin Ludovico Carracci opened a painters' studio, " +
            "initially called by some the Academy of the Desiderosi (desirous of fame and learning) and subsequently " +
            "the Incamminati (progressives; literally \"of those opening a new way\"). While the Carraccis laid emphasis on the " +
            "typically Florentine linear draftsmanship, as exemplified by Raphael and Andrea del Sarto, their interest in the " +
            "glimmering colours and mistier edges of objects derived from the Venetian painters, notably the works of " +
            "Venetian oil painter Titian, which Annibale and Agostino studied during their travels around Italy in 1580-81 at " +
            "the behest of the elder Caracci Lodovico. This eclecticism was to become the defining trait of the artists of the " +
            "Baroque Emilian or Bolognese School.",

        loremIpsum = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born " +
            "and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth," +
            "the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, " +
            "but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. " +
            "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because "
            "occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, " +
            "which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? " +
            "But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying " +
            "consequences, or one who avoids a pain that produces no resultant pleasure?"

    return {

        pages : [

            { title : "introduction", text : "Welcome to Carracci, a Uml diagram editing and creation tool with a dependency on Raphael.js" + loremIpsum, image : "" },
            { title : "Use Cases", text : loremIpsum,image : "" },
            { title : "Create a project", text : loremIpsum ,image : "" },
            { title : "Save a project", text : loremIpsum ,image : "" },
            { title : "Printing", text : loremIpsum ,image : "" },
            { title : "Working with components", text : loremIpsum ,image : "" },
            { title : "Annibale Carracci", text : annibaleText, image1 : "./web/images/butchers.jpg", image2 : "./web/images/carracci.jpg" }
        ]
    }
});