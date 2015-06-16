module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
/*
        "karma": {

            unit: {
                configFile: 'karma.conf.js'
            }


        },*/

        "jshint" : {

            src : ["web/diagram/**/*.js"],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        copy: {
            main : {
                cwd: 'required',  // set working folder / root to copy
                src: [
                    'css/**/*.css',
                    'diagrams/**/*',
                    'lib/**/*',
                    'bootstrap.js',
                    'main.js',
                    'reset.css'
                ],           // copy all files and subfolders
                dest: 'build',    // destination folder
                expand: true           // required when using cwd
            },
            indexfile : {
                src: 'web/index.html',
                dest: 'build/index.html',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/<!--underscore-placeholder-->/g,'<script src="lib/underscore.js"></script>');
                    }
                }
            }
        },

        clean: {
            required: ["required"],
            oldBuild: ["build"]
        },

        "ftp-deploy" : {
            build: {
                auth: {
                    host: 'ftp.richardhunter.co.uk',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'web',
                dest: '/carracci',
                exclusions: [
                    'web/richardUtils/node_modules',
                    'web/rasmus'
                ]
            }
        },

        "requirejs" : {
            compile: {
                options: {
                    baseUrl: "./web",
                    mainConfigFile: './web/main.js',
                    skipDirOptimize: true,
                    removeCombined: true,
                    modules : [

                        //This module entry combines all the dependencies of foo/bar/bop and foo/bar/bee
                        //and any of their dependencies into one file.
                        {
                            name: "bootstrap",
                            exclude : [
                                'jquery',
                                'underscore',
                                'raphael',
                                'raphaelCore',
                                'raphaelSVG',
                                'raphaelVML',
                                'eve',
                                'canvg',
                                'rgbColor'
                            ]
                        }
                    ],
                    fileExclusionRegExp: /^(.sass-cache|sass)$/,
                    dir : "./required",
                    optimize: "uglify"

                }
            }
        }
    });
    //grunt.loadNpmTasks('grunt-karma');
    //grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.task.registerTask("build", ['clean:oldBuild', 'requirejs', 'copy', 'clean:required']);


};
