define(['BaseType', 'underscore'], function (BaseType, _) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "getCloseButton");
            this.model = options.model;
            this.el = options.el;
            this.render();
            this.model.on("change", this.render, this);
        },

        render : function () {

            var data = this.model.getCurrentPage();
            var visible = this.model.isVisible();
            var hidden = visible ? "" : "hidden";
            var content = $('<div class="content ' + hidden  +'"></div>');
            var menu = this._getTemplate("menu");
            content.append(menu({}));

            var template = this._getTemplate(this.model.getPageNumber());
            console.log(data)
            content.append(template(data))
            this.el.html(content);
        },

        _getTemplate : function (pageNumber) {
            var id = '#help-template-page-' + pageNumber;
            return _.template($(id).html());
        },

        getCloseButton : function () {
            return this.el.find('.close-button');
        },

        getPageLink : function () {
            return this.el.find('.page-link')
        }

    });
});