define(['BaseType'], function (BaseType) {


    var templates = {

        helloWorld : "<div>hello <%= name %></div>",

        toolsTemplate : [

            '   <div class="toolbar">                                                       ',
            '       <div class="close-button">close</div>                                   ',
            '       <div class="container">                                                 ',
            '           <div data-component="umlClass" class="component uml-class-button">  ',
            '               <div class="image"></div>                                       ',
            '               <div class="label">class</div>                                  ',
            '           </div>                                                              ',
            '           <div data-component="interface" class="component">                  ',
            '               <div class="image"></div>                                       ',
            '               <div class="label">inter</div>                                  ',
            '           </div>                                                              ',
            '           <div data-component="abstract" class="component">                   ',
            '               <div class="image"></div>                                       ',
            '               <div class="label">abstract</div>                               ',
            '           </div>                                                              ',
            '           <div data-component="connector" class="component">                  ',
            '               <div class="image"></div>                                       ',
            '               <div class="label">conne</div>                                  ',
            '           </div>                                                              ',
            '       </div>                                                                  ',
            '   </div>                                                                      '
        ].join(),

        guiTemplate :  [

             '  <div class="classBox">                                                                  ',
             '      <div class="className"></div>                                                       ',
             '      <div class="changeClassName">                                                       ',
             '          Name:<input type="text" value="<%= name %>"/>                                   ',
             '      </div>                                                                              ',
             '      <div class="properties">                                                            ',
             '          <div class="controls">                                                          ',
             '              <div class="title">                                                         ',
             '                  Properties                                                              ',
             '              </div>                                                                      ',
             '              <div class="addProperty">                                                   ',
             '                  <input type="button" class="button" value="add Prop"/>                  ',
             '              </div>                                                                      ',
             '          </div>                                                                          ',
             '                                                                                          ',
             '          <div class="property header">                                                   ',
             '              <div class="visibility"></div>                                              ',
             '              <div class="name">name</div>                                                ',
             '              <div class="type">type</div>                                                ',
             '          </div>                                                                          ',
             '          <% for(var i = 0 ; i < properties.size(); i++) {  %>                            ',
             '          <div class="property" data-index="<%= i %>">                                    ',
             '                                                                                          ',
             '              <div class="visibility">                                                    ',
             '                  <%= properties.get(i).visibility %>                                     ',
             '              </div>                                                                      ',
             '              <input type="hidden" name="visibility" value="+"/>                          ',
             '                                                                                          ',
             '              <div class="name">                                                          ',
             '                  <input type="text" value="<%= properties.get(i).name %>" />             ',
             '              </div>                                                                      ',
             '                                                                                          ',
             '              <div class="type">                                                          ',
             '                  <input type="text" value="<%= properties.get(i).type %>" />             ',
             '              </div>                                                                      ',
             '                                                                                          ',
             '              <div class="delete">                                                        ',
             '                  <input type="button" class="button" value="del"/>                       ',
             '              </div>                                                                      ',
             '          </div>                                                                          ',
             '          <% } %>                                                                         ',
             '      </div>                                                                              ',
             '                                                                                          ',
             '      <div class="methods">                                                               ',
             '          <div class="title">                                                             ',
             '              Methods                                                                     ',
             '          </div>                                                                          ',
             '          <div class="addMethod">                                                         ',
             '              <input type="button" class="button" value="add Meth"/>                      ',
             '          </div>                                                                          ',
             '      </div>                                                                              ',
             '  </div>                                                                                  ',
             ''].join('')

    };

    return {

        getTemplate : function (templateName) {

            return templates[templateName];
        },

        pushTemplate : function (templateName, template) {
            templates[templateName] = template;
        }
    };
});