'use strict';
var gulp = require('gulp');
var del = require('del');
var fs = require('fs');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var buildPosts = require("./buildPosts");
var renderPages = require("./render");

var gulp = require('gulp-task-master')({
  dirname: 'tasks',   // The directory that tasks are located in
  pattern: '**/*.js',    // Pattern to use when looking for task files
  cwd: process.cwd(), // Current working directory configuration
  watchExt: '.watch'  // Extension to append to the end of watch tasks
});

gulp.task('styles', ['css', 'sass']);

gulp.task('default', ['render', 'vendor', 'browserify', 'styles']);

gulp.task('watch', [
    'css.watch',
    'sass.watch',
    'browserify.watch'
]);
