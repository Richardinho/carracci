module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      // for pulling in base type from node modules when it is updated
      utils: {
        cwd: 'node_modules',
        src: ['richardUtils/src/BaseType.js'],
        dest: 'web',
        expand: true,
      },
      serviceWorker: {
        cwd: '.',
        src: ['sw.js', 'register-service-worker.js'],
        dest: 'docs',
        expand: true,
      },
      main: {
        cwd: 'required', // set working folder / root to copy
        src: [
          'css/**/*.css',
          'diagrams/**/*',
          'lib/**/*',
          'bootstrap.js',
          'main.js',
          'reset.css',
        ], // copy all files and subfolders
        dest: 'docs', // destination folder
        expand: true, // required when using cwd
      },
      indexfile: {
        src: 'web/index.html',
        dest: 'docs/index.html',
        options: {
          process: function(content, srcpath) {
            return content.replace(
              /<!--underscore-placeholder-->/g,
              '<script src="lib/underscore.js"></script><script src="register-service-worker.js"></script>'
            )
          },
        },
      },
    },

    clean: {
      required: ['required'],
      oldBuild: ['carracci'],
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.richardhunter.co.uk',
          port: 21,
          authKey: 'key1',
        },
        src: 'web',
        dest: '/carracci',
        exclusions: ['web/richardUtils/node_modules', 'web/rasmus'],
      },
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './web',
          mainConfigFile: './web/main.js',
          skipDirOptimize: true,
          removeCombined: true,
          modules: [
            //This module entry combines all the dependencies of foo/bar/bop and foo/bar/bee
            //and any of their dependencies into one file.
            {
              name: 'bootstrap',
              exclude: [
                'jquery',
                'underscore',
                'raphael',
                'raphaelCore',
                'raphaelSVG',
                'raphaelVML',
                'eve',
                'canvg',
                'rgbColor',
              ],
            },
          ],
          fileExclusionRegExp: /^(.sass-cache|sass)$/,
          dir: './required',
          optimize: 'uglify',
        },
      },
    },
  })
  //grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.task.registerTask('build', [
    'clean:oldBuild',
    'requirejs',
    'copy:serviceWorker',
    'copy:main',
    'copy:indexfile',
    'clean:required',
    'copy:serviceWorker',
  ])
}
