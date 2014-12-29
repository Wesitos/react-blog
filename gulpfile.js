var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var fs = require('fs');
var path = require('path');
var preen = require('preen');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var config = { production: false };

// Scripts
var appDir = "./src/app/";
var appPaths = fs.readdirSync(appDir);
var appBuildDir = "./build/js/";

var componentDir = "./src/component/"
var componentPaths = fs.readdirSync(componentDir);
var componentBuildDir = "./build/js/";

var vendorDir = "./build/js/vendor/"
var vendorModules = [
    {
        bowerName: "react",
        devSource: "react-with-addons.js",
        prodSource: "react-with-addons-min.js",
        destName: "react-with-addons"
    },
    {
        bowerName: "showdown",
        devSource: "src/showdown.js",
        prodSource: "compressed/showdown.js",
        destName: "showdown.js"
    }
];

// Css
var cssDir = './src/css/';
var cssPaths = fs.readdirSync(cssDir).map(function(item){return './' + path.join(cssDir, item)});
var cssBuildDir = './build/css/';

gulp.task('set-production', function(done){
    config.production = true;
    done();
});

gulp.task('clean', function(done){
    del(['build'], done);
});

gulp.task('preen', ['clean'], function(done){
    preen.preen({}, done);
});

gulp.task('copy-vendor', ['preen'], function(){
    var vendorPathList = vendorModules.map(function(item){
        var moduleName = config.production?item.prodSource:item.devSource;
        var modulePath = path.join("bower_components", item.bowerName ,moduleName);
        return modulePath
    });
    return gulp.src(vendorPathList, {base: "bower_components"})
        .pipe(rename(function(filePath){
            filePath.dirname = "";
        }))
        .pipe(gulp.dest(vendorDir));
});

gulp.task('browserify',  ['copy-vendor'], function(){
    //Bundle apps
    appPaths.forEach(function(src){
        b = browserify();
        b.transform(reactify);
        b.add("./" + path.join(appDir, src));
        b.bundle()
            .pipe(source(src.split(".")[0] + '.js'))
            .pipe(gulp.dest(appBuildDir))
    });
    
});

gulp.task ('css', ['browserify'], function(){
    return gulp.src(cssPaths)
        .pipe(gulp.dest(cssBuildDir));
});

// Produccion
gulp.task('deploy', ['set-production', 'default']);

// Por defecto, desarrollo
gulp.task('default', ['copy-vendor', 'browserify', 'css']);
