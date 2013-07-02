define(["core/BaseType",
        "jquery",
        "utility/svgUtilities"],
        function (
        BaseType,
        $,
        svgUtils
        ) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

            this._createElement();

        },

        move : function () {

            var style = this._getStyle();

            if(style === "whiteArrow") {
                var path = this._buildPath("diamond", true);
                svgUtils.resetPath(this.element, path);
            }
            else if(style === "blackDiamond") {
                var path = this._buildPath("diamond", true);
                svgUtils.resetPath(this.element, path);
            }

            else if(style === "blackConnectArrow") {
                var path = this._buildPath("connectArrow", false);
                svgUtils.resetPath(this.element, path);
            }
            else {
                // do nothing
            }

        },

        _createElement : function () {

            var style = this._getStyle();

            if(style === "whiteArrow") {
                var path = this._buildPath("diamond", true);
                this.element = svgUtils.createPath(path, "white");
            }
            else if(style === "blackDiamond") {
                var path = this._buildPath("diamond", true);
                this.element = svgUtils.createPath(path, "black");
            }
            else if(style === "blackConnectArrow") {
                var path = this._buildPath("connectArrow", false);
                this.element = svgUtils.createPath(path);
            }
            else {
                this.element = svgUtils.nullObject();

            }

        },

        _buildPath : function (subStyle, closePath) {

            var direction = this._getDirection();
            var pointsArray = this._createPointsArray(subStyle, direction);
            return svgUtils.buildPath(pointsArray, closePath);

        },

        _getStyle : function () {


            return this.model.getStyle();

        },

        _getDirection : function () {

            return this.model.getDirection();
        },

        _createPointsArray : function (subStyle, direction) {

            var x = this.model.getXCood();
            var y = this.model.getYCood();


            if(subStyle === "arrow") {

                switch(direction) {

                case "top" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y + 10),
                        this._getPoint(x - 10, y + 10)
                    ];

                break;

                case "bottom" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y - 10),
                        this._getPoint(x - 10, y - 10)
                    ];

                break;

                case "left" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y - 10),
                        this._getPoint(x + 10, y + 10)
                    ];

                break;

                case "right" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x - 10, y + 10),
                        this._getPoint(x - 10, y - 10)
                    ];
                break;
                }

            } else if (subStyle ==="connectArrow") {
                switch(direction) {

                case "top" :

                    return [
                        this._getPoint(x + 10, y + 10),
                        this._getPoint(x, y),
                        this._getPoint(x - 10, y + 10)
                    ];

                break;

                case "bottom" :

                    return [
                        this._getPoint(x + 10, y - 10),
                        this._getPoint(x, y),
                        this._getPoint(x - 10, y - 10)
                    ];

                break;

                case "left" :

                    return [
                        this._getPoint(x + 10, y - 10),
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y + 10)
                    ];

                break;

                case "right" :

                    return [
                        this._getPoint(x - 10, y + 10),
                        this._getPoint(x, y),
                        this._getPoint(x - 10, y - 10)
                    ];
                break;
                }

            } else if (subStyle === "diamond") {

                switch(direction) {

                case "top" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y + 10),
                        this._getPoint(x, y + 20),
                        this._getPoint(x - 10, y + 10)
                    ];

                break;

                case "bottom" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y - 10),
                        this._getPoint(x, y - 20),
                        this._getPoint(x - 10, y - 10),
                    ];

                break;

                case "left" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x + 10, y - 10),
                        this._getPoint(x + 20, y),
                        this._getPoint(x + 10, y + 10)
                    ];

                break;

                case "right" :

                    return [
                        this._getPoint(x, y),
                        this._getPoint(x - 10, y + 10),
                        this._getPoint(x - 20, y),
                        this._getPoint(x - 10, y - 10),
                    ];
                break;
                }
            }
        },

        _getPoint : function (x, y) {
            return { "x" : x, "y" : y };
        },



    });

});





