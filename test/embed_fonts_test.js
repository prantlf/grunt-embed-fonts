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

  xFont: function (test) {
    var expected = fs.readFileSync('test/x-font/expected.css').toString(),
        actual = fs.readFileSync('test/x-font/output.css').toString();
    test.equal(expected, actual, 'should allow using "application/x-font-..." MIME Type');
    test.done();
  }

};
