var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Default task.
 * Excecutes the server and watch tasks.
 */
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    [
      'fonts',
      'svg',
      'styles',
      'vendor',
      'scripts',
      'components',
      'views'
    ],
    'watch',
    'images',
    callback
  );
});
