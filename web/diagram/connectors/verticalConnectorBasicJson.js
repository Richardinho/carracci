define(function () {

    return function () {

        return {

            orientation : "vertical",

            nodes : {

                top : {
                    xCood : 300,
                    yCood : 100,
                    attached : false,
                    attachedBox : "",
                    arrow : {
                        style : "blackConnectArrow",
                        direction : "top"
                    }
                },

                secondTop : {

                    xCood : 300,
                    yCood : 200,
                    attached : false,
                    attachedBox : ""

                },

                secondBottom : {
                    xCood : 400,
                    yCood : 200,
                    attached : false,
                    attachedBox : ""

                },

                bottom : {
                    xCood : 400,
                    yCood : 300,
                    attached : false,
                    attachedBox : "",
                    arrow : {
                        style : "whiteArrow",
                        direction : "bottom"
                    }
                }
            },
            lineStyle : "solid"
        };
    };


});
