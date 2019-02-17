'use strict';

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const rfs = require('../../..');

const css = fs.readFileSync(path.join(__dirname, '/src/main.css'), 'utf8');
const options = {
  twoDimensional: false,
  baseFontSize: 20,
  fontSizeUnit: 'rem',
  breakpoint: '75rem',
  breakpointUnit: 'px',
  factor: 10,
  unitPrecision: 6,
  remValue: 16,
  propList: ['responsive-font-size', 'rfs']
};

const processedCss = postcss(rfs(options)).process(css).css;

fs.writeFile(path.join(__dirname, '/dest/main.css'), processedCss, err => {
  if (err) {
    throw err;
  }

  console.log('Responsive font sizes generated.');
});
