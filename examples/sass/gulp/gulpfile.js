'use strict';

const gulp = require('gulp'),
 sass = require('gulp-sass');

gulp.task('build', function () {
  return gulp.src('./src/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.sass', ['build']);
});
