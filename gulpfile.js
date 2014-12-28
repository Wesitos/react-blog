var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var fs = require('fs');
var path = require('path');

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

gulp.task('browserify', function(){
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
        b.bundle()
            .pipe(source(src.split(".")[0] + '.js'))
            .pipe(gulp.dest(appBuildDir));
    });
});

gulp.task('default', ['browserify']);
