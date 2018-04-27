# grunt-embed-fonts [![NPM version](https://badge.fury.io/js/grunt-embed-fonts.png)](http://badge.fury.io/js/grunt-embed-fonts) [![Build Status](https://travis-ci.org/prantlf/grunt-embed-fonts.png)](https://travis-ci.org/prantlf/grunt-embed-fonts) [![Coverage Status](https://coveralls.io/repos/prantlf/grunt-embed-fonts/badge.svg)](https://coveralls.io/r/prantlf/grunt-embed-fonts) [![Dependency Status](https://david-dm.org/prantlf/grunt-embed-fonts.svg)](https://david-dm.org/prantlf/grunt-embed-fonts) [![devDependency Status](https://david-dm.org/prantlf/grunt-embed-fonts/dev-status.svg)](https://david-dm.org/prantlf/grunt-embed-fonts#info=devDependencies) [![devDependency Status](https://david-dm.org/prantlf/grunt-embed-fonts/peer-status.svg)](https://david-dm.org/prantlf/grunt-embed-fonts#info=peerDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/prantlf/grunt-embed-fonts.svg)](https://greenkeeper.io/) [![Code Climate](https://codeclimate.com/github/prantlf/grunt-embed-fonts/badges/gpa.svg)](https://codeclimate.com/github/prantlf/grunt-embed-fonts) [![Codacy Badge](https://www.codacy.com/project/badge/f3896e8dfa5342b8add12d50390edfcd)](https://www.codacy.com/public/prantlf/grunt-embed-fonts) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

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

From version 0.4.0 on, MIME types used by default comply with [IANA] and
[W3C WOFF] font MIME type specifications.  If you need MIME types generated
by previous versions (either all types as "font/{file ext}" or all types
as "application/x-font-{file ext}"), look at options `fontMimeType` and
`xFontMimeType` below.

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
        'dist/css/style.css': ['src/css/style.css']
      }
    }
  }
});
```
The configuration consists of key-value pairs with the output stylesheet
path as a key pointing to the input stylesheet file.

An example from the input stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url(fonts/test.woff) format("woff");
  font-weight: 400;
  font-style: normal;
}
```

An example from the generated output stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url("data:application/font-woff;base64,ZmlsZTgK") format("woff");
  font-weight: 400;
  font-style: normal;
}
```

MIME types are assigned to font files by their file extension according
to the following table:

| File ext. | MIME Type                     | Since         | Note                                |
| --------- | ----------------------------- | ------------- | ----------------------------------- |
| .eot      | application/vnd.ms-fontobject | December 2005 |                                     |
| .otf      | application/font-sfnt         | March 2013    | earlier application/x-font-opentype |
| .svg      | image/svg+xml                 | August 2011   |                                     |
| .ttf      | application/font-sfnt         | March 2013    | earlier application/x-font-truetype |
| .woff     | application/font-woff         | January 2013  |                                     |
| .woff2    | font/woff2                    | March 2016    | proposed by W3C                     |

See summarizing post at [Stack Overflow] and [IANA] with [W3C WOFF]
specifications for more information.

### Options

#### fontMimeType
Type: `Boolean`
Default value: `false`

Force using "font/..." MIME Type in the embedded font face
definition instead of the latest IANA/W3C recommendation.

```js
grunt.initConfig({
  embedFonts: {
    old: {
      options: {
        fontMimeType: true
      },
      files: {
        'dist/css/style.css': ['src/css/style.css']
      }
    }
  }
});
```

An example from the input stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url(fonts/test.woff) format("woff");
  font-weight: 400;
  font-style: normal;
}
```

An example from the generated output stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url("data:font/woff;base64,ZmlsZT...") format("woff");
  font-weight: 400;
  font-style: normal;
}
```

#### xFontMimeType
Type: `Boolean`
Default value: `false`

Force using "application/x-font-..." MIME Type in the embedded font face
definition instead of the latest IANA/W3C recommendation.

```js
grunt.initConfig({
  embedFonts: {
    old: {
      options: {
        xFontMimeType: true
      },
      files: {
        'dist/css/style.css': ['src/css/style.css']
      }
    }
  }
});
```

An example from the input stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url(fonts/test.woff) format("woff");
  font-weight: 400;
  font-style: normal;
}
```

An example from the generated output stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url("data:application/x-font-woff;base64,ZmlsZT...") format("woff");
  font-weight: 400;
  font-style: normal;
}
```

#### mimeTypeOverrides
Type: `Object`
Default value: `{}`

Override a MIME typ assignments for one or more specific file extensions
to use the value specified in the key-value pair of the options object.

This option has the highest priority; `fontMimeType`, `xFontMimeType`
and the default MIME type assignment will not apply for the specified file
extensions.  File extesions not specified by `mimeTypeOverrides` will
be processed by usual rules (first by checking `fontMimeType`, then by
checking `xFontMimeType` and finally by the choosing the preferred MIME
type according to the latest specifications and drafts.)

```js
grunt.initConfig({
  embedFonts: {
    old: {
      options: {
        mimeTypeOverrides: {
          otf: 'application/x-font-opentype'
        }
      },
      files: {
        'dist/css/style.css': ['src/css/style.css']
      }
    }
  }
});
```

An example from the input stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url('fonts/test.woff') format("woff")
       url(fonts/test.otf) format("opentype");
  font-weight: 400;
  font-style: normal;
}
```

An example from the generated output stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url("data:application/font-woff;base64,ZmlsZT...") format("woff"),
       url("data:application/x-font-opentype;base64,ZmlsZT...") format("opentype");
  font-weight: 400;
  font-style: normal;
}
```

#### applyTo
Type: `array`
Default value: `['eot','svg','ttf','otf','woff','woff2']`

Only embed specific MIME types. 

The benefit of @font-face is that it allows the browser to choose which
font-type to use. In some cases it is beneficial to embed only the most
common MIME types and have the other files as a fall-back.

```js
grunt.initConfig({
  embedFonts: {
    old: {
      options: {
        applyTo: ['woff']
      },
      files: {
        'dist/css/style.css': ['src/css/style.css']
      }
    }
  }
});
```

An example from the input stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url("data:application/font-woff;base64,ZmlsZT...") format("woff"),
       url(fonts/test.otf) format("opentype");
  font-weight: 400;
  font-style: normal;
}
```

An example from the generated output stylesheet:

```css
@font-face {
  font-family: 'Test';
  src: url("data:application/font-woff;base64,ZmlsZT...") format("woff"),
       url(fonts/test.otf) format("opentype");
  font-weight: 400;
  font-style: normal;
}
```

### Loading

Load the plugin in `Gruntfile.js`:

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

## Release History

 * 2018-04-27   v1.0.0   Dropped support of Node.js 4
 * 2017-03-05   v0.5.0   Added applyTo option for skipping font MIME types
 * 2016-12-20   v0.4.0   Prefer MIME types specified by IANA and W3C,
                         allow full MIME type overriding, add verbose logging
 * 2016-12-11   v0.3.0   Allow using "application/x-font-..." MIME type
 * 2016-12-11   v0.2.2   Fix processing stylesheets from multiple directories,
                         add support for otf fonts
 * 2016-12-11   v0.2.1   Fix malformed BASE64 encoding
 * 2016-26-08   v0.2.0   Upgrade to Grunt 1.x
 * 2016-03-05   v0.1.3   Update dependencies, improve build testing
 * 2016-01-09   v0.1.2   Fix e-mail, update dependencies and copyright
                         year, bump version number
 * 2015-07-24   v0.1.1   Add support for NodeJS 0.10.x
 * 2015-07-24   v0.1.0   Initial release

## License

Copyright (c) 2015-2017 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[W3C Font fetching requirements]: http://www.w3.org/TR/css-fonts-3/#font-fetching-requirements
[IANA]: http://www.iana.org/assignments/media-types/media-types.xhtml
[W3C WOFF]: https://www.w3.org/TR/WOFF/#appendix-b
[Stack Overflow]: http://stackoverflow.com/a/20723357/623816
