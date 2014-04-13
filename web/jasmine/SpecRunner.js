/**
 * @author Micho García
 */
 // Modify as you need
require.config({
	baseUrl : "../",
	paths : {
		jquery : 'lib/jquery-1.8.0',
		underscore : 'lib/underscore',
		jasmine : 'jasmine/lib/jasmine-1.2.0/jasmine',
		'jasmine-html' : 'jasmine/lib/jasmine-1.2.0/jasmine-html',
		spec : 'spec/'
	},
	shim : {
		/*underscore : {
			exports : "_"
		},
		backbone : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		'backbone.localStorage' : {
			deps : ['backbone'],
			exports : 'Backbone'
		},

		*/
		jasmine : {
			exports : 'jasmine'
		},
		'jasmine-html' : {
			deps : ['jasmine'],
			exports : 'jasmine'
		}
	}
});

window.store = "TestStore";
// override local storage store name - for testing

//require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine) {
require([], function() {

    alert("hello world");

	/*var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var specs = [];

	//specs.push('path/to/whateverSpec');
	specs.push('whateverSpec');

	$(function() {
		require(specs, function() {
			jasmineEnv.execute();
		});
	});*/

});