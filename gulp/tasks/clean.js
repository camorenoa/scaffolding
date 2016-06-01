var config = require('../config').clean;
var del = require('del');
var gulp = require('gulp');

/**
 * Clean task.
 * Deletes the dist folder (compiled, distribution ready files).
 */
gulp.task('clean', function(cb) {
  return del(config.dest + '/**/*', cb);
});
