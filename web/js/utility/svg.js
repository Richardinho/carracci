define(['raphael'], function(Raphael) {

    var paper = Raphael(500, 700, 500,600);
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
            width = 0,
            umlBoxElement,
            lineHeight = 15;

        // constants:
        var leftOffset = 5,
            titleBoxHeight = 30;

        var x = model.get('xCood');
        var y = model.get('yCood');
        var name = model.get("name");

        var headerRect = this.rect(x, y, 0, 0).attr({ fill : "#ffffce" });

        var nameText = this.text(leftOffset + x, y + 10, name).attr({ 'text-anchor' : 'start'});

        width = nameText.getBBox().width;

        var properties = model.get("properties").map(function (index, element) {
            return formatProperty(element);
        });

        for(var i=0; i < properties.length;i++) {
            var textElement = this.text(leftOffset + x, (i * 15 )+ y + titleBoxHeight, properties[i]).attr({ 'text-anchor' : 'start'});
            propertyTextArray.push({ text : textElement });
        }

        for(var i=0; i < propertyTextArray.length; i++) {
            var tempWidth = propertyTextArray[i].text.getBBox().width;
            width = tempWidth > width ? tempWidth : width;
        }
        width = width + 10;

        var numberOfProperties = propertyTextArray.length;
        var height = (numberOfProperties * 16) + 25;

        headerRect.attr({ "height" : height });
        headerRect.attr({ width : width });

        var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width, y + 20 );
        var separator1 = this.path(newPath);

        model.setWidth(width);
        model.setHeight(height);

        //  public methods

       // this should just change position of existing elements.
       headerRect.render = function () {

            var x = model.get('xCood');
            var y = model.get('yCood');
            var width = model.get('width');
            nameText.attr({ "x" : x + leftOffset });
            nameText.attr({ "y" : y + 10 });
            headerRect.attr({ "x" : x });
            headerRect.attr({ "y" : y });

            var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width, y + 20 );
            separator1.attr({ path : newPath });

            for(var i = 0; i < propertyTextArray.length; i++) {
                propertyTextArray[i].text.attr({ "x" : x + leftOffset });
                propertyTextArray[i].text.attr({ "y" : y + titleBoxHeight + i * lineHeight })
            }

        }
        var that = this;

        headerRect.recreate = function () {
            nameText.remove();

            removeProperties();
            var x = model.get('xCood');
            var y = model.get('yCood');

            console.log("recreate: ", x , y)
            // change size of rectangle.
            // delete all contents
            // recalculate and redraw elements
            var name = model.get("name");
            nameText = that.text(leftOffset + x, y + 10, name).attr({ 'text-anchor' : 'start'});
            var width = nameText.getBBox().width;

            var properties = model.get("properties").map(function (index, element) {
                return formatProperty(element);
            });

            for(var i=0; i < properties.length;i++) {
                var textElement = that.text(leftOffset + x, (i * lineHeight )+ y + titleBoxHeight, properties[i]).attr({ 'text-anchor' : 'start'});
                propertyTextArray.push({ text : textElement });
            }

            for(var i=0; i < propertyTextArray.length; i++) {
                var tempWidth = propertyTextArray[i].text.getBBox().width;
                width = tempWidth > width ? tempWidth : width;

            }
            width = width + 10;
            headerRect.attr({ "width" : width });


            var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width, y + 20 );
            separator1.attr({ path : newPath });

            var numberOfProperties = propertyTextArray.length;
            var height = (lineHeight * numberOfProperties) + titleBoxHeight;

            headerRect.attr({ "height" : height });

            var x2 = model.get('xCood');
            var y2 = model.get('yCood');

            model.updateDimensions(height, width);
        }

        function removeProperties() {

            for(var i = 0; i < propertyTextArray.length; i++) {
                propertyTextArray[i].text.remove();
            }
            propertyTextArray.splice(0, propertyTextArray.length);
        }

        function formatProperty (property) {
            var result = "";

            result += property.visibility;
            result += property.name;
            result +=":";
            result += property.type;

            return result;
        }

        return headerRect;

    };

    return paper;

});