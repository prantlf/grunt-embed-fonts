'use strict';

var fs = require('fs');

exports.embedFonts = {

  all: function (test) {
    var expected = fs.readFileSync('test/expected.css').toString(),
        actual = fs.readFileSync('test/output.css').toString();
    test.equal(expected, actual, 'should encode and embed the font files');
    test.done();
  }

};
