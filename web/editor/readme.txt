Editor module


Installation:

dependencies: BaseType, Model, jquery, underscore, and require.js

In require configuration file, paths should be defined for the strings

'BaseType, 'jquery', 'underscore', and 'Model' pointing to the corresponding scripts to allow require.js to

load these for editor scripts.

The folder containing this file and other editor scripts should be at the require.js base level.

Configuration:

create an instance of EditorModule and pass in an options object to create and configure an editor object.

example:

var editor = new EditorModule({

    placeholder : $('#editor-placeholder'), // element that editor will be attached to
    commandObject : commandObject,  // object containing commands to run
    commands : [     // array of strings indicating methods of command object
        'help',
        'create',
        'use',
        'con',
        'set',
        'remove',
        'show',
        'load',
        'export'
    ],
    preferences : {

        width : 300,
        height : 500,
        backgroundColor : "red",
        style : "default" // might specify a particular css prefix
    }

});

