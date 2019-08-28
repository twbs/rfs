'use strict';

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const rfs = require('../../postcss');

const css = fs.readFileSync(path.join(__dirname, '/src/main.css'), 'utf8');
const options = {
  twoDimensional: false,
  baseValue: 20,
  unit: 'rem',
  breakpoint: 1200,
  breakpointUnit: 'px',
  factor: 10,
  class: false,
  unitPrecision: 6,
  safariIframeResizeBugFix: false,
  remValue: 16
};

const processedCss = postcss(rfs(options)).process(css).css;

fs.writeFile(path.join(__dirname, '/dest/main.css'), processedCss, err => {
  if (err) {
    throw err;
  }
});
