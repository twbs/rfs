'use strict';

const gulp = require('gulp'),
 less = require('gulp-less');

gulp.task('build', function () {
  return gulp.src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['build']);
});
