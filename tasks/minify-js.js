'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var Path = require('path');

var scriptConf = require("../config.json").script;

module.exports = function(){
    return gulp.src(Path.join(scriptConf.build, "**", "*.js"))
               .pipe(plugins.uglify())
               .pipe(gulp.dest(scriptConf.build))
               .on('error', gutil.log);
};
module.exports.dependencies = ['browserify', 'render'];

