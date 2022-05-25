// grunt-embed-fonts
// https://github.com/prantlf/grunt-embed-fonts
//
// Copyright (c) 2015-2022 Ferdinand Prantl
// Licensed under the MIT license.
//
// Injects content of font files into stylesheets by replacing the relative
// file paths by data URIs.

'use strict';

var path = require('path'),
    fontFace = /@font-face\s*\{[^\}]*}/g,
    fontUrl = /url\(["']?(?!\/\/)([^\?#"'\)]+\.(?:eot|svg|ttf|otf|woff|woff2))((?:\?[^#"'\)]*)?(?:#[^"'\)]*))?["']?\)/ig,
    fontType = /\.((?:[a-zA-Z]+)2?)$/,
    fontMimeTypes = {
      eot: 'application/vnd.ms-fontobject',
      otf: 'application/font-sfnt',
      svg: 'image/svg+xml',
      ttf: 'application/font-sfnt',
      woff: 'application/font-woff',
      woff2: 'font/woff2'
    };

module.exports = function (grunt) {
  function getDataUri(fontFile, options) {
    var typeMatchResult = fontType.exec(fontFile),
        typeMatch = typeMatchResult[1].toLowerCase(),
        faceContent = grunt.file.read(fontFile, {encoding: null}),
        fontEncoded = faceContent.toString('base64'),
        fontMimeType = options.mimeTypeOverrides[typeMatch];
    if (!fontMimeType) {
      if (options.fontMimeType) {
        fontMimeType = 'font/' + typeMatch;
      } else if (options.xFontMimeType) {
        fontMimeType = 'application/x-font-' + typeMatch;
      } else {
        fontMimeType = fontMimeTypes[typeMatch];
      }
    }
    grunt.verbose.writeln('Embedding "' + fontFile + '" as "' + fontMimeType + '".');
    return 'data:' + fontMimeType + ';base64,' + fontEncoded;
  }

  function embedFontUrls(faceContent, options) {

    var isMatchingFile = function (fontFile, fileNameRegExps) {
      return fileNameRegExps.some(function (fileNameRegExp) {
        return fontFile.match(fileNameRegExp);
      });
    };

    var urlMatch;
    var mimeTypes;
    var currentFontUrl = fontUrl;
    if (options.applyTo) {
      mimeTypes = options.applyTo.join('|');
      currentFontUrl = new RegExp("url\\([\"']?(?!\\/\\/)([^\\?#\"'\\)]+\\.(?:" + mimeTypes + "))((?:\\?[^#\"'\\)]*)?(?:#[^\"'\\)]*))?[\"']?\\)", "ig");
    }
    while ((urlMatch = currentFontUrl.exec(faceContent))) {
      var fontFile = urlMatch[1];
      if (fontFile.indexOf(':') < 0) {
        if (!path.isAbsolute(fontFile)) {
          fontFile = path.join(options.baseDir, fontFile);
        }
        if (!options.only || isMatchingFile(fontFile, options.only)) {
          var fontAnchor = urlMatch[2] || '',
              fontEmbedded = 'url("' + getDataUri(fontFile, options) + fontAnchor + '")';
          faceContent = faceContent.substr(0, urlMatch.index) + fontEmbedded +
            faceContent.substr(urlMatch.index + urlMatch[0].length);
        }
      }
    }
    return faceContent;
  }

  function updateFontFaces(fileContent, options) {
    var faceMatch;
    while ((faceMatch = fontFace.exec(fileContent))) {
      var faceContent = embedFontUrls(faceMatch[0], options);
      fileContent = fileContent.substr(0, faceMatch.index) + faceContent +
        fileContent.substr(faceMatch.index + faceMatch[0].length);
    }
    return fileContent;
  }

  function processStylesheet(fileSrc, fileDest, options) {
    try {
      grunt.log.subhead('Processing stylesheet "' + fileSrc + '"');
      if (!options.baseDir) {
        options.baseDir = path.dirname(fileSrc);
      }
      var fileContent = grunt.file.read(fileSrc);
      fileContent = updateFontFaces(fileContent, options);
      grunt.file.write(fileDest, fileContent);
      /* c8 ignore next 4 */
    } catch (error) {
      grunt.log.error(error);
      grunt.fail.warn('Processing stylesheet "' + fileSrc + '" failed\n');
    }
  }

  grunt.registerMultiTask('embedFonts', 'Replace font URLs in stylesheets with data URIs including base64-encoded file content', function () {
    var options = this.options();
    if (!options.mimeTypeOverrides) {
      options.mimeTypeOverrides = {};
    }
    this.files.forEach(function (file) {
      // Reset relative path to embedded fonts before processing another
      // stylesheet; stylesheets can be in different directories
      options.baseDir = undefined;
      processStylesheet(file.src[0], file.dest, options);
    });
  });
};
