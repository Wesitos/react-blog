'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var autorConfig = require('../config.json').blog.autor;
var Path = require('path');

module.exports = function(){
    return gulp.src(autorConfig.src)
               .pipe(plugins.jsoncombine(Path.basename(autorConfig.build), function(data){
                   for(var key in data){
                       gutil.log('author-list','Agregando autor',key.split(Path.sep)[0]);
                       data[Path.dirname(key)] = data[key];
                       delete(data[key]);
                   }
                   return new Buffer(JSON.stringify(data));
               }))
               .pipe(gulp.dest(Path.dirname(autorConfig.build)));
};

module.watch = autorConfig.src;
