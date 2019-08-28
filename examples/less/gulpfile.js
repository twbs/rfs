'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('default', () => {
  return gulp.src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.less', ['build']);
});
