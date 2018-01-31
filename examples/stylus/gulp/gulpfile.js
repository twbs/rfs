'use strict';

const gulp = require('gulp'),
 stylus = require('gulp-stylus');

gulp.task('build', function () {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.styl', ['build']);
});
