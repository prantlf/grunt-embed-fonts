'use strict';

var fs = require('fs');

exports.embedFonts = {

  first: function (test) {
    var expected = fs.readFileSync('test/first/expected.css').toString(),
        actual = fs.readFileSync('test/first/output.css').toString();
    test.equal(expected, actual, 'should encode and embed the font files');
    test.done();
  },

  second: function (test) {
    var expected = fs.readFileSync('test/second/expected.css').toString(),
        actual = fs.readFileSync('test/second/output.css').toString();
    test.equal(expected, actual, 'should handle different directories in single task');
    test.done();
  },

  capitals: function (test) {
    var expected = fs.readFileSync('test/capitals/expected.css').toString(),
        actual = fs.readFileSync('test/capitals/output.css').toString();
    test.equal(expected, actual, 'should handle file names in upper case');
    test.done();
  },

  query: function (test) {
    var expected = fs.readFileSync('test/query/expected.css').toString(),
        actual = fs.readFileSync('test/query/output.css').toString();
    test.equal(expected, actual, 'should handle file names with a URL query');
    test.done();
  },

  'forced-font': function (test) {
    var expected = fs.readFileSync('test/forced-font/expected.css').toString(),
        actual = fs.readFileSync('test/forced-font/output.css').toString();
    test.equal(expected, actual, 'should force using "font/..." MIME Type');
    test.done();
  },

  'forced-x-font': function (test) {
    var expected = fs.readFileSync('test/forced-x-font/expected.css').toString(),
        actual = fs.readFileSync('test/forced-x-font/output.css').toString();
    test.equal(expected, actual, 'should force using "application/x-font-..." MIME Type');
    test.done();
  },

  overrides: function (test) {
    var expected = fs.readFileSync('test/overrides/expected.css').toString(),
        actual = fs.readFileSync('test/overrides/output.css').toString();
    test.equal(expected, actual, 'should allow overriding MIME types for specific file extensions');
    test.done();
  },

  'apply-to': function (test) {
    var expected = fs.readFileSync('test/apply-to/expected.css').toString(),
        actual = fs.readFileSync('test/apply-to/output.css').toString();
    test.equal(expected, actual, 'should only affect woff MIME types');
    test.done();
  },

  only: function (test) {
    var expected = fs.readFileSync('test/only/expected.css').toString(),
        actual = fs.readFileSync('test/only/output.css').toString();
    test.equal(expected, actual, 'should only affect filenames not starting with "skip-"');
    test.done();
  }

};
