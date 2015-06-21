var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var transform = require('vinyl-transform');
var fs = require('fs');
var path = require('path');
var preen = require('preen');
var plugins = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var buildPosts = require("./buildPosts");

var config = { production: false };

// Scripts
var appDir = "./src/app/";
var appPath = appDir + "**/*.jsx";
var appBuildDir = "./build/js/";

var componentDir = "./src/component/"
var componentPaths = fs.readdirSync(componentDir);
var componentBuildDir = "./build/js/";

var vendorDir = "./build/js/";
var vendorFileName = "vendor.js";
var vendorModules = [
    {
        bowerName: "showdown",
        devSource: "src/showdown.js",
        prodSource: "compressed/showdown.js",
    },
    {
        bowerName: "showdown",
        devSource: "src/extensions/github.js",
        prodSource: "compressed/extensions/github.js",
    },
];

// Styles
var stylesDir ='./src/styles/';
var stylesBuildDir = './build/css/';

var cssPath = stylesDir + '**/*.css';
var sassPath = stylesDir + '**/*.scss';

// Autores
var dataPath = './data/';
var dataBuildDir = './build/data/'
var authorPath = dataPath + "*/" + 'autor.json';

//Posts
var postsPath = dataPath + '*/' + 'posts/*.md';
var postsBuildDir = dataBuildDir;

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

gulp.task('clean-authors', function(done){
    del(['build/data/autor'], done);
})

gulp.task('clean-posts', function(done){
    del(['build/data/*!.json'], done);
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
    var browserified = transform(function(filename){
        gutil.log('browserify',filename);
        var b = browserify(filename);
        //b.transform(reactify);

        return b.bundle();
    });
    return gulp.src(appPath)
        .pipe(browserified)
        .pipe(config.production ? plugins.uglify() : gutil.noop())
        .pipe(plugins.rename(function(filePath){ filePath.extname = ".js";}))
        .pipe(gulp.dest(appBuildDir));
});

gulp.task('css', ['clean-css'], function(){
    return gulp.src(cssPath)
        .pipe(gulp.dest(stylesBuildDir));
});
gulp.task('sass', ['clean-css'], function(){
    return gulp.src(sassPath)
        .pipe(plugins.sass())
        .pipe(gulp.dest(stylesBuildDir));
});

gulp.task('author-list', ['clean-authors'], function(){
    return gulp.src(authorPath)
        .pipe(plugins.jsoncombine("autores.json", function(data){
            for(var key in data){
                gutil.log('author-list: Agregando autor',key);
                data[path.dirname(key)] = data[key];
                delete(data[key]);
            }
            return new Buffer(JSON.stringify(data));
        }))
        .pipe(gulp.dest(dataBuild));
});

gulp.task('posts', ['clean-posts'], function(done){
    return gulp.src(postsPath)
        .pipe(buildPosts());
        .pipe(plugind.rename(function(filePath){filePath.extname = ".json";}))
        .pipe(gulp.dest(postsBuildDir))
});

gulp.task('styles', ['css', 'sass']);

// Produccion
gulp.task('deploy', ['set-production', 'default']);

// Por defecto, desarrollo
gulp.task('default', ['posts', 'author-list', 'vendor', 'browserify', 'styles']);

gulp.task('watch', ['default'], function(){
    gulp.watch('src/**/*.jsx', ['browserify']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
    gulp.watch(cssPath, ['css']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
    gulp.watch(sassPath, ['sass']).on('change', function(event){
        gutil.log(event.type, event.path);
    });
});
