var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var errorhandler = require('../errorhandler');
var minifyCSS = require('gulp-minify-css');
var gplug = require('gulp-load-plugins')();

gulp.task('vendor', ['vendor:clean', 'vendor:scripts', 'vendor:styles:scss']);

gulp.task('vendor:scripts', function() {
  return gulp.src(config.vendor.scripts)
    .pipe(errorhandler.handler())
    .pipe(gulp.dest(config.vendor.vendordest));
});

gulp.task('vendor:styles', function() {
  return gulp.src(config.vendor.styles)
    .pipe(errorhandler.handler())
    .pipe(gulp.dest(config.styles.vendordest));
});

gulp.task('vendor:styles:scss', function() {
  return gulp.src(config.vendor.scssStyles)
    .pipe(gplug.sass({
        includePaths: [config.vendor.bootstrap.styles],
    }))
    .pipe(gplug.autoprefixer({browsers: ['> 0%'], cascade: false}))
    .pipe(minifyCSS({processImport: false}))
    .pipe(gplug.rename('vendor.min.css'))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('vendor:fonts', function() {
  return gulp.src([config.vendor.bootstrap.fonts + '/**/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(errorhandler.handler())
    .pipe(gulp.dest(config.assets.fonts.dest));
});

gulp.task('vendor:clean', function(cb) {
  return del([config.vendor.vendordest + '/vendor.js'], cb);
});
