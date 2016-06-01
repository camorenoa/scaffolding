var appName = 'sapient-web';

var resolve = require('path').resolve;
var root = resolve(__dirname, '..');

var app = resolve(root, './app');
var dest = resolve(root, './build');
var gulp = resolve(root, './gulp');
var assets = resolve(app, './assets');
var scripts = resolve(app, './scripts');
var styles = resolve(app, './styles');
var fonts = resolve(app, './fonts');
var views = resolve(app, './views');
var components = resolve(app, './components');

var modules = resolve(root, './node_modules');
var bootstrap = resolve(root, modules + '/bootstrap-sass/assets');
// var angular = resolve(root, modules + '/angular');
// var bootstrap = resolve(root, modules + '/bootstrap-sass/assets');

module.exports = {
  paths: {
    app: app,
    appName: appName,
    dest: dest,
    gulp: gulp,
    root: root,
    modules: modules,
    scripts: scripts
  },
  indexHtml: app + '/index.html',
  scripts: {
    src: scripts + '/**/*.js',
    dest: dest + '/scripts/',
    lint: {
      reporter: 'jshint-stylish',
      files: [
        scripts + '/**/*.js',
        root + '/gulpfile.js',
        root + '/gulp/**/*.js',
        root + '/gulp/config.js'
      ]
    },
    uglify: {
      mangle: true,
      outSourceMap: true
    }
  },
  styles: {
    src: styles,
    dest: dest + '/styles',
    vendordest: dest + '/styles/vendor/',
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      }
    }
  },
  assets: {
    src: assets,
    dest: dest + '/assets',
    fonts: {
      src: assets + '/fonts',
      dest: dest + '/assets/fonts'
    },
    images: {
      src: assets + '/images',
      dest: dest + '/assets/images'
    },
    icons: {
      src: assets + '/svg-icons/',
      dest: dest + '/assets/icons'
    }
  },
  vendor: {
    scripts: [
      modules + '/angular/angular.js',
      modules + '/angular-sanitize/angular-sanitize.js',
      modules + '/angular-ui-router/release/angular-ui-router.js',
      modules + '/angular-resource/angular-resource.js',
      modules + '/angular-mocks/angular-mocks.js',
      modules + '/karma-read-json/karma-read-json.js',
      modules + '/ng-csv/build/ng-csv.min.js'
    ],
    scssStyles: [
      styles + '/vendor.scss' 
    ],
    styles: [],
    bootstrap: {
      fonts: bootstrap + '/fonts',
      styles: bootstrap + '/stylesheets'
    },
    vendordest: dest + '/scripts/vendor'
  },
  views: {
    src: views + '/**/*.html'
  },
  components: {
    src: components + '/**/*.html'
  },
  server: {
    app: gulp + '/server/app.js',
    livereload: 35729,
    port: 3000,
    options: {
      uri: 'http://localhost:3000',
    }
  },
  clean: {
    dest: [dest + '/']
  },
};