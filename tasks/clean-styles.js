'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var gutil = require('gulp-util');
var stylesConf = require("../config.json").path.styles;


module.exports =  function(done){
    del([stylesConf.build], done);
};
