define(['raphael'], function(Raphael) {

    var paper = Raphael(100, 100, 1000,1000);
    paper.rect(0, 0, 1000, 600).attr({ fill : "white"});

    Raphael.fn.UmlClassBox = function(model) {

        var offset,
            propertyTextArray = [],
            width = 0,
            umlBoxElement;

        //this.setStart();

        var set = this.set();

        // constants:
        var leftOffset = 5,
            titleBoxHeight = 30;

        var that = this;


        var setLength = set.length;
        if(setLength > 0) {
            set.splice(0, setLength);
        }
        var x = model.get('xCood');
        var y = model.get('yCood');
        var name = model.get("name");

        var headerRect = that.rect(x, y, 0, 0).attr({ fill : "#ffffce" });
        set.push(headerRect);

        var nameText = that.text(leftOffset + x, y + 10, name).attr({ 'text-anchor' : 'start'});
        width = nameText.getBBox().width;
        set.push(nameText)


        var properties = model.get("properties").map(function (index, element) {
            return formatProperty(element);
        });

        for(var i=0; i < properties.length;i++) {
            var textElement = that.text(leftOffset + x, (i * 15 )+ y + titleBoxHeight, properties[i]).attr({ 'text-anchor' : 'start'});
            propertyTextArray.push({ text : textElement });
            set.push(textElement)
        }

        for(var i=0; i < propertyTextArray.length; i++) {
            var tempWidth = propertyTextArray[i].text.getBBox().width;
            width = tempWidth > width ? tempWidth : width;
        }

        var numberOfProperties = propertyTextArray.length;
        var height = (numberOfProperties * 16) + 25;

        headerRect.attr({ "height" : height });

        headerRect.attr({ width : width + 10 });

        var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width + 10, y + 20 );
        var separator1 = that.path(newPath);

        set.push(separator1)

        function removeProperties(set) {
            set.splice(2, set.length);
            for(var i = 0; i < propertyTextArray.length; i++) {
                // remove stored properties from dom.
                propertyTextArray[i].text.remove();

            }
            propertyTextArray.splice(0, propertyTextArray.length);
            separator1.remove();
        }


        //  public methods

        set.render = function () {
            var width = nameText.getBBox().width;
            //debugger;
            var x = this[0].attr('x');
            var y = this[0].attr('y');
            console.log(x, headerRect.getBBox().x)

            removeProperties(this);

            var properties = model.get("properties").map(function (index, element) {
                return formatProperty(element);
            });

            for(var i=0; i < properties.length;i++) {
                var textElement = that.text(leftOffset + x, (i * 15 )+ y + titleBoxHeight, properties[i]).attr({ 'text-anchor' : 'start'});
                propertyTextArray.push({ text : textElement });
                this.push(textElement)
            }

            for(var i=0; i < propertyTextArray.length; i++) {
                var tempWidth = propertyTextArray[i].text.getBBox().width;
                width = tempWidth > width ? tempWidth : width;
            }

            var numberOfProperties = propertyTextArray.length;
            var height = (numberOfProperties * 16) + 25;

            headerRect.attr({ "height" : height });

            headerRect.attr({ width : width + 10 });

            var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width + 10, y + 20 );
            separator1 = that.path(newPath);

            this.push(separator1)
            this.transform("T0,0");
        }

        function formatProperty (property) {
            var result = "";

            result += property.visibility;
            result += property.name;
            result +=":";
            result += property.type;

            return result;
        }

        return set;

    };

    return paper;

});