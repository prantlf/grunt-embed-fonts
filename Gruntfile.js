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
      tests:   ['test/*_test.js'],
      options: {
        reporter: coverage ? 'lcov' : 'verbose',
        reporterOutput: coverage ? 'coverage/tests.lcov' : undefined
      }
    },

    clean: {
      tests:    ['test/output.css'],
      coverage: ['coverage']
    },

    jscoverage: {
      tasks: {
        expand: true,
        cwd:    'tasks/',
        src:    '*.js',
        dest:   'coverage/tasks/'
      }
    },

    coveralls: {
      tests: {
        src: 'coverage/tests.lcov'
      }
    }

  });

  grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['jshint', 'clean:tests', 'embedFonts', 'nodeunit']);
  grunt.registerTask('instrument', ['jshint', 'clean', 'jscoverage']);
  grunt.registerTask('post_coverage', ['test', 'coveralls']);
  grunt.registerTask('default', ['test']);

};
