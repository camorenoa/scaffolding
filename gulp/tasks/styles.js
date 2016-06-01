var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var errorhandler = require('../errorhandler');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

/**
 * Styles task.
 * Compiles the styles files, then copies them to dist.
 */

gulp.task('styles', ['styles:dev']);

// Development task with sourcemaps
gulp.task('styles:dev', function() {
  return gulp.src(config.styles.src + '/styles.scss')
    .pipe(errorhandler.handler())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['> 0%'], cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(config.styles.dest));
});

// Production task with minify css
gulp.task('styles:prod', function() {
  return gulp.src(config.styles.src + '/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['> 0%'], cascade: false}))
    .pipe(minifyCSS({processImport: false}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('styles:clean', function(cb) {
  return del(config.styles.dest + '/**/*.{css,map}', cb);
});
