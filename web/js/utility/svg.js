define(['raphael'], function(Raphael) {

    var paper = Raphael(100, 100, 1000,1000);
    paper.rect(0, 0, 1000, 600).attr({ fill : "white"});

    Raphael.fn.UmlClassBox = function(model) {

        var offset,
            name = model.get("name"),
            propertyTextArray = [],
            width = 0,
            umlBoxElement;

        this.setStart();

        // constants:
        var leftOffset = 5,
            titleBoxHeight = 30;

        var x = model.get('xCood');
        var y = model.get('yCood');

        var headerRect = this.rect(x, y, 0, 0).attr({ fill : "#ffffce" });

        var nameText = this.text(leftOffset + x, y + 10, name).attr({ 'text-anchor' : 'start'});
        width = nameText.getBBox().width;


        var properties = model.get("properties").map(function (index, element) {
            return formatProperty(element);
        });

        for(var i=0; i < properties.length;i++) {
            propertyTextArray.push({ text : this.text(leftOffset + x, (i * 15 )+ y + titleBoxHeight, properties[i]).attr({ 'text-anchor' : 'start'})});
        }

        for(var i=0; i < propertyTextArray.length; i++) {
            var tempWidth = propertyTextArray[i].text.getBBox().width;
            width = tempWidth > width ? tempWidth : width;
        }

        var numberOfProperties = propertyTextArray.length;
        var height = (numberOfProperties * 16) + 25;

        headerRect.attr({ "height" : height });

        headerRect.attr({ width : width });



        umlBoxElement = this.setFinish();

        //  public methods

        function render () {










            var x = headerRect.attr("x");
            var y = headerRect.attr("y");

            var newPath = Raphael.format("M{0},{1} L{2}, {3}", x, y + 20, x + width, y + 20 );

            //separator1.attr({ "path" : newPath });

        }

        umlBoxElement.render = render;

        function formatProperty (property) {
            var result = "";

            result += property.visibility;
            result += property.name;
            result +=":";
            result += property.type;

            return result;
        }

        return umlBoxElement;

    };

    return paper;

});