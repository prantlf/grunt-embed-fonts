'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      all:     [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
    },

    embedFonts: {
      normal: {
        files: {
          'test/first/output.css': ['test/first/input.css'],
          // Test different directories in single task
          'test/second/output.css': ['test/second/input.css']
        }
      },
      capitals: {
        files: {
          'test/capitals/output.css': ['test/capitals/input.css']
        }
      },
      query: {
        files: {
          'test/query/output.css': ['test/query/input.css']
        }
      },
      'forced-font': {
        options: {
          fontMimeType: true
        },
        files: {
          'test/forced-font/output.css': ['test/forced-font/input.css']
        }
      },
      'forced-x-font': {
        options: {
          xFontMimeType: true
        },
        files: {
          'test/forced-x-font/output.css': ['test/forced-x-font/input.css']
        }
      },
      overrides: {
        options: {
          mimeTypeOverrides: {
            otf: 'application/x-font-opentype',
            ttf: 'application/x-font-truetype'
          }
        },
        files: {
          'test/overrides/output.css': ['test/overrides/input.css']
        }
      },
      'apply-to': {
        options: {
          applyTo: ['woff']
        },
        files: {
          'test/apply-to/output.css': ['test/apply-to/input.css']
        }
      },
      only: {
        options: {
          only: [/(?<!skip-)file\d+/]
        },
        files: {
          'test/only/output.css': ['test/only/input.css']
        }
      }
    },

    nodeunit: {
      tests:   ['test/*_test.js']
    },

    clean: {
      tests:    ['test/output.css']
    }
  });

  grunt.loadTasks('tasks');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'clean', 'embedFonts', 'nodeunit']);
};
