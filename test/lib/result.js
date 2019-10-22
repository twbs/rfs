'use strict';

// Packages
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const libSass = require('node-sass');
const dartSass = require('sass');
const less = require('less');
const stylus = require('stylus');

// Postcss
const postcss = require('postcss');
const rfs = require('../..');
const postcssTests = require('../postcss/tests.js');

// Functions
function format(css) {
  return prettier.format(css, {parser: 'css'}).replace(/(\n)(\n)/g, '$1');
}

function getFileContent(folder, id, ext) {
  return fs.readFileSync(path.join(__dirname, `../${folder}/${id}.${ext}`), 'utf8');
}

const postcssCss = getFileContent('postcss', 'main', 'css');

// Exports
module.exports = {
  // Return formatted expected result
  expected: id => format(getFileContent('expected', id, 'css')),

  // Return parsed css
  dartsass: id => {
    return format(dartSass.renderSync({
      file: path.join(__dirname, `../sass/${id}.scss`)
    }).css.toString('utf8'));
  },

  // Return parsed css
  libsass: id => {
    return format(libSass.renderSync({
      file: path.join(__dirname, `../sass/${id}.scss`)
    }).css.toString('utf8'));
  },

  // Return parsed css
  less: id => {
    return less.render(getFileContent('less', id, 'less'), {
      paths: [path.join(__dirname, '../less')],
      syncImport: true
    }).then(result => {
      return format(result.css);
    });
  },

  stylus: id => {
    let formattedCSS = '';
    stylus.render(getFileContent('stylus', id, 'styl'), {
      filename: path.join(__dirname, `../stylus/${id}.styl`)
    }, (err, css) => {
      if (err) {
        throw err;
      }

      formattedCSS = format(css);
    });
    return formattedCSS;
  },

  postcss: id => {
    return format(postcss(rfs(postcssTests[id])).process(postcssCss).css);
  }
};
