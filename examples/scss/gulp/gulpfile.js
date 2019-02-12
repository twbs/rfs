'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('build', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.scss', ['build']);
});
