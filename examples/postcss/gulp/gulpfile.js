const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rfs = require('../..');
const options = {
    twoDimensional: false,
    minimumFontSize: 16,
    fontSizeUnit: 'rem',
    breakpoint: 1200,
    breakpointUnit: 'px',
    factor: 5,
    unitPrecision: 6,
    remValue: 16,
    propList: ['responsive-font-size', 'rfs']
};

gulp.task('css', () => {
    return gulp.src('./src/main.css')
        .pipe(postcss([rfs(options)]))
        .pipe(gulp.dest('./dest'));
});
