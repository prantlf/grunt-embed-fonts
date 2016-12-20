'use strict';

module.exports = function (grunt) {

  var coverage = process.env.GRUNT_EMBED_FONTS_COVERAGE;

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
      }
    },

    nodeunit: {
      tests:   ['test/*_test.js']
    },

    clean: {
      tests:    ['test/output.css'],
      coverage: ['coverage']
    },

    instrument: {
      files: 'tasks/*.js',
      options: {
        lazy: true,
        basePath: 'coverage/'
      }
    },

    storeCoverage: {
      options: {
        dir: 'coverage'
      }
    },

    makeReport: {
      src: 'coverage/coverage.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },

    coveralls: {
      tests: {
        src: 'coverage/lcov.info'
      }
    }

  });

  grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', coverage ?
    ['jshint', 'clean', 'instrument', 'embedFonts', 'nodeunit',
     'storeCoverage', 'makeReport'] :
    ['jshint', 'clean:tests', 'embedFonts', 'nodeunit']);

};
