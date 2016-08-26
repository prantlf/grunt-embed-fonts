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
      all: {
        files: {
          'test/output.css': ['test/input.css']
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
