/*jslint node: true */
'use strict';

var gulp = require('gulp');
var config = require('../config');


gulp.task('test', function (done) {
    startTests(true /*singleRun*/, done);
});

gulp.task('autotest', function (done) {
    startTests(false /*singleRun*/, done);
});

function startTests(singleRun, done) {
    var child;
    var excludeFiles = [];
    var Server = require('karma').Server;

    var server = new Server({
        configFile: __dirname + '/../../karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);
    server.start();

    ////////////////

    function karmaCompleted(karmaResult) {
        console.log('Karma completed');
        if (child) {
            console.log('shutting down the child process');
            child.kill();
        }
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}