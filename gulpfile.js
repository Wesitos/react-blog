var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var fs = require('fs');
var path = require('path');

// Scripts
var appDir = "./src/app/";
var appPaths = fs.readdirSync(appDir);
var appBuildDir = "./build/js/";

var componentDir = "./src/component/"
var componentPaths = fs.readdirSync(componentDir);

var vendorDir = "./build/js/vendor/"
var vendorModules = [
    ["react/addons", "react-with-addons.js"],
    ["react", "react.js"]
];

// Cs
var cssDir = './src/css/';
var cssPaths = fs.readdirSync(cssDir).map(function(item){return './' + path.join(cssDir, item)});
var cssBuildDir = './build/css/';

gulp.task('clean', function(done){
    del(['build'], done);
});

gulp.task('browserify', ['clean'], function(){
    // Bundle vendor modules
    vendorModules.forEach(function(item){
        var b = browserify();
        b.require(item[0])
            .bundle()
            .pipe(source(item[1]))
            .pipe(gulp.dest(vendorDir));
    });
    
    //Bundle apps
    appPaths.forEach(function(src){
        var b = browserify();
        b.transform(reactify);
        b.external(vendorModules.map(function(item){return item[0]}));
        b.add("./" + path.join(appDir, src));
        return b.bundle()
            .pipe(source(src.split(".")[0] + '.js'))
            .pipe(gulp.dest(appBuildDir));
    });
});

gulp.task ('css', ['clean'], function(){
    return gulp.src(cssPaths)
    .pipe(gulp.dest(cssBuildDir));
});

gulp.task('default', ['browserify', 'css']);
