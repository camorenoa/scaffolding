var config = require('../config');
var gulp = require('gulp');
var server = require('gulp-live-server');

gulp.task('views', ['copy:index', 'copy:views']);

gulp.task('copy:index', function() {
  return gulp.src(config.indexHtml)
    .pipe(gulp.dest(config.paths.dest));
});

gulp.task('copy:views', function() {
  return gulp.src(config.views.src)
    .pipe(gulp.dest(config.paths.dest + '/views/'));
});