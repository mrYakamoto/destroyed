
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        web_server: {
    options: {
      cors: true,
      port: 8000,
      nevercache: true,
      logRequests: true
    },
    foo: 'bar' // For some reason an extra key with a non-object value is necessary
  },
        uglify: {
            main: {
                src: 'js/<%= pkg.name %>.js',
                dest: 'js/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            options: {
              sourceMap: true,
              sourceComments: false
          },
          dist: {
              files: {
                  'css/main.css': 'css/main.scss'
              }
          }
      },
      less: {
        expanded: {
            options: {
                paths: ["css"]
            },
            files: {
                "css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
            }
        },
        minified: {
            options: {
                paths: ["css"],
                cleancss: true
            },
            files: {
                "css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
            }
        }
    },
    banner: '/*!\n' +
    ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
    ' */\n',
    usebanner: {
        dist: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: ['css/<%= pkg.name %>.css', 'css/<%= pkg.name %>.min.css', 'js/<%= pkg.name %>.min.js']
            }
        }
    },
    watch: {
        scripts: {
            files: ['js/<%= pkg.name %>.js'],
            tasks: ['uglify'],
            options: {
                spawn: false,
            },
        },
        less: {
            files: ['less/*.less'],
            tasks: ['less'],
            options: {
                spawn: false,
            }
        },
        sass: {
            files: 'sass/**/*.scss',
            tasks: ['sass']
        },
    },
});

    // Load the plugins.
    grunt.loadNpmTasks('grunt-web-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'sass', 'usebanner']);

};