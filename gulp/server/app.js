var express = require('express');
var config = require('../config');
var path = require('path');
var app = module.exports.app = exports.app = express();

//injects the livereload.js script at the end of the htmls
//you won't need 'connect-livereload' if you have livereload plugin for your browser
app.use(require('connect-livereload')());

app.use(express.static(path.join(__dirname, '/../../build')));
app.use(express.static(path.join(__dirname, '/../../api')));
app.all("*", function(req, res, next) {
  res.sendFile("index.html", { root: __dirname + "/../../build" });
});
app.use(express.static(config.paths.dest));
app.listen(config.server.port);