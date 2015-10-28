'use strict';
var gulp = require('gulp-task-master')({
  dirname: 'tasks',   // The directory that tasks are located in
  pattern: '**/*.js',    // Pattern to use when looking for task files
  cwd: process.cwd(), // Current working directory configuration
  watchExt: '.watch'  // Extension to append to the end of watch tasks
});

gulp.task('styles', ['css', 'sass']);

gulp.task('default', ['authors', 'render', 'vendor', 'browserify', 'styles']);

gulp.task('set-production', function(){
    return process.env.NODE_ENV = 'production';
});

gulp.task('deploy', ['set-production', 'default', 'minify-css', 'minify-js']);

gulp.task('watch', [
    'default',
    'css.watch',
    'sass.watch',
    'vendor.watch',
    'browserify.watch'
]);

