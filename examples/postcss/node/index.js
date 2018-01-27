const fs = require('fs');
const postcss = require('postcss');
const rfs = require('../..');
const css = fs.readFileSync('main.css', 'utf8');
const options = {
    twoDimensional: false,
    minimumFontSize: 16,
    fontSizeUnit: 'rem',
    // breakpoint: 1200,
    breakpointUnit: 'px',
    factor: 5,
    unitPrecision: 6,
    remValue: 16,
    propList: ['responsive-font-size', 'rfs']
};

const processedCss = postcss(rfs(options)).process(css).css;

fs.writeFile('main.dest.css', processedCss, (err) => {
    if (err) {
        throw err;
    }
    console.log('Responsive font sizes generated.');
});
