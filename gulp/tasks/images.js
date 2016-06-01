var config = require('../config');
var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var errorhandler = require('../errorhandler');

gulp.task('images', function() {
  return gulp.src(
    config.assets.images.src + '/**/*.{png,jpg,jpeg,gif}')
    .pipe(errorhandler.handler())
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant({quality: '95', speed: 4})]
    }))
    .pipe(gulp.dest(config.assets.images.dest));
});
