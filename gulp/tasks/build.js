var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Build task.
 * Executes all the build tasks in parallel.
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean',
    [
      'images',
      'fonts',
      'svg',
      'styles:prod',
      'vendor',
      'scripts:prod',
      'components',
      'views'
    ],
    callback
  );
});
