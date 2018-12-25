// Packages
const prettier = require("prettier");
const fs = require("fs");
const sass = require('node-sass');
const less = require('less');
const stylus = require('stylus');

// Strings
const encoding = 'utf8';
const dir = `${__dirname}/../`;

// Functions
const format = css => prettier.format(css, {parser: "css"}).replace(/(\n)(\n)/g, '$1');
const getFileContent = (folder, id, ext) => fs.readFileSync(`${dir}${folder}/${id}.${ext}`, {encoding});

// Postcss
const postcss = require('postcss');
const rfs = require('../../');
const postcsstests = require('../postcss/tests.js');
const postcsscss = getFileContent('postcss', 'main', 'css');

// Exports
module.exports = {
  // Return formatted expected result
  expected: (id) => format(getFileContent('result', id, 'css')),

  // Return parsed css
  sass: (id) => format(sass.renderSync({file: `${dir}sass/${id}.scss`}).css.toString(encoding)),

  // Return parsed css
  less: (id) => {
    return less.render(getFileContent('less', id, 'less'), {paths: [dir + 'less'], syncImport: true}).then((result) => {
      return format(result.css);
    });
  },

  stylus: (id) => {
    let formattedCSS = '';
    stylus.render(getFileContent('stylus', id, 'styl'), {filename: `${dir}stylus/${id}.styl`}, (err, css) => {
      if (err) {
        throw err;
      }
      formattedCSS = format(css);
    });
    return formattedCSS;
  },

  postcss: (id) => format(postcss(rfs(postcsstests[id])).process(postcsscss).css)
};
