var config = require('../config');
var gplug = require('gulp-load-plugins')();
var del = require('del');
var gulp = require('gulp');
var errorhandler = require('../errorhandler');

gulp.task('scripts', ['scripts:lint', 'scripts:move']);


gulp.task('scripts:clean', function(cb) {
  return del(config.scripts.dest + '/*.{js}', cb);
});

gulp.task('scripts:move', function() {
  return gulp.src([config.scripts.src])
    .pipe(errorhandler.handler())
    .pipe(gplug.sourcemaps.init())
    .pipe(gplug.order([
      'app/scripts/main.js',
      'app/scripts/**/*.module.js',
      'app/scripts/**/*.service.js',
      'app/scripts/**/*.controller.js',
      'app/scripts/**/*.directive.js'
    ], {base: '.'}))
    .pipe(gplug.concat('main.js'))
    .pipe(gplug.sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('scripts:lint', function() {
  return gulp.src(config.scripts.lint.files)
    // .pipe(gplug.jscs())
    // .pipe(gplug.jscs().reporter())
    .pipe(gplug.jshint())
    .pipe(gplug.jshint.reporter(config.scripts.lint.reporter));
});



gulp.task('scripts:prod', function() {
  return gulp.src([config.scripts.src])
    .pipe(gplug.order([
      'app/scripts/**/*.module.js',
      'app/scripts/**/*.service.js',
      'app/scripts/**/*.controller.js',
      'app/scripts/**/*.directive.js',
      'app/scripts/main.js'
    ], {base: '.'}))
    .pipe(gplug.concat('main.js'))
    .pipe(gplug.ngmin())
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gplug.uglify())
    .pipe(gulp.dest(config.scripts.dest));
});