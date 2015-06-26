'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var gutil = require('gulp-util');
var Path = require('path');

var stylesConf = require("../config.json").path.styles;
var cssGlob = Path.join(stylesConf.css.src, "**", ["*.", stylesConf.css.extname].join(""));

module.exports = function(){
    return gulp.src(cssGlob)
        .pipe(gulp.dest(stylesConf.build));
};

module.exports.watch = cssGlob;

