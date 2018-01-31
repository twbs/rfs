const fs = require('fs');
const postcss = require('postcss');
const rfs = require('../../..');
const css = fs.readFileSync(__dirname + '/src/main.css', 'utf8');
const options = {
  twoDimensional: false,
  minimumFontSize: 16,
  fontSizeUnit: 'rem',
  breakpoint: '75rem',
  breakpointUnit: 'px',
  factor: 5,
  unitPrecision: 6,
  remValue: 16,
  propList: ['responsive-font-size', 'rfs']
};

const processedCss = postcss(rfs(options)).process(css).css;

fs.writeFile(__dirname + '/dest/main.css', processedCss, (err) => {
  if (err) {
    throw err;
  }
  else {
    console.log('Responsive font sizes generated.');
  }
});
