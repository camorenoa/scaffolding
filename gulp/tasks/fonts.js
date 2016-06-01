var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var errorhandler = require('../errorhandler');

gulp.task('fonts', function() {

  //fonts
  gulp.src([config.assets.fonts.src + '/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(errorhandler.handler())
    .pipe(gulp.dest(config.assets.fonts.dest));

});
