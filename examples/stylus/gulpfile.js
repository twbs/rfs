'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');

gulp.task('default', () => {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.styl', ['build']);
});
