var config = require('../config');
var gulp = require('gulp');

gulp.task('components', ['copy:components']);

gulp.task('copy:components', function() {
  return gulp.src(config.components.src)
    .pipe(gulp.dest(config.paths.dest + '/components/'));
});