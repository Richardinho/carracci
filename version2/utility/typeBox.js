define(['utility/svg', 'core/BaseType', 'underscore'], function(svg, BaseType, _ ) {

    return BaseType.extend({

        /* constants */
        paddingTop : 10,

        lineHeight : 15,

        paddingLeft : 5,

        paddingRight : 5,

        paddingBottom : 10,

        separatorYOffset : 7,

        backgroundColor : "#ffffce",

        outlineColor : "#666",


        /* variables */
        nameTextYOffset : null,

        propertiesYOffset : null,

        methodsYOffset : null,

        svgMethodTextArray : [],

        svgPropertyTextArray : [],

        initialize : function (options) {

            this.model = options.model;
            var xCood = this.model.xCood;
            var yCood = this.model.yCood;
            var name = this.model.name;

            this._calculateGeometry();

            this.typeBox = svg.rect(
                xCood,
                yCood,
                500, // this and the following cood are dummy coods
                500  // just to get the rectangle onto the paper.
            );



            this.typeBox.attr("fill" , this.backgroundColor);
            this.typeBox.attr("stroke", this.outlineColor);

            if(this.model.flavor === 'interface') {
                this.flavorText = this.createFlavorText('interface');
            }
            this.nameText = this.createNameText(name );

            this.createProperties();
            this.createMethods();


            var width = this._calculateWidth();
            var height = this._calculateHeight();

            this.rect = svg.rect(
                xCood,
                yCood,
                500, // this and the following cood are dummy coods
                500  // just to get the rectangle onto the paper.
            );
            this.rect.attr({"fill" : "red", "opacity" : 0});

            this.rect.attr({ "width" : width, "height" : height });
            this.typeBox.attr({ "width" : width, "height" : height });




/*             properties = model.get("properties").map(function (index, element) {
            return formatProperty(element);
        });

        methods = model.get("methods").map(function (index, element) {
            return formatMethod(element);
        });

        height = TITLE_BOX_HEIGHT;

        $.each(properties, function (index, property) {
            propertyTextArray.push({ text : that.text(LEFT_OFFSET + x,
                                     setPropertyY(index, y),
                                     property).attr({ 'text-anchor' : 'start'}) });
        });

        $.each(propertyTextArray, function (index, propertyText) {
            var tempWidth = propertyText.text.getBBox().width;
            width = tempWidth > width ? tempWidth : width;
        });*/

        },

        _calculateWidth : function () {

            var width = 0;

            var textArray = this.svgMethodTextArray.concat(this.svgPropertyTextArray);

            _.each(textArray, function (text) {
                var tempWidth = text.getBBox().width;
                width = tempWidth > width ? tempWidth : width;
            });

            return width + this.paddingLeft + this.paddingRight;
        },

        _calculateHeight : function () {

            return ( _.size(this.model.methods) * this.lineHeight ) + this.methodsYOffset + this.paddingBottom;
        },

        _calculateGeometry : function () {

            var yOffset = 0;

            if( this.model.flavor === 'interface' ) {
                yOffset = this.lineHeight;
            }

            this.nameTextYOffset = this.paddingTop + yOffset;

            this.propertiesYOffset = this.nameTextYOffset
                + this.lineHeight
                + this.separatorYOffset;

            var propertiesSize = _.size(this.model.properties);

            this.methodsYOffset = this.propertiesYOffset
                + this.separatorYOffset
                + (propertiesSize * this.lineHeight);

        },

        /* takes type name and x,y coods and creates svg text,
           returns the svg element */
        createNameText : function ( name) {
            var x = this.model.xCood;
            var y = this.model.yCood;
            var text = svg.text(
                this.paddingLeft + x,
                y + this.nameTextYOffset,
                name
            );
            text.attr({ 'text-anchor' : 'start' });

            return text;
        },

        createProperties : function () {

            var properties = this.formatProperties(this.model.properties),
                yOffset,
                xCood = this.model.xCood,
                yCood = this.model.yCood;


            _.each(properties, function ( property, index ) {

                yOffset = index * this.lineHeight;

                var text = svg.text(
                    xCood + this.paddingLeft,
                    yCood + this.propertiesYOffset + yOffset,
                    property
                    );
                text.attr({ 'text-anchor' : 'start'});

                this.svgPropertyTextArray.push(text);

            }, this);


        },

        createMethods : function () {

            var methods = this.formatMethods(this.model.methods),
                yOffset,
                xCood = this.model.xCood,
                yCood = this.model.yCood;

            _.each(methods, function ( method, index ) {

                yOffset = index * this.lineHeight;

                var text = svg.text(
                    xCood + this.paddingLeft,
                    yCood + this.methodsYOffset + yOffset,
                    method
                    );
                text.attr({ 'text-anchor' : 'start' });

                this.svgMethodTextArray.push(text);

            }, this);
        },

        moveMethods : function (x, y) {
            var yOffset;
            _.each(this.svgMethodTextArray, function(svgMethodText, index) {
                yOffset = index * this.lineHeight;
                svgMethodText.attr({ "x" : x + this.paddingLeft });
                svgMethodText.attr({ "y" : y + this.methodsYOffset + yOffset });
            },this);

        },

        removeContents : function () {

            this.nameText.remove();

            if(this.flavorText) {
                this.flavorText.remove();
            }

            var textArray = this.svgMethodTextArray.concat(this.svgPropertyTextArray);

            _.each(textArray, function (text) {
                text.remove();
            });

            this.svgMethodTextArray = [];
            this.svgPropertyTextArray = [];

        },

        moveProperties : function (x, y) {
            var yOffset;
            _.each(this.svgPropertyTextArray, function(svgPropertyText, index) {
                yOffset = index * this.lineHeight;
                svgPropertyText.attr({ "x" : x + this.paddingLeft });
                svgPropertyText.attr({ "y" : y + this.propertiesYOffset + yOffset });
            },this);
        },

        moveNameText : function () {
            var x = this.model.xCood;
            var y = this.model.yCood;
            this.nameText.attr({
                x : this.paddingLeft + x,
                y : y + this.nameTextYOffset
            });

        },

        createFlavorText : function (flavor) {
            var x = this.model.xCood;
            var y = this.model.yCood;
            flavor = "<<" + flavor + ">>";

            var text = svg.text(
                this.paddingLeft + x,
                y + this.paddingTop,
                flavor
            );
            text.attr({ 'text-anchor' : 'start' });

            return text;
        },

        moveFlavorText : function (x, y) {
            this.flavorText.attr({
                x : this.paddingLeft + x,
                y : y + this.paddingTop
            });
        },

        move : function () {
            var x = this.model.xCood;
            var y = this.model.yCood;
            this.rect.attr({ "x" : x });
            this.rect.attr({ "y" : y });

            this.typeBox.attr({ "x" : x });
            this.typeBox.attr({ "y" : y });

            this.moveNameText(x, y);

            if(this.model.flavor === 'interface') {
                this.moveFlavorText(x, y);
            }
            this.moveMethods(x, y);
            this.moveProperties(x, y);

        },

        update : function () {

            this.removeContents();
            this._calculateGeometry();
            this.createProperties();
            this.createMethods();

            if(this.model.flavor === 'interface') {
                this.flavorText = this.createFlavorText('interface');
            }
            this.nameText = this.createNameText( this.model.name );

            var width = this._calculateWidth();
            var height = this._calculateHeight();

            this.rect.attr({ "width" : width, "height" : height });
            this.typeBox.attr({ "width" : width, "height" : height });
        },

        /*
            pass in an array of properties
            returns an array of properties formatted for inserting in type box
        */
        formatProperties : function (props) {

            function convertVisibility (vis) {

            }
            return  _.map(props, function (property) {

                var result = "";
                result += this._convertVisibility(property.visibility);
                result += property.name;
                result +=":";
                result += property.type;

                return result;
            }, this);
        },

        formatMethods : function (methods) {
            return _.map(methods, function(method) {

                var result = "",
                    args;

                if(method.args.length > 0) {
                    args = formatArgs(method.args)
                } else {
                    args = "";
                }

                result += this._convertVisibility(method.visibility);
                result += method.name;
                result +="(" + args + "):";
                result += method.returnType;

                return result;
            }, this);

            function formatArgs(args) {
                var result = ""
                _.each(args, function(arg) {
                    result += arg.name + ":" + arg.type + ",";
                });
                return result.substring(0, result.length-1);
            }

        },

        _convertVisibility : function (vis) {

            switch(vis) {
            case 'private' :
                return "-";
            case 'protected':
                return "#";
            case 'public' :
                return "+";
            default:
                return "-";
            }
        }


    });

});