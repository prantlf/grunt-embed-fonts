# grunt-embed-fonts [![NPM version](https://badge.fury.io/js/grunt-embed-fonts.png)](http://badge.fury.io/js/grunt-embed-fonts) [![Build Status](https://travis-ci.org/prantlf/grunt-embed-fonts.png)](https://travis-ci.org/prantlf/grunt-embed-fonts) [![Dependency Status](https://david-dm.org/prantlf/grunt-embed-fonts.svg)](https://david-dm.org/prantlf/grunt-embed-fonts) [![devDependency Status](https://david-dm.org/prantlf/grunt-embed-fonts/dev-status.svg)](https://david-dm.org/prantlf/grunt-embed-fonts#info=devDependencies) [![devDependency Status](https://david-dm.org/prantlf/grunt-embed-fonts/peer-status.svg)](https://david-dm.org/prantlf/grunt-embed-fonts#info=peerDependencies) [![Code Climate](https://codeclimate.com/github/prantlf/grunt-embed-fonts/badges/gpa.svg)](https://codeclimate.com/github/prantlf/grunt-embed-fonts) [![Codacy Badge](https://www.codacy.com/project/badge/f3896e8dfa5342b8add12d50390edfcd)](https://www.codacy.com/public/prantlf/grunt-embed-fonts) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM Downloads](https://nodei.co/npm/grunt-embed-fonts.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-embed-fonts)

This module provides a grunt multi-task injecting content of font files into
stylesheets using data URIs.

When you develop a HTML5 component, your styling may include special fonts.
If the page, which hosts your component has not the same origin, the server
has to include the CORS headers in the response with the font file
(`Access-Control-Allow-Origin: *` at least) according to the
[W3C Font fetching requirements].  You should always try to
configure the web server to do it to get the best performance.  If you
cannot, you can embed the fonts in the CSS files by this task, but the
size of the base64-encoded fonts for the page to load will be circa 35%
greater.  Additionally, the browser will load all fonts immediately with
the stylesheet, otherwise only the needed font faces and formats would be
downloaded.

## Installation

You need [node >= 0.10][node], [npm] and [grunt >= 0.4][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json].  If you haven't used Grunt before, be sure to
check out the [Getting Started] guide, as it explains how to create a
Gruntfile as well as install and use Grunt plugins.  Once you're familiar
with that process, you may install this plugin with this command:

```shell
$ npm install grunt-embed-fonts --save-dev
```

## Configuration

Add the `embedFonts` entry with the embed-fonts task configuration to the
options of the `grunt.initConfig` method:

```js
grunt.initConfig({
  embedFonts: {
    all: {
      files: {
        'dist/css/style.css': ['src/css/style.css]'
      }
    }
  }
});
```
The configuration consists of key-value pairs with the output stylesheet
path as a key pointing to the input stylesheet file.

Then, load the plugin:

```javascript
grunt.loadNpmTasks('grunt-embed-fonts');
```

## Build

Call the `embedFonts` task:

```shell
$ grunt embedFonts
```

or integrate it to your build sequence in `Gruntfile.js`:

```js
grunt.registerTask('default', ['embedFonts', ...]);
```

## Notes

This task replaces `url(...)` expressions in `@font-face {...}` styles only.
Commented out styles are processed too.  Paths to the font files are expected
to be relative to the stylesheet file path.  Already embedded fonts or fonts
not in the local file system are ignored.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## License

Copyright (c) 2015 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[W3C Font fetching requirements]: http://www.w3.org/TR/css-fonts-3/#font-fetching-requirements
