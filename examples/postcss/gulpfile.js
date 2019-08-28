'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rfs = require('../../postcss');

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

gulp.task('default', () => {
  return gulp.src('./src/main.css')
    .pipe(postcss([rfs(options)]))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.css', ['build']);
});
