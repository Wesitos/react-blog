var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var fs = require('fs');
var path = require('path');
var preen = require('preen');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');

var config = { production: false };

// Scripts
var appDir = "./src/app/";
var appPaths = fs.readdirSync(appDir);
var appBuildDir = "./build/js/";

var componentDir = "./src/component/"
var componentPaths = fs.readdirSync(componentDir);
var componentBuildDir = "./build/js/";

var vendorDir = "./build/js/";
var vendorFileName = "vendor.js";
var vendorModules = [
    {
        bowerName: "react",
        devSource: "react-with-addons.js",
        prodSource: "react-with-addons.min.js",
    },
    {
        bowerName: "showdown",
        devSource: "src/showdown.js",
        prodSource: "compressed/showdown.js",
    }
];

// Css
var cssDir = './src/css/';
var cssPaths = fs.readdirSync(cssDir).map(function(item){return './' + path.join(cssDir, item)});
var cssBuildDir = './build/css/';

gulp.task('set-production', function(done){
    config.production = true;
    gutil.log("Produccion!");
    done();
});

gulp.task('clean-css', function(done){
    del(['build/css'], done);
});
gulp.task('clean-js', function(done){
    del(['build/js'], done);
})

gulp.task('preen', function(done){
    preen.preen({}, done);
});

gulp.task('vendor', ['preen', 'clean-js'], function(){
    var vendorPathList = vendorModules.map(function(item){
        var moduleName = config.production?item.prodSource:item.devSource;
        var modulePath = path.join("bower_components", item.bowerName ,moduleName);
        return modulePath
    });
    return gulp.src(vendorPathList, {base: "bower_components"})
        .pipe(plugins.concat(vendorFileName))
        .pipe(config.production ? plugins.uglify() : gutil.noop())
        .pipe(gulp.dest(vendorDir))
        .on('error', gutil.log);
});

gulp.task('browserify', ['clean-js', 'vendor'], function(){
    //Bundle apps
    appPaths.forEach(function(src){
        b = browserify();
        b.transform(reactify);
        if (config.production) b.transform('uglifyify');
        b.add("./" + path.join(appDir, src));
        b.bundle()
            .pipe(source(src.split(".")[0] + '.js'))
            .pipe(gulp.dest(appBuildDir))
            .on('error', gutil.log);
    });
    
});

gulp.task('css', ['clean-css'], function(){
    return gulp.src(cssPaths)
        .pipe(gulp.dest(cssBuildDir));
});

// Produccion
gulp.task('deploy', ['set-production', 'default']);

// Por defecto, desarrollo
gulp.task('default', ['vendor', 'browserify', 'css']);

gulp.task('watch', ['vendor', 'browserify', 'css'], function(){
    gulp.watch('src/**/*.jsx', ['browserify']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
    gulp.watch('src/css/*.css', ['css']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
});
