module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        "karma": {

            unit: {
                configFile: 'karma.conf.js'
            }


        },

        "jshint" : {

            src : ["web/diagram/**/*.js"],
            options: {
                jshintrc: '.jshintrc'
            }
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
                    dir : "./build",
                    optimize: "uglify"

                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.task.registerTask("buildAndDeploy", ['requirejs', 'ftp-deploy']);


};
