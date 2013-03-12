define(['raphael', 'jQuery'], function(Raphael, $) {

    var paper = Raphael(500, 500, 500,600);
    paper.rect(0, 0, 500, 600).attr({ fill : "white"});

    Raphael.fn.TransparentPane = function(model) {
        var xCood = 0,
            yCood = 0,
            width = model.get("width"),
            height = model.get("height");

        var pane = this.rect(xCood, yCood, width + 10, height).attr({ fill : "red" , opacity : 0});

        pane.setDimensions = function () {
            width = model.get("width");
            height = model.get("height");
            xCood = model.get("xCood");
            yCood = model.get("yCood");
            pane.attr({ "width" : width + 10 , "height" : height });
        }
        return pane;
    }


    Raphael.fn.UmlClassBox = function(model) {

        var offset,
            propertyTextArray = [],
            methodTextArray = [],
            width = 0,
            height,
            umlBoxElement,
            LINE_HEIGHT = 15,
            LEFT_OFFSET = 5,
            TITLE_BOX_HEIGHT = 20,
            PADDING = 10,
            properties,
            methods,
            x,y,
            name,
            headerRect,
            nameText,
            nameYOffset = 10;

        x = model.get('xCood');
        y = model.get('yCood');
        var that = this;
        name = model.get("name");

        headerRect = this.rect(x, y, 0, 0).attr({ fill : "#ffffce" });

        nameText = createNameText()

        function createNameText() {
            return that.text(LEFT_OFFSET + x, y + nameYOffset, name).attr({ 'text-anchor' : 'start' });
        }

        width = getNameTextWidth();

        properties = model.get("properties").map(function (index, element) {
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
        });

        var propertiesHeight = getPropertyHeight();

        $.each(methods, function (index, method) {
            methodTextArray.push({ text : that.text(LEFT_OFFSET + x, setMethodY(index, y)  , method).attr({ 'text-anchor' : 'start' }) });
        });

        $.each(methodTextArray, function (index, methodText) {
            var tempWidth = methodText.text.getBBox().width;
            width = tempWidth > width ? tempWidth : width;
        });

        var methodsHeight = getMethodHeight();

        width = width + 10;

        height = getHeight();

        function getHeight() {
            return getPropertyHeight() + TITLE_BOX_HEIGHT + getMethodHeight();
        }
        headerRect.attr({ "height" : height });
        headerRect.attr({ "width" : width });

        var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + TITLE_BOX_HEIGHT, x + width, y + TITLE_BOX_HEIGHT );
        var separator1 = this.path(newPath);

        var pathY = getSeparator2YCood(y);
        var newPath2 = Raphael.format("M{0},{1} L{2}, {3}", x, pathY, x + width, pathY );
        var separator2 = this.path(newPath2);

        model.setWidth(width);
        model.setHeight(height);

        function getPropertyHeight() {
            return propertyTextArray.length * LINE_HEIGHT + PADDING;
        }

        function getMethodHeight() {
            return methodTextArray.length * LINE_HEIGHT + PADDING;
        }

        function getSeparator2Y() {
            return getPropertyHeight() + TITLE_BOX_HEIGHT;
        }


        function setPropertyY(index, y) {
            return y + PADDING + (index * LINE_HEIGHT) + TITLE_BOX_HEIGHT;
        }

        function setMethodY(index, y) {
            return y + (index * LINE_HEIGHT) + TITLE_BOX_HEIGHT + getPropertyHeight() + PADDING;
        }

        function getNameTextWidth() {
            return nameText.getBBox().width;
        }

        //  public methods

       // this should just change position of existing elements.
       headerRect.render = function () {

            var x = model.get('xCood');
            var y = model.get('yCood');
            var width = model.get('width');
            nameText.attr({ "x" : x + LEFT_OFFSET });
            nameText.attr({ "y" : y + 10 });
            headerRect.attr({ "x" : x });
            headerRect.attr({ "y" : y });

            var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width, y + 20 );
            separator1.attr({ path : newPath });

            for(var i = 0; i < propertyTextArray.length; i++) {
                propertyTextArray[i].text.attr({ "x" : x + LEFT_OFFSET });
                propertyTextArray[i].text.attr({ "y" : setPropertyY(i, y) })
            }

            for(var i = 0; i < methodTextArray.length; i++) {
                methodTextArray[i].text.attr({ "x" : x + LEFT_OFFSET });
                methodTextArray[i].text.attr({ "y" : setMethodY(i, y)  })
            }

            var newPath2 = Raphael.format("M{0},{1} L{2}, {3}", x, getSeparator2YCood(y), x + width, getSeparator2YCood(y) );
            separator2.attr({ path : newPath2 });

        };


        function getSeparator2YCood(y) {
            return y + getPropertyHeight() + TITLE_BOX_HEIGHT;
        }

        var that = this;

        headerRect.recreate = function () {
            nameText.remove();

            removeContents();
            var x = model.get('xCood');
            var y = model.get('yCood');


            var name = model.get("name");
            nameText = that.text(LEFT_OFFSET + x, y + 10, name).attr({ 'text-anchor' : 'start'});
            var width = nameText.getBBox().width;

            var properties = model.get("properties").map(function (index, element) {
                return formatProperty(element);
            });

            for(var i=0; i < properties.length;i++) {
                var textElement = that.text(LEFT_OFFSET + x, setPropertyY(i, y), properties[i]).attr({ 'text-anchor' : 'start'});
                propertyTextArray.push({ text : textElement });
            }

            var methods = model.get('methods').map(function (index, element) {
                return formatMethod(element);
            });


            $.each(methods, function (index, method) {
                var textElement = that.text(LEFT_OFFSET + x,
                                  setMethodY(index, y),
                                  method).attr({ 'text-anchor' : 'start' });

                methodTextArray.push({ text : textElement });
            });

            for(var i=0; i < propertyTextArray.length; i++) {
                var tempWidth = propertyTextArray[i].text.getBBox().width;
                width = tempWidth > width ? tempWidth : width;

            }

            $.each(methodTextArray, function (index, methodText) {

                var tempWidth = methodText.text.getBBox().width;
                width = tempWidth > width ? tempWidth : width;
            });

            width = width + 10;
            headerRect.attr({ "width" : width });


            var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width, y + 20 );
            separator1.attr({ path : newPath });

            var newPath2 = Raphael.format("M{0},{1} L{2}, {3}", x, getSeparator2YCood(y), x + width, getSeparator2YCood(y) );
            separator2.attr({ path : newPath2 });

            var height = getHeight();
            headerRect.attr({ "height" : height });

            var x2 = model.get('xCood');
            var y2 = model.get('yCood');

            model.updateDimensions(height, width);
        }

        function removeContents() {

            for(var i = 0; i < propertyTextArray.length; i++) {
                propertyTextArray[i].text.remove();
            }
            $.each(methodTextArray, function (index, method) {
                method.text.remove();
            });
            propertyTextArray.splice(0, propertyTextArray.length);
            methodTextArray.splice(0, methodTextArray.length);
        }

        function formatProperty (property) {
            var result = "";

            result += property.visibility;
            result += property.name;
            result +=":";
            result += property.type;

            return result;
        }

        function formatMethod (method) {
            var result = "";

            result += method.visibility;
            result += method.name;
            result +="():";
            result += method.returnType;

            return result;
        }

        return headerRect;

    };

    return paper;

});