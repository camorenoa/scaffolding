var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

module.exports = {
  handler: function() {
    return plumber({
      errorHandler: this.onError
    });
  },
  onError: function(error) {
    notify.onError({
      title: 'Gulp',
      message: error,
      sound: 'Beep'
    })(error);
    this.emit('end');
  }
};
