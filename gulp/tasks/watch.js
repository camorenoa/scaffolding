var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gls = require('gulp-live-server');
var open = require('gulp-open');
var sequence = require('run-sequence');

var server = gls.static();

/*
 * Method to safely notify the livereload server
 */
var safeNotify = function(e) {
  try {
    server.notify(e);
  }
  catch (err) {
    gutil.log(
      gutil.colors.bgYellow('Failed to notify livereload server:'),
      gutil.colors.cyan(err.message));
    gutil.log(
      gutil.colors.bgYellow('Please make sure livereload server is running.'));
  }
};

/**
 * Watch task.
 * Watches for file changes, then executes its corresponding build task.
 */
gulp.task('watch', function() {
  // server.run([config.server.app]);
  server.start();
  
  gulp.watch([config.styles.src + '/**/*.scss'], function() {
    console.log('Reloading Sass...');
    sequence([
        'styles'
      ], function() {
        gulp.src(config.styles.src).pipe(server.notify());
      }
    );
  });
  
  gulp.watch([config.scripts.src], function() {
    console.log('Reloading Scripts...');
    sequence([
        'scripts'
      ], function() {
        gulp.src(config.scripts.src).pipe(server.notify());
      }
    );
  });
  
  gulp.watch([config.views.src, config.indexHtml], function() {
    console.log('Reloading Views...');
    sequence([
        'views'
      ], function() {
        gulp.src([config.views.src, config.indexHtml]).pipe(server.notify());
      }
    );
  });

  gulp.watch(config.components.src, function() {
    console.log('Reloading Components...');
    sequence([
        'components'
      ], function() {
        gulp.src(config.components.src).pipe(server.notify());
      }
    );
  });

  gulp.watch(config.assets.icons.src + '*.svg', function() {
    console.log('Reloading SVGs...');
    sequence([
        'svg'
      ], function() {
        gulp.src(config.assets.icons.src).pipe(server.notify());
      }
    );
  });

  gulp.watch([config.paths.dest + '/**/*.*'], {debounceDelay: 2000}, safeNotify);


  gulp.watch([config.server.app], [server.run]);
  gulp.src('').pipe(open(config.server.options));
});
